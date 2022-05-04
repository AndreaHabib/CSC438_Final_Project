import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Cheng database
// const firebaseConfig = {
//   apiKey: "AIzaSyBlvfpqekQfced27CTFDIapAya1hE6yUhY",
//   authDomain: "mymovie-348723.firebaseapp.com",
//   projectId: "mymovie-348723",
//   storageBucket: "mymovie-348723.appspot.com",
//   messagingSenderId: "1039244055888",
//   appId: "1:1039244055888:web:197a7e939fc168efe80855",
//   measurementId: "G-FT3N9JJZQ9",
// };

// Leeran database
const firebaseConfig = {
  apiKey: "AIzaSyDc4xgDSlBHf5pCCud310bnY5Jv5Fh0yZs",
  authDomain: "mymovie-8d5f9.firebaseapp.com",
  projectId: "mymovie-8d5f9",
  storageBucket: "mymovie-8d5f9.appspot.com",
  messagingSenderId: "1503165230",
  appId: "1:1503165230:web:9c9d3e937accb8c21b58bf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appAuth = getAuth(app);

const getUsersDoc = (uid) => {
  const usersCol = collection(db, "users");
  const userDoc = doc(usersCol, uid);
  return userDoc;
};

export async function getUserInfo(uid) {
  const userDoc = getUsersDoc(uid);
  const user = await getDoc(userDoc);
  return user.data();
}

const emptyUser = {
  favoriteMovies: [],
  favoriteTvShows: [],
};

export const resetUserInfo = (uid) => {
  setDoc(getUsersDoc(uid), emptyUser);
  return emptyUser;
};

export const updateUserInfo = async (uid, data) => {
  const userDoc = getUsersDoc(uid);
  await setDoc(userDoc, data);
};

export const deleteFavoriteTvShow = async (uid, tvShowId) => {
  const userDoc = getUsersDoc(uid);
  const user = await getDoc(userDoc);
  const data = {
    favoriteTvShows: user
      .data()
      .favoriteTvShows.filter((tvShow) => tvShow !== tvShowId),
    favoriteMovies: user.data().favoriteMovies,
  };
  await setDoc(userDoc, data);
};

export const deleteFavoriteMovie = (uid, movieId) => {
  const userDoc = getUsersDoc(uid);
  return setDoc(userDoc, {
    favoriteTvShows: userDoc.data().favoriteTvShows,
    favoriteMovies: userDoc
      .data()
      .favoriteMovies.filter((movie) => movie !== movieId),
  });
};

export async function login(email, password) {
  try {
    return await appAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => error.message);
  } catch (error) {
    console.log(error.message);
  }
}

export async function register(email, password) {
  try {
    return await appAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        await setDoc(doc(db, "users", user.uid), emptyUser);
      })
      .catch((error) => error.message);
  } catch (error) {
    console.log(error.message);
  }
}

export async function loginInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(appAuth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.href = "/home";
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      const email = error.email;
      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
    });
}

export async function signOut() {
  await appAuth.signOut();
}
