import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/config/api'

import AiReportButton from './ai-report-button'
import EmailsTableRow from './emails-table-row'
import SummaryCard from './summary-card'

interface Email {
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

dayjs.extend(weekOfYear)

export function Dashboard() {
  const [emails, setEmails] = useState<Email[]>([])
  const [totalRespondido, setTotalRespondido] = useState('0')
  const [totalPedidoAberturaProcesso, setTotalPedidoAberturaProcesso] =
    useState('0')
  const [totalPedidoTacito, setTotalPedidoTacito] = useState('0')
  const [noData, setNoData] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<string>(
    `${dayjs().year()}-${String(dayjs().week()).padStart(2, '0')}`,
  )

  const calculateTargetWeek = (): string => {
    const today = dayjs()
    const currentWeek = today.week()
    const currentYear = today.year()
    const dayOfWeek = today.day()

    let targetWeek: number
    let targetYear: number

    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
      if (currentWeek === 1 && today.subtract(1, 'week').year() > currentYear) {
        targetWeek = 52
        targetYear = currentYear - 1
      } else {
        targetWeek = currentWeek - 1
        targetYear = currentYear
      }
    } else {
      targetWeek = currentWeek
      targetYear = currentYear
    }

    return `${targetYear}-${String(targetWeek).padStart(2, '0')}`
  }

  useEffect(() => {
    let isMounted = true

    const initializeDashboard = async () => {
      const isSunday = dayjs().day() === 0
      const targetWeek = calculateTargetWeek()
      setSelectedWeek(targetWeek)

      if (isSunday) {
        const excelData = await getExcel()

        if (excelData && isMounted) {
          const saveSuccess = await saveEmails(excelData)

          if (saveSuccess && isMounted) {
            await getEmails(targetWeek)
          } else if (isMounted) {
            console.log('Nenhum e-mail foi salvo. Atualizando a lista.')
            await getEmails(targetWeek)
          }
        }
      } else if (isMounted) {
        await getEmails(targetWeek)
      }
    }

    initializeDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const handleWeekChange = async (week: string) => {
    setSelectedWeek(week)
    await getEmails(week)
  }

  const getExcel = async () => {
    try {
      const response = await api.get('/api/acompanhamento')

      if (response?.data?.emails) {
        return response.data.emails
      } else {
        console.log('Dados inválidos retornados do Excel.')
        return null
      }
    } catch (err) {
      console.error('Erro ao buscar os dados do Excel', err)
      return null
    }
  }

  const saveEmails = async (emailsToSave: Email[]) => {
    try {
      await api.post('/api/emails/create', {
        emails: emailsToSave,
      })

      console.log('Dados salvos com sucesso.')
      return true
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message) {
        console.log('Erro ao salvar os e-mails:', err.response.data.message)
      } else {
        console.error('Erro inesperado ao salvar dados no banco:', err)
      }
      return false
    }
  }

  const getEmails = async (week: string) => {
    try {
      const response = await api.get(
        `/api/emails/latest?semanaResposta=${week}`,
      )

      if (response?.data?.emails) {
        const emailData = response.data.emails
        const totalCount = response.data.totalCount
        const pedidoAberturaProcesso = response.data.countPedidoAberturaProcesso
        const pedidoTacito = response.data.countPedidoTacito

        setEmails(emailData)
        setNoData(false)
        setTotalRespondido(totalCount || '0')
        setTotalPedidoAberturaProcesso(pedidoAberturaProcesso)
        setTotalPedidoTacito(pedidoTacito)
      } else {
        setEmails([])
        setNoData(true)
        setTotalRespondido('0')
        setTotalPedidoAberturaProcesso('0')
        setTotalPedidoTacito('0')
        console.log('Nenhum dado de e-mail econtrado no banco.')
      }
    } catch (err) {
      setEmails([])
      setNoData(true)
      setTotalRespondido('0')
      setTotalPedidoAberturaProcesso('0')
      setTotalPedidoTacito('0')
      console.error('Erro ao buscar dados do banco.', err)
    }
  }

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold tracking-tight">
            Painel de Acompanhamento de E-mails
          </h1>

          <div className="ml-auto gap-2 flex flex-row">
            <div className="flex items-center gap-3">
              <AiReportButton />
              <Select onValueChange={handleWeekChange} value={selectedWeek}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Semana" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 52 }, (_, i) => {
                    const year = dayjs().year()
                    const week = String(i + 1).padStart(2, '0')
                    return (
                      <SelectItem
                        key={`${year}-${week}`}
                        value={`${year}-${week}`}
                      >
                        {`${year} - Semana ${week}`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SummaryCard
            icon={<Mail size={20} />}
            title="Total de e-mails respondidos"
            amount={totalRespondido}
          />

          <SummaryCard
            icon={<ListOrdered size={20} />}
            title="Total de Pedidos de Abertura de processo"
            amount={totalPedidoAberturaProcesso}
          />

          <SummaryCard
            icon={<ListOrdered size={20} />}
            title="Total de Pedidos Tácitos"
            amount={totalPedidoTacito}
          />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>E-mails</CardTitle>
                <CardDescription>
                  {`Últimos 10 e-mails respondidos na semana ${selectedWeek.split('-')[1]} de ${selectedWeek.split('-')[0]}.`}
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
                  {noData ? (
                    <TableRow>
                      <td colSpan={7} className="text-center p-4">
                        <p className="text-base">
                          Nenhum e-mail encontrado para a semana selecionada.
                        </p>
                      </td>
                    </TableRow>
                  ) : (
                    emails
                      .slice(-10)
                      .reverse()
                      .map((email, index) => (
                        <EmailsTableRow
                          key={index}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
