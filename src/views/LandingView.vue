<script setup lang="ts">
import BookCarousel from '@/components/BookCarousel.vue';
import Container from '@/components/Container.vue';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
</script>

<template>
    <main>
        <Container>
            <h1 class="text-4xl font-bold text-center max-w-200 mx-auto mt-16">Kindle Recommender</h1>
            <p class="text-lg text-center mt-4 max-w-2xl mx-auto">Un simulador de recomendaciones para libros de la tienda de Kindle, extraídos del dataset Amazon Reviews'23, usando implicit, Surprise y Hugging Face</p>
            <div class="flex justify-center mt-8">
                <Button as-child variant="default" class="bg-amber-800 hover:bg-amber-900 text-white">
                    <RouterLink to="/select-user">Explorar Recomendaciones</RouterLink>
                </Button>
            </div>

            <BookCarousel />
        </Container>
    </main>
</template>