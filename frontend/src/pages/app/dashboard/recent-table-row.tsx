import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentTableRow() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">
          Thiago Mourão Araujo Peres
        </p>
        <p className="text-sm text-muted-foreground">
          thiago.mourao.peres@gmail.com
        </p>
      </div>
    </div>
  )
}
