import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  updateDoc,
  serverTimestamp,
  increment,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ========================================
// Elements
// ========================================

const nationCards = document.querySelectorAll(".nation");

const selectedNation = document.getElementById("selectedNation");

const continueBtn = document.getElementById("continueBtn");

const popup = document.getElementById("welcomePopup");

const popupNation = document.getElementById("popupNation");

const startJourney = document.getElementById("startJourney");

// ========================================
// Variables
// ========================================

let currentUser = null;

let nation = "";

let countryCode = "";

// ========================================
// Authentication
// ========================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    currentUser = user;

});

// ========================================
// Nation Selection
// ========================================

nationCards.forEach(card => {

    card.addEventListener("click", () => {

        nationCards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        nation = card.dataset.country;

        countryCode = card.dataset.code;

        selectedNation.innerHTML = `
            ${card.querySelector(".emoji").textContent}
            Fan ${nation}
        `;

        continueBtn.disabled = false;

    });

});
// ========================================
// Continue Button
// ========================================

continueBtn.addEventListener("click", async () => {

    if (!currentUser || nation === "") return;

    try {

        const userRef = doc(db, "users", currentUser.uid);

        await updateDoc(userRef, {

            supportCountry: nation,

            countryCode: countryCode,

            supportSince: serverTimestamp(),

            xp: increment(100),

            level: 1,

            badges: arrayUnion(
                "Founding Fan",
                `Fan ${nation}`
            )

        });

        popupNation.textContent = `Fan ${nation}`;

        popup.classList.add("show");

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});

// ========================================
// Start Journey
// ========================================

startJourney.addEventListener("click", () => {

    window.location.href = "dashboard.html";

});

// ========================================
// Console
// ========================================

console.log("🌍 Choose Nation Ready");