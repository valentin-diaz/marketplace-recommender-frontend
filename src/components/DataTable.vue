<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number // Necesario para decirle a la tabla cuántas páginas existen en total
}>()

// Usamos defineModel (Vue 3.4+) para mantener sincronizado el estado con la vista padre
const pagination = defineModel<{ pageIndex: number; pageSize: number }>('pagination', {
  default: () => ({ pageIndex: 0, pageSize: 10 }),
})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  get pageCount() { return props.pageCount },
  state: {
    get pagination() { return pagination.value },
  },
  onPaginationChange: (updaterOrValue) => {
    // TanStack actualiza el estado, nosotros lo reflejamos en nuestro v-model
    pagination.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(pagination.value)
      : updaterOrValue
  },
  manualPagination: true, // ¡La clave! Desactiva la paginación interna
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No hay usuarios disponibles.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    </div>

    <div class="flex flex-col gap-6 my-4">
    <Pagination v-slot="{ page }" :items-per-page="10" :total="props.pageCount * 10" :default-page="1">
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious @click="table.setPageIndex(page - 2)" />
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
            @click="table.setPageIndex(item.value - 1)"
          >
            {{ item.value }}
          </PaginationItem>
        </template>
        <PaginationNext @click="table.setPageIndex(page)" />
      </PaginationContent>
    </Pagination>
  </div>
</template>
 