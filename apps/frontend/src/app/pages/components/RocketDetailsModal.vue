<template>
  <v-dialog
    :model-value="isActive"
    @update:model-value="handleModelValueUpdate"
    max-width="500"
  >
    <v-card :title="rocket?.name">
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
import type { Rocket } from '@prisma/client';
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

const rocket = ref<Rocket | null>(null);
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
      rocket.value = res.data as Rocket;
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
