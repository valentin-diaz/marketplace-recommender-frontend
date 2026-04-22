import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import type { UserType } from '@/types/api/user'
import type { Book } from '@/types/api/book'


export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'id',
    header: 'ID de Usuario',
  },
  {
    accessorKey: 'mostReadCategory',
    header: 'Categoría Más Leída',
    cell: ({ row }) => {
      const category = row.original.top_category
      return h('span', { class: 'font-regular' }, category.replace('[', '').replace(']', '') || 'N/A')
    }
  },
  {
      accessorKey: 'top_rated_books',
      header: 'Libros Mejor Calificados',
      cell: ({ row }) => {
        const books = row.original.top_books || []
        return h('div', { class: 'flex flex-col gap-1 max-w-[200px]' }, books.map((book: Book) => 
          h('span', { class: 'font-regular truncate', title: book.title }, book.title)
        ))
      }
  },
  {
    id: 'acciones',
    header: 'Acciones',
    cell: ({ row }) => {
      const user = row.original

      return h('div', { class: 'relative' }, [
        h(Button, {
          size: 'sm',
          asChild: true, // <-- Delega el renderizado al componente hijo
        }, () => 
          h(RouterLink, { 
            to: `/recomendaciones/${user.id}` 
          }, () => 'Personificar')
        )
      ])
    },
  },
]