import {
  Building2,
  Factory,
  Flag,
  LayoutDashboard,
  ListChecks,
  Users,
} from 'lucide-react'

export function SidebarNavigation() {
  return (
    <nav className="space-y-1">
      <a href="" className="flex items-center gap-4 rounded px-6 py-2">
        <LayoutDashboard className="h-5 w-5" />
        <span className="font-medium">Painel</span>
      </a>

      <a href="" className="flex items-center gap-4 rounded px-6 py-2">
        <Building2 className="h-5 w-5" />
        <span className="font-medium">Empresas</span>
      </a>

      <a href="" className="flex items-center gap-4 rounded px-6 py-2">
        <Factory className="h-5 w-5" />
        <span className="font-medium">Distritos Industriais</span>
      </a>

      <a href="" className="flex items-center gap-4 rounded px-6 py-2">
        <ListChecks className="h-5 w-5" />
        <span className="font-medium">Processos de Venda</span>
      </a>

      <a href="" className="flex items-center gap-4 rounded px-6 py-2">
        <Flag className="h-5 w-5" />
        <span className="font-medium">Relatórios</span>
      </a>

      <a href="" className="flex items-center gap-4 rounded px-6 py-2">
        <Users className="h-5 w-5" />
        <span className="font-medium">Usuários</span>
      </a>
    </nav>
  )
}
