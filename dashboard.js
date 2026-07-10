import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { dailyLoginReward, getLevelProgress } from "./gameEngine.js";

// ===============================
// Elements
// ===============================

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const userNation = document.getElementById("supportNation");

const xpText = document.getElementById("userXP");
const levelText = document.getElementById("userLevel");

const progressBar = document.getElementById("xpProgress");

const badgeContainer = document.getElementById("badgeContainer");

const memberSince = document.getElementById("memberSince");

// ===============================
// AUTH
// ===============================

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href="login.html";

        return;

    }

    await loadDashboard(user.uid);

});

// ===============================
// LOAD DASHBOARD
// ===============================

async function loadDashboard(uid){

    try{

        const snap = await getDoc(doc(db,"users",uid));

        if(!snap.exists()) return;

        const data = snap.data();

        userName.textContent =
        data.name || "Fan";

        userEmail.textContent =
        data.email || "";

        userNation.textContent =
        "🌍 Fan " + (data.supportCountry || "India");

        xpText.textContent =
        (data.xp || 0) + " XP";

        levelText.textContent =
        "Level " + (data.level || 1);

        // Progress Bar

        const progress =
        getLevelProgress(data.xp || 0);

        progressBar.style.width =
        progress + "%";

        // Member Since

        if(data.joinedAt){

            const joined =
            data.joinedAt.toDate();

            memberSince.textContent =
            joined.toLocaleDateString();

        }

        // Daily Reward

        const reward =
        await dailyLoginReward();

        if(reward){

            alert("🎉 Daily Login Reward +20 XP");

        }

        loadBadges(data.badges || []);

    }

    catch(error){

        console.log(error);

    }

}
// ===============================
// LOAD BADGES
// ===============================

function loadBadges(badges){

    badgeContainer.innerHTML = "";

    if(badges.length===0){

        badgeContainer.innerHTML = `
        <div class="badge">
            🏅 No Badge Yet
        </div>
        `;

        return;

    }

    badges.forEach(badge=>{

        badgeContainer.innerHTML += `

        <div class="badge">

            🏅 ${badge}

        </div>

        `;

    });

}

// ===============================
// LIVE CLOCK
// ===============================

const liveClock =
document.getElementById("liveClock");

function updateClock(){

    if(!liveClock) return;

    const now = new Date();

    liveClock.textContent =
    now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// ===============================
// QUICK ACTIONS
// ===============================

const passportBtn =
document.getElementById("passportBtn");

const leaderboardBtn =
document.getElementById("leaderboardBtn");

const settingsBtn =
document.getElementById("settingsBtn");

if(passportBtn){

passportBtn.onclick=()=>{

window.location.href="passport.html";

};

}

if(leaderboardBtn){

leaderboardBtn.onclick=()=>{

window.location.href="leaderboard.html";

};

}

if(settingsBtn){

settingsBtn.onclick=()=>{

window.location.href="settings.html";

};

}

// ===============================
// LOGOUT
// ===============================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = async()=>{

await auth.signOut();

window.location.href="login.html";

};

}

// ===============================
// AUTO REFRESH
// ===============================

setInterval(()=>{

if(auth.currentUser){

loadDashboard(auth.currentUser.uid);

}

},30000);

// ===============================
// DASHBOARD READY
// ===============================

console.log("🚀 Fanvora Dashboard V3 Ready");