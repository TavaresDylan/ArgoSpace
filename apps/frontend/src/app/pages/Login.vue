<template>
  <div class="d-flex flex-grow-1" id="login-container">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="10" sm="6" md="5" lg="3">
        <v-card id="signup-card" class="pa-8">
          <h1 class="text-center mb-4">Login</h1>
          <v-form class="d-flex ga-4 flex-column" @submit.prevent="login">
            <p class="text-center my-4" id="form-error" v-show="formError">
              {{ formError }}
            </p>
            <v-text-field
              full-width
              label="Email"
              name="email"
              variant="solo"
              type="text"
              v-model="email"
              placeholder="xxxxxxx@xxx.xx"
            />
            <v-text-field
              full-width
              label="Password"
              name="password"
              variant="solo"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="*******"
              @click:append-inner="handleShowPassword()"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            />
            <v-btn class="w-100" variant="elevated" color="blue" type="submit"
              >Login</v-btn
            >
          </v-form>
          <p class="mt-6 text-center text-h6">
            <router-link to="/singup">Create an account</router-link>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FirebaseApp } from '@argolight-space/firebase';

const email = ref<string>('');
const password = ref<string>('');
const formError = ref<string>('');
const showPassword = ref<boolean>(false);

const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const router = useRouter();

const login = () => {
  signInWithEmailAndPassword(getAuth(FirebaseApp), email.value, password.value)
    .then(() => {
      router.push('/rocket-list');
    })
    .catch(() => {
      formError.value = 'Invalid email or password';
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
  background: url('https://www.spacex.com/static/images/falcon-9/F9_1.jpg')
    no-repeat;
  background-size: cover;
}
h1 {
  font-size: 3.4rem;
}
#form-error {
  color: red;
  font-size: 1.6rem;
}
#signup-card {
  background-color: rgba(0, 0, 0, 0.488);
}
</style>
