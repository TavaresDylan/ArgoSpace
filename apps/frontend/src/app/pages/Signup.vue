<template>
  <div id="login-container">
    <h1>Signup</h1>
    <form @submit.prevent="signup">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="password" v-model="confirm" placeholder="Confirm Password" />
      <button type="submit">Signup</button>
    </form>

    <router-link to="/login">Already have an account ?</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FirebaseApp } from '@argolight-space/firebase';

const email = ref<string>('');
const password = ref<string>('');
const confirm = ref<string>('');

const router = useRouter();

const signup = () => {
  createUserWithEmailAndPassword(
    getAuth(FirebaseApp),
    email.value,
    password.value
  )
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
      router.push('/rocket-list');
    });
};
</script>

<style scoped lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
}
#login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: contain;
  background-position: center center;
  background: url('https://www.spacex.com/static/images/falcon-9/F9_1.jpg')
    no-repeat;
}
h1 {
  font-size: 3.4rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 4.3rem;
}
input {
  padding: 1rem;
  font-size: 1.6rem;
  border-radius: 12px;
  border: none;
  background-color: white;
  color: black;
  width: 100%;
  text-align: center;
}
button {
  padding: 1rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  background-color: white;
  color: white;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background-color: rgb(9, 108, 178);
}
</style>
