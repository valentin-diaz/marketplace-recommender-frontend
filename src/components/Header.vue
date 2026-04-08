<script setup lang="ts">
import Container from './Container.vue';
import Navbar from './Navbar.vue';
import SearchBar from './SearchBar.vue';


</script>

<template>
    <header class="bg-amber-500">
    <Container>
        <div class="flex justify-between gap-x-2">
        
        <div class="flex-1 place-content-center text-center">
            <h1 class="text-2xl font-bold">MarketPlace <br> Recommender</h1>
        </div>
        <div class="flex-2 flex items-center justify-center flex-col gap-y-2">
            <SearchBar />
            <Navbar />
        </div>
        <div class="flex-1 text-center place-content-center">Perfil</div>
        </div>
        
    </Container>
    </header>
        
</template>