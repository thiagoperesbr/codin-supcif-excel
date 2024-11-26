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
// import { Input } from '../ui/input'
// import { AccountMenu } from './account-menu'

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
        {/* <div className="relative mx-auto">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Procurar..."
            className="w-[336px] rounded-lg pl-8"
          />
        </div> */}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* <AccountMenu /> */}
        </div>
      </div>
    </div>
  )
}
