<script setup lang="ts">
import BookCatalog from '@/components/BookCatalog.vue';
import BookSearchBar from '@/components/BookSearchBar.vue';
import Container from '@/components/Container.vue';
import { getBooks } from '@/services/api';
import type { Book } from '@/types/api/book';
import { onMounted, ref } from 'vue';

const books = ref<Book[]>([]);
const pageCount = ref(0);
const loading = ref(true);
const searchQuery = ref('');
const pagination = ref({
    pageIndex: 0,
    pageSize: 20,
});

const fetchBooks = async () => {
    try {
        loading.value = true;
        const offset = pagination.value.pageIndex * pagination.value.pageSize;
        const limit = pagination.value.pageSize;
        const search = searchQuery.value;

        const response = await getBooks(offset, limit, search);
        books.value = response.data;
        pageCount.value = Math.ceil(response.total / limit);
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchBooks();
});


</script>

<template>
    <main>
        <Container>
            <h1 class="text-3xl font-medium text-center">Catálogo</h1>

            <BookSearchBar class="my-6"/>
            <BookCatalog :books="books"/>
        </Container>    
    </main>
</template>