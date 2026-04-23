<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Book } from '@/types/api/book'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const props = defineProps({
    book: {type: Object as () => Book, required: true}
})

console.log('BookItem props:', props.book)
</script>

<template>
  <router-link :to="`/books/${props.book.id}`" class="w-full">
  <Card class="h-full p-0 gap-0 rounded-none hover:shadow-lg transition-shadow duration-300">
    <CardHeader class="w-full p-0 mb-0">
        <div class="h-80">
        <img 
            :src="props.book.image_url" 
            alt="Book Cover" 
            class="h-full w-full object-cover" 
        />
        </div>
    </CardHeader>
    <CardContent class="px-3 py-3 mt-0">
      <CardTitle class="mb-4">{{ props.book.title }}</CardTitle>
      <CardDescription>{{ props.book.author_name }}</CardDescription>
    </CardContent>
  </Card>
    </router-link>
</template>
