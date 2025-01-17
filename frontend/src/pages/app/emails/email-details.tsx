import dayjs from 'dayjs'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface Email {
  _id: string
  origem: string
  dataSolicitacao: string
  dia: string
  semanaSolicitacao: string
  solicitacao: string
  duvida: string
  duvidaDetalhamento: string
  nomeEmpresa: string
  cnpj: string
  leiDecreto: string
  setor: string
  dataResposta: string
  dias: string
  semanaResposta: string
  acao: string
  processoSEI: string
}

interface EmailDetailsProps {
  emailDetails: Email | null
  loading: boolean
}

const EmailDetails = ({ emailDetails, loading }: EmailDetailsProps) => {
  if (loading) {
    return <DialogContent>Carregando...</DialogContent>
  }

  if (!emailDetails) {
    return <DialogContent>Erro ao carregar os dados do e-mail.</DialogContent>
  }

  return (
    <DialogContent className="h-[90%] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Detalhes do E-mail</DialogTitle>
      </DialogHeader>

      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Nome da Empresa
              </TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.nomeEmpresa}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">CNPJ</TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.cnpj || '-'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Origem</TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.origem}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Data da Solicitação
              </TableCell>
              <TableCell className="flex justify-end">
                {dayjs(emailDetails.dataSolicitacao).format('DD/MM/YYYY')}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Solicitação
              </TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.solicitacao}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Dúvida</TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.duvida || '-'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Dúvidas - Detalhamento
              </TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.duvidaDetalhamento || '-'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Lei/Decreto
              </TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.leiDecreto || '-'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Setor</TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.setor || '-'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Data da Resposta
              </TableCell>
              <TableCell className="flex justify-end">
                {dayjs(emailDetails.dataResposta).format('DD/MM/YYYY')}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Ação</TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.acao}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Processo SEI
              </TableCell>
              <TableCell className="flex justify-end">
                {emailDetails.processoSEI}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}

export default EmailDetails
