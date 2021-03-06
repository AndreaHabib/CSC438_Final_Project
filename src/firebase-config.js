import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
  apiKey: `${process.env.REACT_APP_FB_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

const getUsersDoc = () => {
  const usersCol = collection(db, "users");
  const userDoc = doc(usersCol, auth.currentUser.uid);
  return userDoc;
};

export async function getUserInfo() {
  const userDoc = getUsersDoc(auth.currentUser.uid);
  const user = await getDoc(userDoc);
  return user.data();
}

const emptyUser = {
  favoriteMovies: [],
  favoriteTvShows: [],
};

export const resetUserInfo = () => {
  setDoc(getUsersDoc(auth.currentUser.uid), emptyUser);
  return emptyUser;
};

export const addFavoriteTvShow = async (tvShowId) => {
  const userDoc = getUsersDoc(auth.currentUser.uid);
  const user = await getDoc(userDoc);
  const { favoriteTvShows, favoriteMovies } = user.data();
  const newFavoriteTvShows = [...favoriteTvShows, tvShowId];
  await setDoc(userDoc, {
    favoriteTvShows: newFavoriteTvShows,
    favoriteMovies,
  });
};

export const addFavoriteMovie = async (movieId) => {
  const userDoc = getUsersDoc(auth.currentUser.uid);
  const user = await getDoc(userDoc);
  const { favoriteMovies, favoriteTvShows } = user.data();
  const newFavoriteMovies = [...favoriteMovies, movieId];
  await setDoc(userDoc, {
    favoriteMovies: newFavoriteMovies,
    favoriteTvShows,
  });
};

export const deleteFavoriteTvShow = async (tvShowId) => {
  const userDoc = getUsersDoc(auth.currentUser.uid);
  const user = await getDoc(userDoc);
  const data = {
    favoriteTvShows: user
      .data()
      .favoriteTvShows.filter((tvShow) => tvShow !== tvShowId),
    favoriteMovies: user.data().favoriteMovies,
  };
  await setDoc(userDoc, data);
};

export const deleteFavoriteMovie = (movieId) => {
  const userDoc = getUsersDoc(auth.currentUser.uid);
  return setDoc(userDoc, {
    favoriteTvShows: userDoc.data().favoriteTvShows,
    favoriteMovies: userDoc
      .data()
      .favoriteMovies.filter((movie) => movie !== movieId),
  });
};

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((user) => user)
    .catch((error) => error);
}

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      setDoc(doc(db, "users", user.user.uid), emptyUser);
      return user;
    })
    .catch((error) => error.message);
}

export async function loginInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setDoc(doc(db, "users", result.user.uid), emptyUser);
      window.location.href = "/home";
    })
    .catch((error) => error.message);
}

export async function signOut() {
  await auth.signOut();
}
