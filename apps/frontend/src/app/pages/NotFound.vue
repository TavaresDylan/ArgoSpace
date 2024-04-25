<template>
  <v-container
    class="d-flex flex-column align-center justify-center flex-grow-1 h-screen"
  >
    <h1 class="text-h2 text-center">Page not found</h1>
    <img height="560px" :src="NotFoundIllustration" />
    <v-btn class="mt-4" variant="outlined" @click="back">Back to home</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import NotFoundIllustration from '../../assets/NotFoundIllustration.svg?url';

const router = useRouter();
const back = () => {
  router.push('/rocket-list');
};
</script>
