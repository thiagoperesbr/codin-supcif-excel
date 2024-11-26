import { Eye } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/config/api.ts'

const signInForm = z.object({
  usuario: z.string(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const navigate = useNavigate()

  async function handleSigIn(data: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const response = await api.post('/api/auth/login', {
        username: data.usuario,
        password: data.password,
      })

      navigate('/')
      toast.success(response.data.message)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm">
              Painel de administração dos Distritos Industriais
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSigIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuário</Label>
              <Input id="usuario" type="usuario" {...register('usuario')} />
            </div>

            <div className="relative space-y-2">
              <Label>Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              <Eye className="absolute h-5 w-5 text-muted-foreground top-[34px] right-3" />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
