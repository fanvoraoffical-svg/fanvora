import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGDBlbed0EaVEMPorKI0HrhKexMBwXtA0",
  authDomain: "fanvora-2d82a.firebaseapp.com",
  projectId: "fanvora-2d82a",
  storageBucket: "fanvora-2d82a.firebasestorage.app",
  messagingSenderId: "588635192971",
  appId: "1:588635192971:web:7a9a40fbc79fe761f69e8e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);