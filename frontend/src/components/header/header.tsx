// import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { ThemeToggle } from '../theme/theme-toggle'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Painel
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/emails">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    E-mails
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
