import { TableCell, TableRow } from '@/components/ui/table'

interface EmailsTableRowProps {
  dtSolicitacao: string
  solicitacao: string
  duvida: string
  nomeEmpresa: string
  cnpj: string
  dtResposta: string
  processoSEI: string
}

const EmailsTableRow = ({
  dtSolicitacao,
  solicitacao,
  duvida,
  nomeEmpresa,
  cnpj,
  dtResposta,
  processoSEI,
}: EmailsTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{dtSolicitacao}</div>
      </TableCell>
      <TableCell>{solicitacao}</TableCell>
      <TableCell>{duvida}</TableCell>
      <TableCell className="uppercase">{nomeEmpresa}</TableCell>
      <TableCell>{cnpj}</TableCell>
      <TableCell>{dtResposta}</TableCell>
      <TableCell>{processoSEI}</TableCell>
    </TableRow>
  )
}

export default EmailsTableRow
