<script setup lang="ts">
import { getYouWouldLoveBook } from '@/services/api';
import Container from '../Container.vue';
import { onMounted, reactive } from 'vue';
import type { Book } from '@/types/api/book';
import Explanation from './Explanation.vue';

const props = defineProps<{
    userId: string;
}>();

const bookState = reactive({
    recommendation: {} as Book,
    isLoading: true,
});

const fetchBookRecommendation = async () => {
    try {
        const response = await getYouWouldLoveBook(parseInt(props.userId));
        bookState.recommendation = response.data; // Asumiendo que la respuesta tiene una propiedad 'data' con
        bookState.isLoading = false;
        console.log('Book recommendation fetched:', bookState.recommendation);
    } catch (error) {
        console.error('Error fetching book recommendations:', error);
        return null;
    } finally {
        bookState.isLoading = false;
    }
};

onMounted(() => {
    fetchBookRecommendation();
});
</script>

<template>
    <Container>
        <h2 class="text-4xl font-bold text-center mb-4">Creemos que podría encantarte</h2>

        <div class="flex">
        <div class="flex flex-col gap-2 my-8 flex-1">
            <div class="place-items-center">
                <img 
                    class="h-80 w-auto"
                    :src="bookState.recommendation.coverImage" :alt="bookState.recommendation.title">
            </div>
            <div class="flex flex-col justify-center gap-4 align-center text-center">
                <h3 class="text-3xl font-bold">{{ bookState.recommendation.title }}</h3>
                <p class="text-lg">{{ bookState.recommendation.author }}</p>
            </div>
        </div>

        <Explanation trigger="¿Cómo funciona?" class="flex-1">
            Analizamos tu historial de compras y lo comparamos con el de otros usuarios similares para encontrar patrones y sugerirte libros que podrían gustarte.
        </Explanation>
        </div>
    </Container>
</template>