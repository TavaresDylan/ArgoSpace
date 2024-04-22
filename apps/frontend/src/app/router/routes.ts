import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import RocketList from '../pages/RocketList.vue';
import Signup from '../pages/Signup.vue';
import NotFound from '../pages/NotFound.vue';

const Router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter: (_to, _from, next) => {
        if (localStorage.getItem('token')) {
          next('/rocket-list');
        } else {
          next();
        }
      },
    },
    {
      path: '/singup',
      component: Signup,
      beforeEnter: (_to, _from, next) => {
        if (localStorage.getItem('token')) {
          next('/rocket-list');
        } else {
          next();
        }
      },
    },
    {
      path: '/rocket-list',
      component: RocketList,
      beforeEnter: (_to, _from, next) => {
        if (localStorage.getItem('token')) {
          next();
        } else {
          next('/login');
        }
      },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export default Router;
