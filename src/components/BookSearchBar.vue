<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
const model = defineModel<string>();
</script>

<template>
    <Input v-model="model" class="bg-white" placeholder="Buscar libros"/>
</template>