import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { dailyLoginReward, getLevelProgress } from "./gameEngine.js";
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";

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
const passportName = document.getElementById("passportName");
const passportNation = document.getElementById("passportNation");
const passportId = document.getElementById("passportId");
const passportLevel = document.getElementById("passportLevel");

const qrContainer = document.getElementById("qrcode");
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
// Passport Card

passportName.textContent =
data.name || "Fan";

passportNation.textContent =
"🌍 " + (data.supportCountry || "India");

passportLevel.textContent =
"⭐ Level " + (data.level || 1);

passportId.textContent =
"ID : " + uid.substring(0,8).toUpperCase();
// Generate QR

qrContainer.innerHTML = "";

QRCode.toCanvas(

document.createElement("canvas"),

`https://fanvora.in/passport.html?id=${uid}`,

function(error,canvas){

if(error){

console.log(error);

return;

}

qrContainer.appendChild(canvas);

}

);
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
const downloadPassport =
document.getElementById("downloadPassport");

if(downloadPassport){

downloadPassport.onclick=()=>{

alert("🚀 PDF Download Coming Soon");

};

}
// ===============================
// TODAY'S MISSION
// ===============================

const missionProgress =
document.getElementById("missionProgress");

const missionStatus =
document.getElementById("missionStatus");

let missionValue = 0;

function loadMission(){

    const target = 20;

    const timer = setInterval(()=>{

        missionValue++;

        missionProgress.style.width =
        missionValue + "%";

        missionStatus.textContent =
        missionValue + "% Complete";

        if(missionValue >= target){

            clearInterval(timer);

        }

    },40);

}

loadMission();
// ===============================
// DAILY STREAK
// ===============================

const streakCount =
document.getElementById("streakCount");

let streak = Number(localStorage.getItem("fanvoraStreak")) || 1;

if(streakCount){

streakCount.textContent = streak;

}
// ===============================
// WEEKLY CHART ANIMATION
// ===============================

const bars = document.querySelectorAll(".bar");

bars.forEach((bar,index)=>{

    const finalHeight = bar.style.height;

    bar.style.height = "0%";

    setTimeout(()=>{

        bar.style.height = finalHeight;

    },index*120);

});
// ===============================
// LIVE SPORTS CENTER
// ===============================

const sportCards = document.querySelectorAll(".sport-live-card");

sportCards.forEach(card=>{

    card.addEventListener("click",()=>{

        alert("🚀 Live Scores & Match Center Coming Soon!");

    });

});
// ===============================
// TOPBAR BUTTONS
// ===============================

const notificationBtn =
document.getElementById("notificationBtn");

const profileBtn =
document.getElementById("profileBtn");

if(notificationBtn){

notificationBtn.onclick=()=>{

alert("🔔 Notification Center is coming soon.");

};

}

if(profileBtn){

profileBtn.onclick=()=>{

window.location.href="settings.html";

};

}
// ===============================
// TODAY'S CHALLENGES
// ===============================

const checks =
document.querySelectorAll(".challenge-item input");

const fill =
document.getElementById("challengeFill");

const text =
document.getElementById("challengeText");

function updateChallenges(){

let done = 0;

checks.forEach(c=>{

if(c.checked){

done++;

}

});

const percent =
(done/checks.length)*100;

fill.style.width =
percent+"%";

text.textContent =
done+" / "+checks.length+" Completed";

}

checks.forEach(c=>{

c.addEventListener(
"change",
updateChallenges
);

});

updateChallenges();
// ===============================
// QUICK SHORTCUTS
// ===============================

document.getElementById("openPassport")?.addEventListener("click",()=>{

    window.location.href="passport.html";
    
    });
    
    document.getElementById("openBadges")?.addEventListener("click",()=>{
    
    window.location.href="badges.html";
    
    });
    
    document.getElementById("openLeaderboard")?.addEventListener("click",()=>{
    
    window.location.href="leaderboard.html";
    
    });
    
    document.getElementById("openSettings")?.addEventListener("click",()=>{
    
    window.location.href="settings.html";
    
    });
