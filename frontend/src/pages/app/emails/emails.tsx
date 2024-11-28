import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/config/api'

// import { FileTableFilters } from './file-table-filters'
import EmailsTableRow from './emails-table-row'

interface Email {
  _id: string
  dataSolicitacao: Date
  solicitacao: string
  duvida: string
  nomeEmpresa: string
  cnpj: string
  dataResposta: Date
  processoSei: string
}

export function Emails() {
  const [emails, setEmails] = useState<Email[]>([])
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const perPage = 10

  const fetchEmails = async (pageIndex: number) => {
    try {
      const response = await api.get('/api/emails/', {
        params: {
          page: pageIndex,
          limit: perPage,
        },
      })

      setEmails(response.data.emails)
      setTotalCount(response.data.totalCount)
    } catch (err) {
      console.error('Erro ao buscar emails', err)
    }
  }

  useEffect(() => {
    fetchEmails(page)
  }, [page])

  return (
    <>
      <Helmet title="Emails" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Emails</h1>
        <div className="space-y-2.5">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dt. Solicitação</TableHead>
                  <TableHead>Solicitação</TableHead>
                  <TableHead>Dúvida</TableHead>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Dt. Resposta</TableHead>
                  <TableHead>Processo SEI</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((email) => (
                  <EmailsTableRow
                    key={email._id}
                    dataSolicitacao={email.dataSolicitacao}
                    duvida={email.duvida}
                    nomeEmpresa={email.nomeEmpresa}
                    cnpj={email.cnpj}
                    dataResposta={email.dataResposta}
                    processoSei={email.processoSei}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            pageIndex={page}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  )
}
