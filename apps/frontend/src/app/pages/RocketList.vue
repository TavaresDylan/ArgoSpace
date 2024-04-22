<template>
  <v-container id="rocket-list-container h-screen">
    <h1 class="text-h1 my-4">Rocket list</h1>
    <div
      v-if="isLoading"
      class="d-flex align-center justify-center flex-column"
    >
      <v-progress-circular
        size="large"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <p class="mt-2">Loading ...</p>
    </div>
    <v-row v-if="!isLoading" justify="center">
      <v-col cols="12" md="6" lg="5" v-for="rocket in rockets" :key="rocket.id">
        <v-card height="100%" class="d-flex flex-column">
          <v-img cover height="340px" :src="rocket.imgUrl || undefined" />
          <v-card-text
            ><div class="my-2">
              <v-chip :color="rocket.isActive ? 'green' : 'red'">{{
                rocket.isActive ? 'Active' : 'Inactive'
              }}</v-chip>
            </div>
            <span class="text-h4">{{ rocket.name }}</span>
            <p>{{ rocket.description }}</p>
            <div
              id="stats"
              class="d-flex justify-center align-center my-2"
              v-if="
                rocket.totalLandings &&
                rocket.totalLaunches &&
                rocket.totalReflights
              "
            >
              <p class="text-h6 mx-2 d-flex flex-column align-center">
                <span class="font-weight-bold">{{ rocket.totalLaunches }}</span>
                Launches
              </p>
              <p class="text-h6 mx-2 d-flex flex-column align-center">
                <span class="font-weight-bold">{{
                  rocket.totalReflights
                }}</span>
                Reflights
              </p>
              <p class="text-h6 mx-2 d-flex flex-column align-center">
                <span class="font-weight-bold">{{ rocket.totalLandings }}</span>
                Landings
              </p>
            </div>
          </v-card-text>
          <v-card-actions
            ><v-btn variant="tonal">See more</v-btn></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { type Rocket } from '@prisma/client';

const rockets = ref<Rocket[]>([]);
const isLoading = ref<boolean>(false);
const fetchError = ref<string>('');

onMounted(async () => {
  isLoading.value = true;
  await axios
    .get('http://localhost:3000/rockets', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      setTimeout(() => {
        rockets.value = res.data as Rocket[];
        isLoading.value = false;
      }, 2000);
    })
    .catch((err) => {
      isLoading.value = false;
      fetchError.value = 'An error occurred while fetching rockets';
      console.log(err);
    });
});
</script>
