import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================================
// Elements
// ==========================================

const form = document.getElementById("settingsForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const countryInput = document.getElementById("country");

const sportInput = document.getElementById("sport");

const teamInput = document.getElementById("team");

const bioInput = document.getElementById("bio");

// ==========================================
// Load User Data
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            nameInput.value = data.name || "";

            emailInput.value = data.email || "";

            countryInput.value = data.country || "";

            sportInput.value = data.favoriteSport || "Football";

            teamInput.value = data.favoriteTeam || "";

            bioInput.value = data.bio || "";

        }

    }

    catch (error) {

        console.error(error);

        alert("Failed to load profile.");

    }

});

// ==========================================
// Save Changes
// ==========================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = auth.currentUser;

    if (!user) return;

    try {

        await updateDoc(doc(db, "users", user.uid), {

            name: nameInput.value.trim(),

            country: countryInput.value.trim(),

            favoriteSport: sportInput.value,

            favoriteTeam: teamInput.value.trim(),

            bio: bioInput.value.trim()

        });

        alert("✅ Profile Updated Successfully!");

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});