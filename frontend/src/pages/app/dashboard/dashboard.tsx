import { ArrowUpRight, Building2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/config/api'

import SummaryCard from './summary-card'
import TransactionTableRow from './transactions-table-row'

export function Dashboard() {
  const [emails, setEmails] = useState([])
  const [totalRespondido, setTotalRespondido] = useState('')

  useEffect(() => {
    getEmails()
  }, [])

  const getEmails = async () => {
    try {
      const response = await api.get('/api/acompanhamento')

      if (response && response.data && response.data.emails) {
        setEmails(response.data.emails)
        setTotalRespondido(response.data.total)
      } else {
        console.log('Invalid response data.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Painel de Acompanhamento de E-mails
        </h1>

        <div className="grid grid-cols-3 gap-4">
          <SummaryCard
            icon={<Building2 size={20} />}
            title="Total de e-mails respondidos"
            amount={totalRespondido}
          />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>E-mails</CardTitle>
                <CardDescription>
                  Ultimos 5 e-mails respondidos.
                </CardDescription>
              </div>
              <Button
                variant="secondary"
                asChild
                size="sm"
                className="ml-auto gap-1"
              >
                <Link to="/emails">
                  Ver todos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.slice(0, 5).map((email, index) => (
                    <TransactionTableRow
                      key={index}
                      dtSolicitacao={new Date(
                        email['Data da solicitação'],
                      ).toLocaleDateString()}
                      solicitacao={email['Solicitação']}
                      duvida={email['Dúvida']}
                      nomeEmpresa={email['Nome da empresa']}
                      cnpj={email['CNPJ']}
                      dtResposta={new Date(
                        email['Data da resposta'],
                      ).toLocaleDateString()}
                      processoSEI={email['Processo SEI']}
                    />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
