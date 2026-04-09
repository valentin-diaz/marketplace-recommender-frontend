<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { getFeaturedBooks } from '@/services/api';
import { onMounted, reactive } from 'vue';

const booksState = reactive({
  books: [] as Array<{ id: number; title: string; author: string; cover_image: string }>,
  isLoading: true,
});

onMounted(async () => {
  const response = await getFeaturedBooks();
  booksState.books = response.data;
  booksState.isLoading = false;
  console.log(booksState.books);
});

</script>
<template>
  <Carousel
    class="w-full max-w-xl mx-auto my-16"
    :opts="{
      align: 'center',
      loop: true,
      slidesToScroll: 'auto'
    }"
  >
    <CarouselContent class="ml-0">
        <CarouselItem v-for="(book, index) in booksState.books" :key="book.id" class="pl-2 basis-auto">
            <div
            class="flex h-48 items-center justify-center py-1" 
            >  
            <img 
                :src="book.cover_image" 
                alt="Book Cover" 
                class="h-full w-auto rounded-lg shadow-black/95" 
            />
            </div>
        </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>