import { ArrowRight, Search, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { FileDetails } from './file-details'

export function FileTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do arquivo</span>
            </Button>
          </DialogTrigger>

          <FileDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        01ARZ3NDEKTSV4RRFFQ69G5FAV
      </TableCell>
      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Consórcio Térmica do Açu</TableCell>
      <TableCell className="font-medium">1.8 MB</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="h-3 w-3 mr-2" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <Trash className="h-3 w-3 mr-2" />
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  )
}
