import axios, { AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '@argolight-space/firebase';
import Router from '../router/routes';

export default function axiosSetUp() {
  axios.defaults.baseURL = 'http://localhost:3000';

  // Each request use this pre-config
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  // Checks each response on API call and check if refreshToken is needed
  axios.interceptors.response.use(
    function (res) {
      return res;
    },
    async function (err: AxiosError) {
      if (err.request.status === 401) {
        const token = getAuth(FirebaseApp).currentUser?.getIdToken();
        if (!token) {
          return Promise.reject(err);
        }

        try {
          const refreshedToken = await token;
          localStorage.setItem('token', refreshedToken);
          return axios(err.config ? err.config : {});
        } catch (error) {
          if (err.request.status === 401) {
            getAuth(FirebaseApp).signOut();
            Router.push('/login');
          }
          return Promise.reject(err);
        }
      }
    }
  );
}
