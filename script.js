// ===============================
// FANVORA V1
// script.js
// ===============================

console.log("🚀 Fanvora Loaded Successfully");

// -------------------------------
// Smooth Scroll
// -------------------------------

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// -------------------------------
// Navbar Shadow on Scroll
// -------------------------------

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 40){

        navbar.style.background="rgba(7,17,31,.95)";
        navbar.style.boxShadow="0 8px 25px rgba(0,0,0,.35)";

    }else{

        navbar.style.background="rgba(7,17,31,.75)";
        navbar.style.boxShadow="none";

    }

});

// -------------------------------
// Hero Button
// -------------------------------

const startBtn = document.querySelector(".primary-btn");

if(startBtn){

startBtn.addEventListener("click",()=>{

    document.querySelector("#sports").scrollIntoView({

        behavior:"smooth"

    });

});

}

// -------------------------------
// Sports Card Hover
// -------------------------------

const cards=document.querySelectorAll(".sport-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// -------------------------------
// Badge Hover
// -------------------------------

const badges=document.querySelectorAll(".badge-card");

badges.forEach(badge=>{

badge.addEventListener("mouseenter",()=>{

badge.style.transform="scale(1.05)";

});

badge.addEventListener("mouseleave",()=>{

badge.style.transform="scale(1)";

});

});

// -------------------------------
// Future Features
// -------------------------------

// Firebase Login
// Fan Passport
// Leaderboard
// Notifications
// Dark Mode
// User Dashboard

console.log("✅ Fanvora Ready");