<template>
  <div class="d-none d-md-flex" id="user-menu-container" v-if="loggedInUser">
    <p>
      Logged in as
      <span class="font-weight-bold">{{ loggedInUser.email }}</span>
    </p>
    <v-btn color="red" variant="flat" class="my-2" @click="logout"
      >Logout</v-btn
    >
  </div>
  <div
    id="mobile-user-menu-container"
    class="d-flex d-md-none ma-4"
    v-if="loggedInUser"
  >
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list class="px-2">
        <p>
          Logged in as
          <span class="font-weight-bold">{{ loggedInUser.email }}</span>
        </p>
        <v-list-item class="text-center" variant="flat" color="red">
          <v-list-item-title
            ><v-btn color="red" variant="flat" class="my-2" @click="logout"
              >Logout</v-btn
            ></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { FirebaseApp } from '@argolight-space/firebase';
import { getAuth, type User } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loggedInUser = ref<User | null>(null);

getAuth(FirebaseApp).onAuthStateChanged((user) => {
  loggedInUser.value = user;
});

const logout = () => {
  getAuth(FirebaseApp)
    .signOut()
    .then(() => {
      router.push('/login');
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped lang="css">
#user-menu-container {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  position: fixed;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  right: 0;
  top: 0;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-radius: 0 0 0 12px;
  padding: 12px;
}

#mobile-user-menu-container {
  z-index: 1000;
  right: 0;
  top: 0;
  position: fixed;
}
</style>
