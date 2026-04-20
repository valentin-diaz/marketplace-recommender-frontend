<script setup lang="ts">
import BookItem from './BookItem.vue';
import type { Book } from '@/types/api/book'

const props = defineProps({
    books: {type: Array as () => Book[], required: true}
})

</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        <BookItem v-for="book in props.books" :key="book.id" :book="book"/>
    </div>
</template>