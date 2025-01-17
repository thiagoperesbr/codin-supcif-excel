import { BotIcon, DownloadIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import api from '@/config/api'

const AiReportButton = () => {
  interface Report {
    month: string
    name: string
  }

  const [reports, setReports] = useState<Report[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)

  const monthNames: { [key: string]: string } = {
    '01': 'Janeiro',
    '02': 'Fevereiro',
    '03': 'Março',
    '04': 'Abril',
    '05': 'Maio',
    '06': 'Junho',
    '07': 'Julho',
    '08': 'Agosto',
    '09': 'Setembro',
    '10': 'Outubro',
    '11': 'Novembro',
    '12': 'Dezembro',
  }

  const loadReports = async (year: number) => {
    setLoading(true)
    try {
      const response = await api.get(`/api/reports/${year}`)
      setReports(response.data || [])
    } catch (err) {
      console.error('Erro ao carregar relatórios', err)
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const generateYears = (startYear: number, yearAhead: number) => {
    const currentYear = new Date().getFullYear()
    const years = []

    for (let year = startYear; year <= currentYear + yearAhead; year++) {
      years.push(year)
    }

    return years
  }

  useEffect(() => {
    loadReports(selectedYear)
  }, [selectedYear])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="mr-2">Relatórios Mensais</div>
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="mb-2">Relatórios Mensais</DialogTitle>
          <DialogDescription>
            Visualize e faça download dos relatórios mensais de e-mails.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center">
          <label className="text-sm font-semibold mr-2">Selecione o ano:</label>
          <Select
            onValueChange={(value) => setSelectedYear(parseInt(value))}
            defaultValue={String(selectedYear)}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {generateYears(2025, 10).map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="table w-full mt-4">
            <thead>
              <tr>
                <th>Mês</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.month}>
                    <td className="px-4 py-2 border text-center">
                      {monthNames[report.month] || 'Mês Desconhecido'}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          window.open(
                            `/uploads/reports/${selectedYear}/${report.name}`,
                            '_blank',
                          )
                        }
                      >
                        <DownloadIcon className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center">
                    Nenhum relatório encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
