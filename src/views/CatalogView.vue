<script setup lang="ts">
import BookCatalog from '@/components/BookCatalog.vue';
import BookSearchBar from '@/components/BookSearchBar.vue';
import Container from '@/components/Container.vue';
import { getBooks } from '@/services/api';
import type { Book } from '@/types/api/book';
import { onMounted, ref, watch } from 'vue';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button';

const books = ref<Book[]>([]);
const totalItems = ref(0);
const loading = ref(true);
const searchQuery = ref('');
const pagination = ref({
    pageIndex: 1,
    pageSize: 20,
});

const fetchBooks = async () => {
    try {
        loading.value = true;
        const offset = (pagination.value.pageIndex - 1) * pagination.value.pageSize;
        const limit = pagination.value.pageSize;
        const search = searchQuery.value;

        const response = await getBooks(offset, limit, search);
        books.value = response.books;
        totalItems.value = response.total;
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        loading.value = false;
    }
}

watch(pagination, () => {
    fetchBooks();
}, { deep: true });

let searchTimeout: ReturnType<typeof setTimeout>

watch(searchQuery, () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        pagination.value.pageIndex = 1; // Reiniciamos a la página 1 cada vez que se hace una búsqueda nueva
        fetchBooks();
    }, 500);
});

onMounted(() => {
    fetchBooks();
});


</script>

<template>
    <main>
        <Container>
            <h1 class="text-3xl font-medium text-center">Catálogo</h1>

            <BookSearchBar v-model="searchQuery" class="my-6"/>
            <BookCatalog :books="books"/>
            <div class="mt-8 flex justify-center" v-if="totalItems > 0">
            <Pagination
                v-model:page="pagination.pageIndex"
                :items-per-page="pagination.pageSize"
                :total="totalItems"
            >
                <PaginationContent v-slot="{ items }">
                    
                    <PaginationPrevious />
                    
                    <template v-for="(item, index) in items" :key="index">
                        
                        <PaginationItem
                            v-if="item.type === 'page'"
                            :value="item.value"
                            :is-active="item.value === pagination.pageIndex"
                        >
                            {{ item.value }}
                        </PaginationItem>
                        
                        <PaginationEllipsis v-else />
                        
                    </template>
                    
                    <PaginationNext />
                    
                </PaginationContent>
            </Pagination>
            </div>
        </Container>    
    </main>
</template>
