import { ArrowRight, Search, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { FileDetails } from './file-details'

interface EmailTableRowProps {
  userId: string
  dataSolicitacao: Date
  solicitacao: string
  duvida: string
  nomeEmpresa: string
  cnpj: string
  dataResposta: Date
  processoSei: string
}

const EmailTableRow = ({
  userIdtring,
  dataSolicitacao,
  solicitacao,
  duvida,
  nomeEmpresa,
  cnpj,
  dataResposta,
  processoSei,
}: EmailTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do email</span>
            </Button>
          </DialogTrigger>

          <FileDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {dataSolicitacao}
      </TableCell>
      <TableCell className="text-muted-foreground">{solicitacao}</TableCell>
      <TableCell className="font-medium">{duvida}</TableCell>
      <TableCell className="font-medium">{nomeEmpresa}</TableCell>
      <TableCell className="font-medium">{cnpj}</TableCell>
      <TableCell className="font-medium">{dataResposta}</TableCell>
      <TableCell className="font-medium">{processoSei}</TableCell>
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

export default EmailTableRow
