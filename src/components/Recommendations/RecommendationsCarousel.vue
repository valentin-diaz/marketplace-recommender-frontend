<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getSimilarBooksImplicit } from '@/services/api';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { SimilarBookRecommendation, SimilarBooksResponse } from '@/types/api/similarBookRecommendation';
import BookItem from '../BookItem.vue';
import { Separator } from '../ui/separator';
import { truncateNumber } from '@/utils/utils';

const props = defineProps<{
    recommendations: SimilarBookRecommendation[];
}>();

</script>

<template>
    <Carousel
    class="w-full mx-auto my-0"
    :opts="{
      align: 'start',
      loop: true,
      slidesToScroll: 1,
    }"
  >
    <CarouselContent class="ml-0">
        <CarouselItem v-for="(recommendation, index) in recommendations" :key="recommendation.book.id" class="pl-2 basis-1/2 sm:basis-1/3">
            <BookItem :book="recommendation.book" :score="truncateNumber(recommendation.similarity_score, 2)" class="min-w-100"/>
        </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>