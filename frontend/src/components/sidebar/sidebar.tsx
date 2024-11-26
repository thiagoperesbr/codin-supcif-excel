import { Building2, LifeBuoy, Settings } from 'lucide-react'

import { SidebarNavigation } from './sidebar-navigation'

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6 border-r">
      <div className="flex h-16 items-center px-6 gap-6">
        <Building2 className="h-6 w-6" />
        <span className="text-lg font-semibold">DIRDI</span>
      </div>

      <div>
        <SidebarNavigation />
      </div>

      <div className="flex flex-col mt-auto mb-6">
        <nav className="space-y-1">
          <a href="" className="flex items-center gap-4 rounded px-6 py-2">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Configurações</span>
          </a>
          <a href="" className="flex items-center gap-4 rounded px-6 py-2">
            <LifeBuoy className="h-5 w-5" />
            <span className="font-medium">Suporte</span>
          </a>
        </nav>
      </div>
    </div>
  )
}
