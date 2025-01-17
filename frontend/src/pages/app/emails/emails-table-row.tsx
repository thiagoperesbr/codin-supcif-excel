import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import api from '@/config/api'

import EmailDetails from './email-details'

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

interface EmailTableRowProps {
  emailID: string
  dataSolicitacao: string
  solicitacao: string
  duvida: string
  nomeEmpresa: string
  cnpj: string
  dataResposta: string
  processoSEI: string
}

const EmailTableRow = ({
  emailID,
  dataSolicitacao,
  solicitacao,
  duvida,
  nomeEmpresa,
  cnpj,
  dataResposta,
  processoSEI,
}: EmailTableRowProps) => {
  const [emailDetails, setEmailDetails] = useState<Email | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getEmailDetails = async () => {
    setLoading(true)

    try {
      const response = await api.get(`/api/emails/id/${emailID}`)

      setEmailDetails(response.data.email)
    } catch (err) {
      console.error('Erro ao buscar email', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={getEmailDetails} variant="outline" size="sm">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do e-mail</span>
            </Button>
          </DialogTrigger>

          <EmailDetails emailDetails={emailDetails} loading={loading} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {dataSolicitacao}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground">
        {solicitacao}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {duvida || '-'}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground uppercase">
        {nomeEmpresa}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {cnpj || '-'}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-muted-foreground">
        {dataResposta}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {processoSEI}
      </TableCell>
    </TableRow>
  )
}

export default EmailTableRow
