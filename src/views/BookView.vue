<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { getBookDetails } from '@/services/api';
import type { Book } from '@/types/api/book';
import { useRoute } from 'vue-router';
import Container from '@/components/Container.vue';
import { Separator } from '@/components/ui/separator'
import SimilarBooksCarousel from '@/components/SimilarBooksCarousel.vue';


const route = useRoute()

const book = ref<Book | null>(null);

const fetchBook = async (id: string) => {
    try {
        const response = await getBookDetails(id);
        book.value = response;
    } catch (error) {
        console.error('Error fetching book:', error);
    }
}

watchEffect(async () => {
    const bookId = route.params.id as string;
    if (bookId) {
        await fetchBook(bookId);
    }
});
</script>

<template>
    <Container>
        <div v-if="book" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex justify-center">
                <img :src="book.image_url" :alt="book.title" class="h-96 w-auto rounded-lg shadow-md">
            </div>
            <div class="flex flex-col justify-start gap-4">
                <span class="text-sm font-light">{{ book.id }}</span>
                <h1 class="text-4xl font-bold">{{ book.title }}</h1>
                <p class="text-md">{{ book.author_name }}</p>
                <div>
                    <h2 class="text-md font-medium mt-4 uppercase">Descripción</h2>
                    <Separator class="my-0 p-0 bg-gray-300"/>
                </div>
                <p class="text-md ">{{ book.description }}</p>
                <div>
                    <h2 class="text-md font-medium mt-4 uppercase">Categorías</h2>
                    <Separator class="my-0 p-0 bg-gray-300"/>
                </div>
                <p class="text-md ">{{ book.categories }}</p>
            </div>
        </div>
        <p v-else class="text-center text-gray-500">Cargando detalles del libro...</p>

        <SimilarBooksCarousel v-if="book" :bookId="book.id"/>
    </Container>
</template>