<template>
  <v-dialog
    :model-value="isActive"
    @update:model-value="handleModelValueUpdate"
    max-width="930px"
  >
    <v-card class="overflow-hidden" :title="rocket?.name">
      <v-btn
        id="close-btn"
        size="x-small"
        variant="flat"
        color="grey"
        class="ma-2"
        icon="mdi-close"
        @click="handleCloseDialog"
      ></v-btn>
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
      <v-card-text>
        <v-row>
          <v-col>
            <span class="font-weight-bold text-h6">Infos</span>
            <p>
              First flight 🚀 : {{ parseDate(rocket?.firstFlight?.toString()) }}
            </p>
            <p>
              Country : {{ rocket?.country }}
              {{
                rocket?.country === 'United States'
                  ? '🇺🇸'
                  : rocket?.country === 'Republic of the Marshall Islands'
                  ? '🇲🇭'
                  : '❔'
              }}
            </p>
            <p>Company : {{ rocket?.company }}</p>
          </v-col>
          <v-col>
            <span class="font-weight-bold text-h6">Specs</span>
            <p>Diameter : {{ rocket?.diameter }} (m)</p>
            <p>Mass : {{ rocket?.mass }} (kg)</p>
            <p>Height : {{ rocket?.height }} (m)</p>
          </v-col>
          <v-col
            v-if="
              rocket?.totalLandings &&
              rocket?.totalLaunches &&
              rocket?.totalReflights
            "
            cols="12"
          >
            <div class="d-flex justify-space-around align-center my-2">
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
