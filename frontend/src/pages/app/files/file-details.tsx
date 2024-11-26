import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function FileDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Arquivo: 01ARZ3NDEKTSV4RRFFQ69G5FAV</DialogTitle>
        <DialogDescription>Detalhes do Arquivo</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Empresa</TableCell>
              <TableCell className="flex justify-end">
                Consórcio Térmica do Açu
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (21) 99627-8029
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                thiago.mourao.peres@gmail.com
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Enviado há
              </TableCell>
              <TableCell className="flex justify-end">há 15 minutos</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Tamanho</TableCell>
              <TableCell className="flex justify-end">1.8 MB</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
