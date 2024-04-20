<template>
  <div id="user-menu-container" v-if="loggedInUser">
    <span>{{ loggedInUser.email }}</span>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { FirebaseApp } from '@argolight-space/firebase';
import { getAuth, type User } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loggedInUser = ref<User | null>(null);

getAuth(FirebaseApp).onAuthStateChanged((user) => {
  loggedInUser.value = user;
});

const logout = () => {
  getAuth(FirebaseApp)
    .signOut()
    .then(() => {
      router.push('/login');
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped lang="css">
#user-menu-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-radius: 0 0 0 12px;
  padding: 12px;
}
span {
  text-align: end;
}
button {
  align-self: center;
  width: 120px;
  margin: 0.2rem;
  margin-top: 6px;
  padding: 0.4rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  background-color: rgb(239, 54, 54);
  color: white;
  border-radius: 12px;
  border: 2px solid black;
  cursor: pointer;
}
</style>
