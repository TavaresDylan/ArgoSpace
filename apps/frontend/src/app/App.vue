<script setup lang="ts">
import UserMenu from './layout/UserMenu.vue';
import { onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '@argolight-space/firebase';

onMounted(() => {
  console.log('App mounted');
  getAuth(FirebaseApp).onAuthStateChanged((user) => {
    if (user !== null) {
      console.log('User logged in');
      console.log(user);
    }
  });
});
</script>

<template>
  <UserMenu />
  <router-view />
</template>
