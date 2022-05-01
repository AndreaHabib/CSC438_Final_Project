import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlvfpqekQfced27CTFDIapAya1hE6yUhY",
    authDomain: "mymovie-348723.firebaseapp.com",
    projectId: "mymovie-348723",
    storageBucket: "mymovie-348723.appspot.com",
    messagingSenderId: "1039244055888",
    appId: "1:1039244055888:web:197a7e939fc168efe80855",
    measurementId: "G-FT3N9JJZQ9"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);