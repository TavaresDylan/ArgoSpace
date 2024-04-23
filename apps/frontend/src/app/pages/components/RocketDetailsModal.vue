<template>
  <v-dialog
    :model-value="isActive"
    @update:model-value="handleModelValueUpdate"
    max-width="930px"
  >
    <v-card rounded="xl" class="overflow-hidden">
      <v-card-title class="text-h5 pa-4 font-weight-bold d-flex justify-center">
        {{ rocket?.name }}
        <v-chip class="ml-4" :color="rocket?.isActive ? 'green' : 'red'">{{
          rocket?.isActive ? 'Active' : 'Inactive'
        }}</v-chip>
        <v-btn
          id="close-btn"
          size="x-small"
          variant="flat"
          color="grey"
          class="mx-4 mt-4"
          icon="mdi-close"
          @click="handleCloseDialog"
        ></v-btn
      ></v-card-title>

      <v-carousel
        v-if="!isLoading"
        hide-delimiters
        continuous
        show-arrows="hover"
      >
        <v-carousel-item
          cover
          :src="image.url"
          v-for="image in rocket?.imageUrls"
          :key="image.id"
        ></v-carousel-item>
      </v-carousel>
      <v-card-text class="pa-8">
        <v-row>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold text-h6">Infos</span>
            <p>
              First flight <v-icon>mdi-rocket</v-icon> :
              {{ parseDate(rocket?.firstFlight?.toString()) }}
            </p>
            <p>
              Country <v-icon>mdi-flag</v-icon> : {{ rocket?.country }}
              {{
                rocket?.country === 'United States'
                  ? '🇺🇸'
                  : rocket?.country === 'Republic of the Marshall Islands'
                  ? '🇲🇭'
                  : '❔'
              }}
            </p>
            <p>Company <v-icon>mdi-home</v-icon> : {{ rocket?.company }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold text-h6">Specs</span>
            <p>
              Diameter <v-icon>mdi-diameter</v-icon> :
              {{ rocket?.diameter }} (m)
            </p>
            <p>Mass <v-icon>mdi-weight</v-icon> : {{ rocket?.mass }} (kg)</p>
            <p>
              Height <v-icon>mdi-arrow-up</v-icon> : {{ rocket?.height }} (m)
            </p>
          </v-col>
          <v-col
            v-if="
              rocket?.totalLandings &&
              rocket?.totalLaunches &&
              rocket?.totalReflights
            "
            cols="12"
          >
            <div
              class="d-flex justify-space-around align-center my-2 bg-black w-100 rounded-xl pa-2"
            >
              <p class="text-h6 mx-2 d-flex flex-column align-center">
                <span class="font-weight-bold">{{
                  rocket?.totalLaunches
                }}</span>
                Launches
              </p>
              <p class="text-h6 mx-2 d-flex flex-column align-center">
                <span class="font-weight-bold">{{
                  rocket?.totalReflights
                }}</span>
                Reflights
              </p>
              <p class="text-h6 mx-2 d-flex flex-column align-center">
                <span class="font-weight-bold">{{
                  rocket?.totalLandings
                }}</span>
                Landings
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="css">
#close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<script setup lang="ts">
import type { Prisma } from '@prisma/client';
import axios from 'axios';
import { onMounted, ref, computed, defineEmits, defineProps, watch } from 'vue';

const emit = defineEmits(['open-dialog', 'close-dialog']);

const handleModelValueUpdate = (value: boolean) => {
  if (value) {
    emit('open-dialog');
  } else {
    emit('close-dialog');
  }
};

const handleCloseDialog = () => {
  emit('close-dialog');
};

const props = defineProps({
  isActive: Boolean,
  rocketId: String,
});

const parseDate = computed(
  () => (date: string | undefined) => date && new Date(date).toDateString()
);

const rocket = ref<Prisma.RocketGetPayload<{
  include: {
    imageUrls: true;
  };
}> | null>(null);
const isLoading = ref<boolean>(false);

const fetchRocketDetails = async () => {
  isLoading.value = true;
  await axios
    .get(`http://localhost:3000/rockets/${props.rocketId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      rocket.value = res.data as Prisma.RocketGetPayload<{
        include: {
          imageUrls: true;
        };
      }>;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

watch(
  () => props.rocketId,
  () => {
    fetchRocketDetails();
  },
  { immediate: true }
);

onMounted(() => {
  fetchRocketDetails();
});
</script>
