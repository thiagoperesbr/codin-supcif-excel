import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/config/api'

import { EmailTableFilters } from './email-table-filters'
import EmailsTableRow from './emails-table-row'

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

export function Emails() {
  const [emails, setEmails] = useState<Email[]>([])
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const perPage = 25

  const fetchEmails = async () => {
    try {
      const params = {
        ...filters,
        page: page > 0 ? (page + 1).toString() : '1',
        limit: perPage.toString(),
      }

      const response = await api.get('/api/emails', {
        params,
      })

      setEmails(response.data.emails)
      setTotalCount(response.data.totalCount)
    } catch (err) {
      console.error('Erro ao buscar emails', err)
      setEmails([])
      setTotalCount(0)
    }
  }

  const handleFiltersUpdate = (newFilters: Record<string, string>) => {
    setFilters(newFilters)
    setPage(0)
  }

  useEffect(() => {
    fetchEmails()
  }, [page, filters])

  return (
    <>
      <Helmet title="Emails" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Emails</h1>
        <div className="space-y-2.5">
          <EmailTableFilters onFiltersUpdate={handleFiltersUpdate} />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Dt. Solicitação</TableHead>
                  <TableHead>Solicitação</TableHead>
                  <TableHead>Dúvida</TableHead>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Dt. Resposta</TableHead>
                  <TableHead>Processo SEI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      <strong>
                        Nenhum e-mail encontrado com o filtro selecionado.
                      </strong>
                    </TableCell>
                  </TableRow>
                ) : (
                  emails.map((email) => (
                    <EmailsTableRow
                      key={email._id}
                      emailID={email._id}
                      dataSolicitacao={dayjs(email.dataSolicitacao).format(
                        'DD/MM/YYYY',
                      )}
                      solicitacao={email.solicitacao}
                      duvida={email.duvida}
                      nomeEmpresa={email.nomeEmpresa}
                      cnpj={email.cnpj}
                      dataResposta={dayjs(email.dataResposta).format(
                        'DD/MM/YYYY',
                      )}
                      processoSEI={email.processoSEI}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination
            pageIndex={page}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={(newPage: number) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  )
}
