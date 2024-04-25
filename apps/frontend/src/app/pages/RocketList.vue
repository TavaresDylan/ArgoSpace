<template>
  <v-container
    fluid
    id="rocket-list-container"
    class="d-flex flex-column flex-grow-1 h-100"
  >
    <h1 class="text-h1 my-4 text-white">
      R<span class="cursor-pointer" @click="handleEasterEgg">o</span>cket list
    </h1>

    <div class="d-flex flex-column align-center justify-center h-100">
      <span
        v-if="fetchError"
        class="text-h6 text-red d-flex flex-column align-center justify-center my-4"
        >{{ fetchError }}
        <v-btn @click="fetchRockets" variant="flat" color="blue"
          >Retry</v-btn
        ></span
      >
      <div
        v-if="isLoading"
        class="d-flex align-center justify-center flex-column"
      >
        <v-progress-circular
          size="large"
          indeterminate
          color="secondary"
        ></v-progress-circular>
        <p class="mt-2 text-white font-weight-bold">Loading ...</p>
      </div>
    </div>

    <v-row v-if="!isLoading && rockets.length > 0" justify="center">
      <v-col cols="12" md="6" lg="5" v-for="rocket in rockets" :key="rocket.id">
        <v-card
          variant="elevated"
          @click="handleCardClick(rocket.id)"
          height="100%"
          class="d-flex flex-column"
        >
          <v-img cover :src="rocket.imageUrls[0].url" />
          <v-card-text>
            <h2 class="text-h4">{{ rocket.name }}</h2>
            <div class="my-2">
              <v-chip :color="rocket.isActive ? 'green' : 'red'">{{
                rocket.isActive ? 'Active' : 'Inactive'
              }}</v-chip>
            </div>
            <p class="text-body-1">{{ rocket.description }}</p>
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
    <v-img id="easter-egg-img" v-if="isEasterEggActive" :src="MuskPng"></v-img>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { type Prisma } from '@prisma/client';
import RockerDetailsModal from './components/RocketDetailsModal.vue';
import MuskPng from '../../assets/musk.png';

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
const isEasterEggActive = ref<boolean>(false);

const handleCloseDialog = (): void => {
  isDialogActive.value = false;
};

const handleOpenDialog = (): void => {
  isDialogActive.value = false;
};

const handleCardClick = (rocketId: string): void => {
  activeRocketId.value = rocketId;
  isDialogActive.value = true;
};

const handleEasterEgg = (): void => {
  isEasterEggActive.value = true;
  setTimeout(() => {
    isEasterEggActive.value = false;
  }, 2000);
};

const fetchRockets = async () => {
  isLoading.value = true;
  setTimeout(async () => {
    await axios
      .get('/rockets')
      .then((res) => {
        rockets.value = res.data as Prisma.RocketGetPayload<{
          include: {
            imageUrls: true;
          };
        }>[];
        fetchError.value = '';
      })
      .catch((err: Error) => {
        fetchError.value = 'An error occurred while fetching rockets';
        console.error(err);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }, 2000);
};

onMounted(() => {
  fetchRockets();
});
</script>

<style scoped lang="css">
#rocket-list-container {
  background: url('../../assets/Sprinkle.svg') no-repeat center center;
  background-size: cover;
}
#easter-egg-img {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200px;
  z-index: 1000;
}
</style>
