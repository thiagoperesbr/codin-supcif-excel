import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header/header'

export function AppLayout() {
  return (
    <div className="grid min-h-screen">
      <div>
        <Header />

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
