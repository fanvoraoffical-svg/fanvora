import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("signupForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

if (togglePassword) {
    togglePassword.addEventListener("click", () => {

        password.type =
            password.type === "password" ? "text" : "password";

        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");

    });
}

if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener("click", () => {

        confirmPassword.type =
            confirmPassword.type === "password" ? "text" : "password";

        toggleConfirmPassword.classList.toggle("fa-eye");
        toggleConfirmPassword.classList.toggle("fa-eye-slash");

    });
}

// ===============================
// SIGNUP
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.querySelector('input[type="text"]').value.trim();

    const email = document.querySelector('input[type="email"]').value.trim();

    const pass = password.value;

    const confirm = confirmPassword.value;

    if (!fullName) {
        alert("Please enter your full name.");
        return;
    }

    if (pass.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {

            uid: user.uid,

            name: fullName,

            email: user.email,

            level: 1,

            xp: 0,

            badges: []
            ,country: "",

favoriteSport: "Football",

favoriteTeam: "",

bio: "",

photoURL: "assets/avatars/fan-avatar.png",

            favoriteSport: "",

            passportId:
                "FAN-" +
                Math.floor(100000 + Math.random() * 900000),

            joinedAt: serverTimestamp()

        });

        alert("🎉 Account Created Successfully!");

        window.location.href = "choose-country.html";

    }

    catch (error) {

        switch (error.code) {

            case "auth/email-already-in-use":
                alert("Email already exists.");
                break;

            case "auth/invalid-email":
                alert("Invalid email address.");
                break;

            case "auth/weak-password":
                alert("Weak password.");
                break;

            default:
                alert(error.message);

        }

    }

});