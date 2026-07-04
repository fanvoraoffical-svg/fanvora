import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ========================================
// Elements
// ========================================

const welcomeText = document.getElementById("welcomeText");

const userName = document.getElementById("userName");

const userEmail = document.getElementById("userEmail");

const passportId = document.getElementById("passportId");

const country = document.getElementById("country");

const sport = document.getElementById("sport");

const team = document.getElementById("team");

const level = document.getElementById("level");

const xp = document.getElementById("xp");

const xpCard = document.getElementById("xpCard");

const levelCard = document.getElementById("levelCard");

const bio = document.getElementById("bio");

const claimBtn = document.getElementById("claimBtn");

const logoutBtn = document.getElementById("logoutBtn");

// ========================================
// Authentication
// ========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    loadUser(user.uid);

});

// ========================================
// Load User
// ========================================

async function loadUser(uid){

    try{

        const ref = doc(db,"users",uid);

        const snap = await getDoc(ref);

        if(!snap.exists()) return;

        const data = snap.data();

        welcomeText.innerHTML =
        `Welcome Back, ${data.name} 👋`;

        userName.textContent =
        data.name || "";

        userEmail.textContent =
        data.email || "";

        passportId.textContent =
        data.passportId || "";

        country.textContent =
        data.country || "Not Added";

        sport.textContent =
        data.favoriteSport || "Football";

        team.textContent =
        data.favoriteTeam || "Not Added";

        level.textContent =
        data.level || 1;

        levelCard.textContent =
        data.level || 1;

        xp.textContent =
        `${data.xp || 0} XP`;

        xpCard.textContent =
        data.xp || 0;

        bio.textContent =
        data.bio || "No bio added yet.";

    }

    catch(error){

        console.log(error);

    }

}

// ========================================
// Daily Challenge
// ========================================

if(claimBtn){

claimBtn.addEventListener("click",async()=>{

const user=auth.currentUser;

if(!user) return;

try{

await updateDoc(

doc(db,"users",user.uid),

{

xp:increment(50)

}

);

alert("🎉 +50 XP Added!");

loadUser(user.uid);

}

catch(error){

alert(error.message);

}

});

}

// ========================================
// Notification
// ========================================

const notify=document.querySelector(".notify");

if(notify){

notify.addEventListener("click",()=>{

alert("🔔 No new notifications.");

});

}

// ========================================
// Logout
// ========================================

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

const ok=confirm("Logout from Fanvora?");

if(!ok) return;

try{

await signOut(auth);

window.location.href="login.html";

}

catch(error){

alert(error.message);

}

});

}

// ========================================
// Console
// ========================================

console.log("🔥 Fanvora Dashboard V2 Ready");