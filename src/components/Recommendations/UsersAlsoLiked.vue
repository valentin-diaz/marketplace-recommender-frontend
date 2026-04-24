<script setup lang="ts">
import { getSimilarBooksImplicit } from '@/services/api';
import Container from '../Container.vue';
import { onMounted, watch ,reactive } from 'vue';
import type { Book } from '@/types/api/book';
import type { ImplicitBookRecommendation } from '@/types/api/similarBookRecommendation';
import RecommendationsCarousel from './RecommendationsCarousel.vue';
import Explanation from './Explanation.vue';

const props = defineProps<{
    book: Book;
}>();

const booksState = reactive({
    recommendations: [] as ImplicitBookRecommendation[],
    isLoading: true,
});

const fetchSimilarBooks = async () => {
    try {
        const response = await getSimilarBooksImplicit(props.book.id);
        booksState.recommendations = response.similar_books; // Asumiendo que la respuesta tiene una propiedad 'data' con las recomendaciones
        booksState.isLoading = false;
        console.log('Similar books fetched:', booksState.recommendations);
    } catch (error) {
        console.error('Error fetching similar books:', error);
    } finally {
        booksState.isLoading = false;
    }
};

onMounted(() => {
    fetchSimilarBooks();
});

</script>

<template>
    <Container>
        <h2 class="text-4xl font-bold text-center mb-4">A los usuarios que les gustó {{ props.book.title }}, también les gustó...</h2>

        <div v-if="booksState.isLoading" class="text-center text-gray-500">Cargando recomendaciones...</div>
        <div v-else-if="booksState.recommendations.length === 0" class="text-center text-gray-500">No se encontraron recomendaciones similares.</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecommendationsCarousel :recommendations="booksState.recommendations" />
            <Explanation trigger="¿Cómo funciona?">
                Analizamos tu historial de compras y lo comparamos con el de otros usuarios similares para encontrar patrones y sugerirte libros que podrían gustarte.
            </Explanation>
        </div>
    </Container>    
</template>