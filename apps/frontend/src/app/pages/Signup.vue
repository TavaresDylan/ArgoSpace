<template>
  <div class="d-flex flex-grow-1" id="login-container">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="10" sm="6" md="5" lg="3">
        <v-card id="signup-card" class="pa-8">
          <h1 class="text-center mb-4">Signup</h1>
          <p class="text-center my-4" id="form-error" v-show="formError">
            {{ formError }}
          </p>
          <v-form
            class="d-flex ga-4 flex-column"
            fast-fail
            ref="form"
            @submit.prevent="signup"
          >
            <v-text-field
              full-width
              required
              label="Email"
              name="email"
              variant="solo"
              type="email"
              :rules="[rules.email, rules.required]"
              v-model="email"
              placeholder="xxxxxxx@xxx.xx"
            >
              <template v-slot:message="{ message }">
                <p class="text-red text-body-1">{{ message }}</p>
              </template>
            </v-text-field>
            <v-text-field
              full-width
              required
              label="Password"
              name="password"
              variant="solo"
              :type="showPassword ? 'text' : 'password'"
              :rules="[
                rules.passwordLength,
                rules.required,
                rules.passwordStrength,
              ]"
              v-model="password"
              placeholder="*******"
              @click:append-inner="handleShowPassword()"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            >
              <template v-slot:message="{ message }">
                <p class="text-red text-body-1">{{ message }}</p>
              </template>
            </v-text-field>
            <v-text-field
              full-width
              required
              label="Confirm Password"
              name="confirm"
              variant="solo"
              :rules="[rules.passwordMatch, rules.required]"
              :type="showPassword ? 'text' : 'password'"
              v-model="confirm"
              placeholder="*******"
              @click:append-inner="handleShowPassword()"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            >
              <template v-slot:message="{ message }">
                <p class="text-red text-body-1">{{ message }}</p>
              </template>
            </v-text-field>
            <v-btn class="w-100" color="blue" variant="elevated" type="submit"
              >Signup</v-btn
            >
          </v-form>

          <p class="mt-6 text-center text-h6">
            <router-link to="/login">Already have an account ?</router-link>
          </p>
        </v-card>
      </v-col>
    </v-row>
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
const form = ref();
const showPassword = ref<boolean>(false);
const formError = ref<string>('');
const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(value) || 'Invalid email.';
  },
  passwordLength: (value: string) => {
    return value.length >= 6 || 'Password must be at least 6 characters.';
  },
  passwordStrength: (value: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return (
      pattern.test(value) ||
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
    );
  },
  passwordMatch: (value: string) => {
    return value === password.value || 'Passwords must match.';
  },
};

const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const router = useRouter();

const signup = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    createUserWithEmailAndPassword(
      getAuth(FirebaseApp),
      email.value,
      password.value
    )
      .then(() => {
        router.push('/rocket-list');
      })
      .catch((error: Error) => {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          formError.value = 'Email already in use';
        } else if (
          error.message ===
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          formError.value = 'Password is too weak';
        } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
          formError.value = 'Invalid email';
        } else if (
          error.message === 'Firebase: Error (auth/missing-password).'
        ) {
          formError.value = 'Password is required';
        }
      });
  }
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
