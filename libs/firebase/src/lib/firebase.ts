import { initializeApp, FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env['FIREBASE_API_KEY'],
  authDomain: 'argolightspace.firebaseapp.com',
  projectId: 'argolightspace',
  storageBucket: 'argolightspace.appspot.com',
  messagingSenderId: '72872235755',
  appId: '1:72872235755:web:3afaacf80098fe3212a4ae',
};

export const FirebaseApp = initializeApp(firebaseConfig);
