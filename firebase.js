import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4vkcYLzTqkGZuAA7ptkmltR2T8adTrW8",
  authDomain: "samtupe-7fb06.firebaseapp.com",
  projectId: "samtupe-7fb06",
  storageBucket: "samtupe-7fb06.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
