import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { FileTableFilters } from './file-table-filters'
import { FileTableRow } from './file-table-row'

export function Files() {
  return (
    <>
      <Helmet title="Arquivos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Arquivos</h1>
        <div className="space-y-2.5">
          <FileTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[180px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Enviado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="w-[120px]">Tamanho</TableHead>
                  <TableHead className="w-[140px]"></TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => {
                  return <FileTableRow key={i} />
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
