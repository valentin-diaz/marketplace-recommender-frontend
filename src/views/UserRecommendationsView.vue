<script setup lang="ts">
import Container from '@/components/Container.vue';
import YouWouldLove from '@/components/Recommendations/YouWouldLove.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const userId = route.params.id as string

</script>

<template>
    <main>
        <Container>
            <span class="text-muted-foreground">Usuario: {{ userId }}</span>
            <h1 class="text-2xl font-bold mt-0 mb-4">Recomendaciones personalizadas</h1>

            <Separator class="my-0" />
        </Container>
    </main>

    <YouWouldLove :user-id="userId"/>
</template>