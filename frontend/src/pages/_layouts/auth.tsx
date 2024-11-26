import { Building2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased font-inter">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        <div className="flex items-center gap-3 text-foreground">
          <Building2 className="h-5 w-5" />
          <span className="font-semibold">
            Diretoria de Desenvolvimento Industrial
          </span>
        </div>
        <footer className="text-sm">
          Painel administrador &copy; Diretoria de Desenvolvimento Industrial -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}
