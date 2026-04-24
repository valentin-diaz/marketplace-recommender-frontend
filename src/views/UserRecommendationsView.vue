<script setup lang="ts">
import Container from '@/components/Container.vue';
import YouWouldLove from '@/components/Recommendations/YouWouldLove.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref, watchEffect, reactive } from 'vue';
import { getUser } from '@/services/api';
import type { UserType } from '@/types/api/user';
import UsersAlsoLiked from '@/components/Recommendations/UsersAlsoLiked.vue';


const route = useRoute()

const userState = reactive({
    user: {} as UserType,
    loading: true,
});

const fetchUser = async (id: string) => {
    try {
        userState.loading = true;
        const response = await getUser(id);
        userState.user = response;
        console.log(response);
    } catch (error) {
        console.error('Error fetching user recommendations:', error);
    } finally {
        userState.loading = false;
    }
}

const getUserFavoriteBook = () => {
    if (userState.user.top_books && userState.user.top_books.length > 0) {
        return userState.user.top_books[0]; // Tomamos el primer libro favorito
    }
    return null;
}

watchEffect(async () => {
    const userId = route.params.id as string;
    if (userId) {
        await fetchUser(userId);
    }
});


</script>

<template>
    <main>
        <Container>
            <span class="text-muted-foreground">Usuario: {{ route.params.id }}</span>
            <h1 class="text-2xl font-bold mt-0 mb-4">Recomendaciones personalizadas</h1>

            <Separator class="my-0" />
        </Container>
        <YouWouldLove :user-id="route.params.id as string" />
        <UsersAlsoLiked v-if="getUserFavoriteBook()" :book="getUserFavoriteBook()!" />
    </main>

    

    

</template>