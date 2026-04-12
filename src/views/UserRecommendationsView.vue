<script setup lang="ts">
import Container from '@/components/Container.vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const userId = route.params.id as string

</script>

<template>
    <Container>
        <span class="text-muted-foreground">Usuario: {{ userId }}</span>
        <h1 class="text-2xl font-bold mt-0 mb-8">Recomendaciones personalizadas</h1>

        <h2 class="text-4xl font-bold text-center">Creemos que podría encantarte</h2>
    </Container>
</template>