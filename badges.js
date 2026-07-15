// ==========================================
// FANVORA BADGES V1.1
// badges.js
// ==========================================

console.log("🏅 Fanvora Badges Loaded");

// ==========================================
// SCROLL REVEAL
// ==========================================

const revealItems = document.querySelectorAll(
".summary-card, .badge-card, .progress-card"
);

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealItems.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if(top < windowHeight - 100){

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ==========================================
// PROGRESS BAR ANIMATION
// ==========================================

const progressFill = document.querySelector(".progress-fill");

if(progressFill){

    let width = 0;

    const target = 15;

    const progress = setInterval(()=>{

        width++;

        progressFill.style.width = width + "%";

        if(width >= target){

            clearInterval(progress);

        }

    },20);

}


// ==========================================
// BADGE CLICK
// ==========================================

const badgeCards = document.querySelectorAll(".badge-card");

badgeCards.forEach(card=>{

    card.addEventListener("click",()=>{

        if(card.classList.contains("locked")){

            alert("🔒 This badge is locked.\n\nComplete the required mission to unlock it.");

        }

        else{

            alert("🏆 Congratulations!\n\nYou have already unlocked this badge.");

        }

    });

});


// ==========================================
// HOVER EFFECT
// ==========================================

badgeCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0) scale(1)";

    });

});


// ==========================================
// FUTURE READY
// ==========================================

// Firebase Badge Sync

// XP System

// Badge Unlock Animation

// Share Badge

// QR Badge

// NFT Badge

// Blockchain Integration

// Community Badge

// University Badge

// Live Badge Updates
// ==========================================
// XP COUNTER ANIMATION
// ==========================================

const xpCounter = document.querySelector(".summary-card h2");

if (xpCounter && xpCounter.textContent.includes("XP")) {

    let currentXP = 0;
    const targetXP = 150;

    xpCounter.textContent = "0 XP";

    const xpInterval = setInterval(() => {

        currentXP += 5;

        xpCounter.textContent = currentXP + " XP";

        if (currentXP >= targetXP) {

            clearInterval(xpInterval);

        }

    }, 30);

}

// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2500);

}

// ==========================================
// SHARE BADGE
// ==========================================

function shareBadge(name){

    if(navigator.share){

        navigator.share({

            title:"Fanvora Badge",

            text:`🏅 I unlocked the ${name} badge on Fanvora!`,

            url:"https://fanvora.in"

        });

    }

    else{

        showToast("📤 Share feature not supported on this device.");

    }

}

// ==========================================
// BADGE DETAILS
// ==========================================

badgeCards.forEach(card=>{

    card.addEventListener("dblclick",()=>{

        const badgeName = card.querySelector("h3").textContent;

        showToast("🏅 " + badgeName);

    });

});

// ==========================================
// DAILY REWARD
// ==========================================

const today = new Date().getDate();

const rewardKey = "dailyReward";

if(localStorage.getItem(rewardKey) != today){

    console.log("🎁 Daily reward available");

}else{

    console.log("✅ Daily reward already claimed");

}

// ==========================================
// FIREBASE PLACEHOLDERS
// ==========================================

async function loadUserBadges(){

    console.log("Loading badges from Firebase...");

}

async function saveUnlockedBadge(){

    console.log("Saving unlocked badge...");

}

async function updateXP(){

    console.log("Updating XP...");

}

// ==========================================
// PAGE READY
// ==========================================

window.addEventListener("load",()=>{

    showToast("🏅 Welcome to Fanvora Badges");

});

console.log("🚀 Fanvora Badges V1.1 Ready");
