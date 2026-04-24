<script setup lang="ts">
import { getTop5RecommendedBooks, getYouWouldLoveBook } from '@/services/api';
import Container from '../Container.vue';
import { onMounted, reactive } from 'vue';
import type { Book } from '@/types/api/book';
import type { TopBooksResponse } from '@/types/api/topBookRecommendation';
import Explanation from './Explanation.vue';
import Separator from '../ui/separator/Separator.vue';
import RecommendationsCarousel from './RecommendationsCarousel.vue';
import type { ImplicitBookRecommendation } from '@/types/api/similarBookRecommendation';

const props = defineProps<{
    userId: string;
}>();

const booksState = reactive({
    recommendations: [] as ImplicitBookRecommendation[],
    isLoading: true,
});

const fetchBookRecommendation = async () => {
    try {
        const response = await getTop5RecommendedBooks(props.userId);
        booksState.recommendations = response.recommended_books; 
        booksState.isLoading = false;
        console.log('Top Book recommendations fetched:', booksState.recommendations);
    } catch (error) {
        console.error('Error fetching book recommendations:', error);
        return null;
    } finally {
        booksState.isLoading = false;
    }
};

onMounted(() => {
    fetchBookRecommendation();
});
</script>

<template>
    <Container>
        <h2 class="text-4xl font-bold text-center mb-4">Podrían gustarte...</h2>

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