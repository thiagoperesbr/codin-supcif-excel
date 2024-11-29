import dayjs from 'dayjs'
import { ArrowUpRight, ListOrdered, Mail } from 'lucide-react'
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

import EmailsTableRow from './emails-table-row'
import SummaryCard from './summary-card'

export function Dashboard() {
  const [emails, setEmails] = useState([])
  const [totalRespondido, setTotalRespondido] = useState('')
  const [totalPedidoEnquadramento, setTotalPedidoEnquadramento] = useState('')
  const [emailsSaved, setEmailsSaved] = useState(false)

  useEffect(() => {
    getEmails()
  }, [])

  const getEmails = async () => {
    console.log(emailsSaved)
    if (emailsSaved) return

    try {
      const response = await api.get('/api/acompanhamento')

      if (response && response.data && response.data.emails) {
        const emailData = response.data.emails
        setEmails(emailData)
        setTotalRespondido(response.data.total)

        const countPedidoEnquadramento = emailData.filter(
          (email) => email['Solicitação'] === 'Pedido de Abertura de processo',
        ).length

        setTotalPedidoEnquadramento(countPedidoEnquadramento)

        const isFriday = dayjs().day() === 5
        const currentDate = dayjs().format('YYYY-MM-DD')

        if (isFriday) {
          const logResponse = await api.get(`/api/logs/${currentDate}`)

          if (!logResponse.data.saved) {
            try {
              await api.post('/api/emails/create', {
                emails: emailData,
                date: currentDate,
              })

              await api.post('/api/logs/create', {
                date: currentDate,
                saved: true,
              })

              setEmailsSaved(true)
            } catch (err) {
              console.error('Erro ao salvar os emails e o log', err)
            }
          }
        }
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
            icon={<Mail size={20} />}
            title="Total de e-mails respondidos"
            amount={totalRespondido}
          />

          <SummaryCard
            icon={<ListOrdered size={20} />}
            title="Pedidos de Abertura de processo"
            amount={totalPedidoEnquadramento}
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
                    <EmailsTableRow
                      key={index}
                      dtSolicitacao={new Date(
                        email['Data da solicitação'],
                      ).toLocaleDateString()}
                      solicitacao={email['Solicitação']}
                      duvida={email['Dúvida']}
                      nomeEmpresa={email['Nome da empresa']}
                      cnpj={email.CNPJ}
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
