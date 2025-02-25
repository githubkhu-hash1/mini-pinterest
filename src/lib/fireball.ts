import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';



export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
    apiKey: env.PUBLIC_API_KEY,
    authDomain: env.PUBLIC_AUTH_DOMAIN,
    projectId: env.PUBLIC_PROJECT_ID,
    storageBucket: env.PUBLIC_STORAGE_BUCKET,
    messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
    appId: env.PUBLIC_APP_ID,
    measurementId: env.PUBLIC_MEASUREMENT_ID
};
export const initializeFirebase = () => {
    if (!browser) {
        throw new Error("Can't use the Firebase client on the server.");
    }
    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(); 
    }
};

