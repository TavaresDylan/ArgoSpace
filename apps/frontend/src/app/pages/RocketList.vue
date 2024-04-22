<template>
  <v-container id="rocket-list-container h-screen">
    <h1 class="text-h1 my-4">Rocket list</h1>
    <span v-if="fetchError" class="text-h6 text-red">{{ fetchError }}</span>
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
        <v-card
          @click="handleCardClick(rocket.id)"
          height="100%"
          class="d-flex flex-column"
        >
          <v-img cover :src="rocket.imageUrls[0].url" />
          <v-card-text>
            <span class="text-h4">{{ rocket.name }}</span>
            <div class="my-2">
              <v-chip :color="rocket.isActive ? 'green' : 'red'">{{
                rocket.isActive ? 'Active' : 'Inactive'
              }}</v-chip>
            </div>
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
        </v-card>
      </v-col>
    </v-row>
    <RockerDetailsModal
      @open-dialog="handleOpenDialog"
      @close-dialog="handleCloseDialog"
      :isActive="isDialogActive"
      :rocketId="activeRocketId"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { type Prisma } from '@prisma/client';
import RockerDetailsModal from './components/RocketDetailsModal.vue';

const rockets = ref<
  Prisma.RocketGetPayload<{
    include: {
      imageUrls: true;
    };
  }>[]
>([]);
const isLoading = ref<boolean>(false);
const fetchError = ref<string>('');
const isDialogActive = ref<boolean>(false);
const activeRocketId = ref<string>('');

const handleCloseDialog = (): void => {
  isDialogActive.value = false;
};

const handleOpenDialog = (): void => {
  isDialogActive.value = false;
};

const handleCardClick = (rocketId: string): void => {
  console.log(rocketId);
  activeRocketId.value = rocketId;
  isDialogActive.value = true;
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(async () => {
    await axios
      .get('http://localhost:3000/rockets', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        rockets.value = res.data as Prisma.RocketGetPayload<{
          include: {
            imageUrls: true;
          };
        }>[];
        isLoading.value = false;
      })
      .catch((err) => {
        isLoading.value = false;
        fetchError.value = 'An error occurred while fetching rockets';
        console.log(err);
      });
  }, 2000);
});
</script>
