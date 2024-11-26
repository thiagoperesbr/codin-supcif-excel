import { TableCell, TableRow } from '@/components/ui/table'

interface TransactionTableRowProps {
  dtSolicitacao: string
  solicitacao: string
  duvida: string
  nomeEmpresa: string
  cnpj: string
  dtResposta: string
  processoSEI: string
}

const TransactionTableRow = ({
  dtSolicitacao,
  solicitacao,
  duvida,
  nomeEmpresa,
  cnpj,
  dtResposta,
  processoSEI,
}: TransactionTableRowProps) => {
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

export default TransactionTableRow
