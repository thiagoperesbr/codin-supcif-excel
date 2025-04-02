import axios from 'axios'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { ArrowUpRight, ListOrdered, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

// import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import { ChartConfig, ChartContainer } from '@/components/ui/chart'
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

// import AiReportButton from './ai-report-button'
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
  const [totalPedidoReexame, setTotalPedidoReexame] = useState('0')
  const [noData, setNoData] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year())
  const [selectedWeek, setSelectedWeek] = useState<string>('01')

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
      const isFriday = dayjs().day() === 5
      const targetWeek = calculateTargetWeek()
      const [targetYear, targetWeekNumber] = targetWeek.split('-')
      setSelectedYear(Number(targetYear))
      setSelectedWeek(targetWeekNumber)

      if (isFriday) {
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

  const handleYearChange = async (year: number) => {
    setSelectedYear(year)
    setSelectedWeek('01')
    await handleWeekChange('01')
  }

  const handleWeekChange = async (week: string) => {
    const fullWeek = `${selectedYear}-${week}`
    setSelectedWeek(week)
    await getEmails(fullWeek)
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

      return true
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400 && err.response?.data?.message) {
          console.log('Erro ao salvar os e-mails:', err.response.data.message)
        } else {
          console.error('Erro inesperado ao salvar dados no banco:', err)
        }
      } else {
        console.error('Erro inesperado:', err)
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
        const pedidoReexame = response.data.countPedidoReexame

        setEmails(emailData)
        setNoData(false)
        setTotalRespondido(totalCount || '0')
        setTotalPedidoAberturaProcesso(pedidoAberturaProcesso || '0')
        setTotalPedidoTacito(pedidoTacito || '0')
        setTotalPedidoReexame(pedidoReexame || '0')
      } else {
        setEmails([])
        setNoData(true)
        setTotalRespondido('0')
        setTotalPedidoAberturaProcesso('0')
        setTotalPedidoTacito('0')
        setTotalPedidoReexame('0')
      }
    } catch (err) {
      setEmails([])
      setNoData(true)
      setTotalRespondido('0')
      setTotalPedidoAberturaProcesso('0')
      setTotalPedidoTacito('0')
      setTotalPedidoReexame('0')
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
              {/* <AiReportButton /> */}

              <Select
                onValueChange={(value) => handleYearChange(Number(value))}
                value={selectedYear.toString()}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = dayjs().year() - 2 + i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Select onValueChange={handleWeekChange} value={selectedWeek}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semana" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 52 }, (_, i) => {
                    const week = String(i + 1).padStart(2, '0')
                    return (
                      <SelectItem key={`${week}`} value={`${week}`}>
                        {`Semana ${week}`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <SummaryCard
            icon={<Mail size={20} />}
            title="Total de e-mails respondidos"
            amount={totalRespondido}
          />

          <SummaryCard
            icon={<ListOrdered size={20} />}
            title="Pedidos de Abertura de processo"
            amount={totalPedidoAberturaProcesso}
          />

          <SummaryCard
            icon={<ListOrdered size={20} />}
            title="Pedidos Tácitos"
            amount={totalPedidoTacito}
          />

          <SummaryCard
            icon={<ListOrdered size={20} />}
            title="Pedidos de Reexame"
            amount={totalPedidoReexame}
          />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>E-mails</CardTitle>
                <CardDescription>
                  {`Últimos 10 e-mails respondidos na Semana ${selectedWeek} do ano ${selectedYear}.`}
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
