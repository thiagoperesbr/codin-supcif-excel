import { TableCell, TableRow } from '@/components/ui/table'

interface EmailsTableRowProps {
  dataSolicitacao: string
  solicitacao: string
  duvida: string
  nomeEmpresa: string
  cnpj: string
  dataResposta: string
  processoSEI: string
}

const EmailsTableRow = ({
  dataSolicitacao,
  solicitacao,
  duvida,
  nomeEmpresa,
  cnpj,
  dataResposta,
  processoSEI,
}: EmailsTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-mono text-xs font-medium">{dataSolicitacao}</div>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground">
        {solicitacao}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{duvida}</TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground uppercase">
        {nomeEmpresa}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{cnpj}</TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground">
        {dataResposta}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {processoSEI}
      </TableCell>
    </TableRow>
  )
}

export default EmailsTableRow
