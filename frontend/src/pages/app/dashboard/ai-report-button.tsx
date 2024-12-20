import { BotIcon } from 'lucide-react'
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

  const loadReports = async (year: number) => {
    setLoading(true)
    try {
      const response = await api.get(`/api/reports/${year}`)
      setReports(response.data.reports)
    } catch (err) {
      console.error('Erro ao carregar relatórios', err)
    } finally {
      setLoading(false)
    }
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
          <DialogTitle className="mb-3">Relatórios Mensais</DialogTitle>
          <DialogDescription>
            Visualize e faça download dos relatórios mensais de e-mails gerados
            pela IA do sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center">
          <label className="text-sm font-semibold mr-2">Selecione o ano:</label>
          <Select onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Semana" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
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
                    <td>{report.name}</td>
                    <td>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          window.open(
                            `/uploads/reports/${selectedYear}/${report.month}/${report.name}`,
                            '_blank',
                          )
                        }
                      >
                        Download
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
