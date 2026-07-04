import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ===============================
// ELEMENTS
// ===============================

const form = document.getElementById("loginForm");

const emailInput = document.querySelector('input[type="email"]');

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

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

        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );

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