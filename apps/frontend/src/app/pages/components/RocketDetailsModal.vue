<template>
  <v-dialog
    :model-value="isActive"
    @update:model-value="handleModelValueUpdate"
    max-width="930px"
  >
    <v-card :title="rocket?.name">
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

        <p>
          <span>Specs</span> Diameter : {{ rocket?.diameter }} (m)
          <br />
          Mass : {{ rocket?.mass }} (kg)
          <br />
          Height : {{ rocket?.height }} (m)
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="handleCloseDialog"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

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
