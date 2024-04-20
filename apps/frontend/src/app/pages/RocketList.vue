<template>
  <div id="rocket-list-container">
    <h1>Rocket list</h1>
    <button @click="back">Back</button>
    <ul>
      <li v-for="rocket in rockets" :key="rocket.id">
        {{ rocket.name }} <br />
        {{ rocket.description }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const rockets = ref([]);

onMounted(() => {
  axios
    .get('http://localhost:3000/rockets')
    .then((res) => {
      console.log(res);
      rockets.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const back = () => {
  router.push('/login');
};
</script>

<style scoped lang="css">
#rocket-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
h1 {
  font-size: 3.4rem;
  text-align: center;
}
button {
  padding: 1rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  background-color: white;
  color: black;
  border-radius: 12px;
  border: 2px solid black;
  cursor: pointer;
}
</style>
