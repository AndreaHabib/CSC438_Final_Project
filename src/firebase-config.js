import { initializeApp } from "firebase/app";
import {
  getFirestore,
  serverTimestamp,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
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
  apiKey: "AIzaSyDc4xgDSlBHf5pCCud310bnY5Jv5Fh0yZs",
  authDomain: "mymovie-8d5f9.firebaseapp.com",
  projectId: "mymovie-8d5f9",
  storageBucket: "mymovie-8d5f9.appspot.com",
  messagingSenderId: "1503165230",
  appId: "1:1503165230:web:9c9d3e937accb8c21b58bf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export async function getUserInfo(uid) {
  const usersCol = collection(db, "users");
  const userDoc = doc(usersCol, uid);
  const user = await getDoc(userDoc);
  return user.data();
}

async function userlogin(email, password) {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

async function userregister(email, password) {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

export async function loginInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
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

async function signOut() {
  await auth.signOut();
}
