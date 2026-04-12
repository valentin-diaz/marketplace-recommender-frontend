import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'

// Definición mínima de nuestro usuario
export interface UserType {
  id: string,
  mostReadCategory: string,
}

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
          variant: 'outline',
          size: 'sm',
          onClick: () => {
            console.log('Iniciando personificación para el ID:', user.id)
            // Aquí irá tu lógica real para personificar (ej. llamada a la API, cambio de store, etc.)
          }
        }, () => 'Personificar')
      ])
    },
  },
]