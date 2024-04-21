<script setup lang="ts">
import UserMenu from './layout/UserMenu.vue';
import { onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '@argolight-space/firebase';

onMounted(() => {
  getAuth(FirebaseApp).onAuthStateChanged((user) => {
    if (user !== null) {
      console.log('User logged in', user);
    }
  });
});
</script>

<template>
  <v-app>
    <v-main>
      <UserMenu />
      <router-view />
    </v-main>
  </v-app>
</template>
