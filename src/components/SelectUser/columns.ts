import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import type { UserType } from '@/types/api/user'


export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'id',
    header: 'ID de Usuario',
  },
  {
    accessorKey: 'mostReadCategory',
    header: 'Categoría Más Leída',
    cell: ({ row }) => {
      const category = row.original.mostReadCategory
      return h('span', { class: 'font-regular' }, category || 'N/A')
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