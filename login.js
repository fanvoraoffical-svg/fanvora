import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase.js";

// ===============================
// ELEMENTS
// ===============================

const form = document.getElementById("loginForm");

const emailInput = document.querySelector('input[type="email"]');

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const forgotPassword = document.getElementById("forgotPassword");

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            passwordInput.type = "password";

            togglePassword.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

}

// ===============================
// FORGOT PASSWORD
// ===============================

if (forgotPassword) {

    forgotPassword.addEventListener("click", async (e) => {

        e.preventDefault();

        const email = prompt("Enter your registered email:");

        if (!email) return;

        try {

            await sendPasswordResetEmail(auth, email);

            alert("✅ Password reset email sent successfully.");

        } catch (error) {

            alert(error.message);

        }

    });

}

// ===============================
// LOGIN
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    if (!email || !password) {

        alert("Please fill all fields.");

        return;

    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("✅ Login Successful!");

        window.location.href = "dashboard.html";

    }

    catch (error) {

        switch (error.code) {

            case "auth/user-not-found":
                alert("User not found.");
                break;

            case "auth/wrong-password":
                alert("Incorrect password.");
                break;

            case "auth/invalid-credential":
                alert("Invalid email or password.");
                break;

            case "auth/invalid-email":
                alert("Invalid email.");
                break;

            default:
                alert(error.message);

        }

    }

});

console.log("🔥 Login JS Ready");
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {

    googleBtn.addEventListener("click", async () => {

        try {

            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            const ref = doc(db, "users", user.uid);

            const snap = await getDoc(ref);

            if (!snap.exists()) {

                await setDoc(ref, {

                    name: user.displayName,

                    email: user.email,

                    passportId: "FAN-" + Date.now(),

                    xp: 100,

                    level: 1,

                    country: "",

                    supportCountry: "",

                    bio: "",

                    badges: ["Founding Fan"],

                    joinedAt: serverTimestamp()

                });

                // 👇 New Google user chooses nation first
                window.location.href = "choose-country.html";

            } else {

                // 👇 Existing user goes to dashboard
                window.location.href = "dashboard.html";

            }

        }

        catch (error) {

            alert(error.message);

        }

    });

}