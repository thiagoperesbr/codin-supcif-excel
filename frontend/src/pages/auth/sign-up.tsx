import { Eye } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  companyName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSigIn(data: SignUpForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Empresa cadastrada com sucesso.', {
      action: {
        label: 'Login',
        onClick: () => navigate('/login'),
      },
    })
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/login">Fazer login</Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro da Codin Rio!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSigIn)} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da empresa</Label>
              <Input
                id="companyName"
                type="text"
                {...register('companyName')}
              />
            </div>

            <div className="space-y-2">
              <Label>Responsável</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label>Email empresarial</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="relative space-y-2">
              <Label>Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              <Eye className="absolute h-5 w-5 text-muted-foreground top-[34px] right-3" />
            </div>

            <div className="relative space-y-2">
              <Label>Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
              <Eye className="absolute h-5 w-5 text-muted-foreground top-[34px] right-3" />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4" href="#">
                termos de serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="#">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
