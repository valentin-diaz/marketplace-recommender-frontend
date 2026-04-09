<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
</script>
<template>
  <Carousel
    class="w-full max-w-2xl mx-auto my-16"
    :opts="{
      align: 'center',
    }"
  >
    <CarouselContent class="-ml-1">
      <CarouselItem v-for="(_, index) in 7" :key="index" class="pl-1 md:basis-1/3 lg:basis-1/4">
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-2xl font-semibold">{{ index + 1 }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>