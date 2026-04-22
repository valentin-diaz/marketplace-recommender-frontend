<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import DataTable from '@/components/DataTable.vue'
import { columns } from '@/components/SelectUser/columns'
import type { UserType } from '@/types/api/user'
import Container from '@/components/Container.vue'
import { getUsers } from '@/services/api'
import Input from '@/components/ui/input/Input.vue'

// Datos mockeados para probar la estructura base
const data = ref<UserType[]>([])
const pageCount = ref(0)
const loading = ref(false)
const searchQuery = ref('')

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

let searchTimeout: ReturnType<typeof setTimeout>

const fetchUsers = async () => {
    loading.value = true // Asegúrate de activar el loading aquí
    try {
        const offset = pagination.value.pageIndex * pagination.value.pageSize
        const limit = pagination.value.pageSize
        const search = searchQuery.value // Lo que haya escrito el usuario

        const response = await getUsers(offset, limit, search)
        data.value = response.users
        console.log('Usuarios obtenidos:', data.value)

        pageCount.value = Math.ceil(response.total / limit)

    } catch (error) {
        console.error('Error fetching users:', error)
    } finally {
        loading.value = false
    }
}

watch(pagination, () => {
    fetchUsers()
}, { deep: true })

watch(searchQuery, () => {
    clearTimeout(searchTimeout)
    
    searchTimeout = setTimeout(() => {
        // Reiniciamos a la página 1 cada vez que se hace una búsqueda nueva
        pagination.value.pageIndex = 0 
        fetchUsers()
    }, 500) // 500ms de gracia antes de disparar la petición
})

onMounted(() => {
    fetchUsers()
})
</script>

<template>
  <Container>
    <h1 class="mb-6 text-3xl font-bold text-center">Selecciona un usuario</h1>
    <p class="text-center text-muted-foreground mb-2">
      Selecciona un usuario para ver las recomendaciones personalizadas basadas en su historial de compras.
    </p>
    <div class="mx-auto">
    <div class="flex items-center justify-between py-4">
      <Input
        v-model="searchQuery"
        placeholder="Buscar por categoría"
        class="w-full"
      />
      <span v-if="loading" class="text-sm text-muted-foreground animate-pulse">
        Cargando...
      </span>
    </div>
    
    <DataTable :columns="columns" :data="data" :pageCount="pageCount" v-model:pagination="pagination" />
    </div>
  </Container>
</template>