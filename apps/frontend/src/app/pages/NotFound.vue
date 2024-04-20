<template>
  <div>
    <h1>Page not found</h1>
    <button @click="back">Back to home</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const back = () => {
  router.push('/login');
};
</script>
