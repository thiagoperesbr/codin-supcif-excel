import dayjs from 'dayjs'
import { CalendarIcon, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function EmailTableFilters({
  onFiltersUpdate,
}: {
  onFiltersUpdate: (filters: Record<string, string>) => void
}) {
  const [cnpj, setCnpj] = useState('')
  const [tipoSolicitacao, setTipoSolicitacao] = useState('all')
  const [dataSolicitacao, setDataSolicitacao] = useState<Date | undefined>(
    undefined,
  )
  const [dataResposta, setDataResposta] = useState<Date | undefined>(undefined)

  const handleApplyFilters = () => {
    const filters: Record<string, string> = {}

    if (cnpj.trim()) filters.cnpj = cnpj
    if (tipoSolicitacao !== 'all') filters.tipo = tipoSolicitacao
    if (dataSolicitacao)
      filters.dataSolicitacao = dayjs(dataSolicitacao).format('YYYY-MM-DD')
    if (dataResposta)
      filters.dataResposta = dayjs(dataResposta).format('YYYY-MM-DD')

    onFiltersUpdate(filters)
  }

  const handleResetFilters = () => {
    setCnpj('')
    setTipoSolicitacao('all')
    setDataResposta(undefined)
    setDataSolicitacao(undefined)
    onFiltersUpdate({})
  }

  useEffect(() => {
    handleApplyFilters()
  }, [tipoSolicitacao, dataSolicitacao, dataResposta])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleApplyFilters()
      }}
      className="flex flex-col items-center gap-2 mb-4 border border-muted-foreground/20 p-4 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">CNPJ:</span>
        <Input
          className="h-9 w-auto"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
        />
        <Button variant="secondary" type="submit" size="sm">
          <Search className="h-4 w-4 mr-2" />
          Filtrar resultados
        </Button>
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={handleResetFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Remover filtros
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={tipoSolicitacao}
          onValueChange={(value) => {
            console.log('Seleção de tipo de solicitação:', value)
            setTipoSolicitacao(value)
          }}
        >
          <SelectTrigger className="h-9 w-[180px] font-semibold">
            <SelectValue>
              {tipoSolicitacao === 'all'
                ? 'Tipos de Solicitação'
                : tipoSolicitacao}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tipos de Solicitação</SelectItem>
            <SelectItem value="Envio de comprovante">
              Envio de comprovante
            </SelectItem>
            <SelectItem value="Pedido de Prorrogação de Prazo">
              Pedido de prorrogação de prazo
            </SelectItem>
            <SelectItem value="Pedido Tácito">Pedido Tácito</SelectItem>
            <SelectItem value="Dúvidas">Dúvidas</SelectItem>
            <SelectItem value="Migrar para outro benefício">
              Migrar para outro benefício
            </SelectItem>
            <SelectItem value="Pedido de acesso ao processo">
              Pedido de acesso ao processo
            </SelectItem>
            <SelectItem value="Encaminhamento para o financeiro">
              Encaminhamento para o financeiro
            </SelectItem>
            <SelectItem value="Pedido de Abertura de processo">
              Pedido de abertura de processo
            </SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dataSolicitacao
                ? dayjs(dataSolicitacao).format('DD/MM/YYYY')
                : 'Data de Solicitação'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dataSolicitacao}
              onSelect={(date) => setDataSolicitacao(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dataResposta
                ? dayjs(dataResposta).format('DD/MM/YYYY')
                : 'Data de Resposta'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dataResposta}
              onSelect={(date) => setDataResposta(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </form>
  )
}
