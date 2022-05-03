import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, collection, doc, setDoc, addDoc } from 'firebase/firestore/lite'
import { getAuth } from "firebase/auth";

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

async function userlogin(email, password) {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
    if (user) {
        return user;
    }
}

async function userregister(email, password) {
    try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
    if (user) {
        return user;
    }
}

async function loginInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location.href = "/home";
        }).catch((error) => {
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






export function getFavoriteMovies(uid) {

    const collectionRef = collection(getFirestore(), this.collectionPath);
    const docRef = doc(getFirestore(), this.docPath);
    const setDocRef = setDoc(getFirestore(), this.docPath);
    const docId = await createPromise(collectionRef, docRef, setDocRef);
    

    await setDoc(doc(collectionRef, id), dataToCreate).then(() => id)
    return {
        id: docId,
        ...data,
        createTimestamp: new Date(),
        updateTimestamp: new Date()
    }
}




