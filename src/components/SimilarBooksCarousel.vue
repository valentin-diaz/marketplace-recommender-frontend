<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getSimilarBooksImplicit } from '@/services/api';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { Book } from '@/types/api/book';
import BookItem from './BookItem.vue';
import { Separator } from './ui/separator';

const props = defineProps<{
    bookId: string;
}>();

const recommendations = ref([] as any[]);

const fetchSimilarBooks = async () => {
    try {
        const response = await getSimilarBooksImplicit(props.bookId);
        console.log(response);
        recommendations.value = response.similar_books;
        console.log('Similar books:', recommendations.value);
    } catch (error) {
        console.error('Error fetching similar books:', error);
    }
};

watch(() => props.bookId, async () => {
    await fetchSimilarBooks();
}, { immediate: true });
</script>

<template>
    <h3 class="text-2xl text-center font-semibold mt-6">Libros Similares</h3>
    <Separator class="mb-6"/>
    <Carousel
    class="max-w-4xl mx-auto my-0"
    :opts="{
      align: 'start',
      loop: true,
      slidesToScroll: 1,
    }"
  >
    <CarouselContent class="ml-0">
        <CarouselItem v-for="(recommendation, index) in recommendations" :key="recommendation.book.id" class="pl-2 md:basis-1/4 basis-1/2 sm:basis-1/3">
            <BookItem :book="recommendation.book" class="min-w-100"/>
        </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>