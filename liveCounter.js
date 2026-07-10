import { db } from "./firebase.js";

import {

collection,
onSnapshot

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =====================================
// ELEMENTS
// =====================================

const totalFans =
document.getElementById("liveTotalFans");

const onlineFans =
document.getElementById("liveOnlineFans");

const todayFans =
document.getElementById("todayFans");

const topNation =
document.getElementById("topNation");

// =====================================
// COUNTERS
// =====================================

let nationCounter={};

let totalUsers=0;

// =====================================
// FIRESTORE
// =====================================

onSnapshot(

collection(db,"users"),

(snapshot)=>{

totalUsers=snapshot.size;

nationCounter={};

let today=0;

const now=new Date();

snapshot.forEach(doc=>{

const data=doc.data();

const nation=
data.supportCountry || "Unknown";

nationCounter[nation]=
(nationCounter[nation]||0)+1;

// Today's signup

if(data.joinedAt){

try{

const date=
data.joinedAt.toDate();

if(

date.toDateString()===

now.toDateString()

){

today++;

}

}catch(e){}

}

});

// Total Fans

if(totalFans){

totalFans.textContent=

totalUsers.toLocaleString();

}

// Today's Fans

if(todayFans){

todayFans.textContent=today;

}

// Top Nation

let bestNation="India";

let bestCount=0;

Object.keys(nationCounter)

.forEach(country=>{

if(

nationCounter[country]>

bestCount

){

bestNation=country;

bestCount=nationCounter[country];

}

});

if(topNation){

topNation.textContent=

"🌍 Fan "+bestNation;

}

});
// =====================================
// ONLINE USERS (Launch Version)
// =====================================

function updateOnlineUsers(){

    if(!onlineFans) return;

    let online = 0;

    if(totalUsers <= 10){

        online = totalUsers;

    }

    else if(totalUsers <= 100){

        online = Math.floor(totalUsers * 0.35);

    }

    else{

        online = Math.floor(totalUsers * 0.18);

    }

    if(online < 1 && totalUsers > 0){

        online = 1;

    }

    animateCounter(

        onlineFans,

        parseInt(onlineFans.textContent) || 0,

        online

    );

}

setInterval(updateOnlineUsers,3000);

// =====================================
// COUNTER ANIMATION
// =====================================

function animateCounter(element,start,end){

    if(!element) return;

    let current = start;

    const step = start < end ? 1 : -1;

    const timer = setInterval(()=>{

        current += step;

        element.textContent = current;

        if(current === end){

            clearInterval(timer);

        }

    },20);

}

// =====================================
// LIVE JOIN POPUP
// =====================================

const popup = document.createElement("div");

popup.className = "liveJoinPopup";

document.body.appendChild(popup);

const popupMessages=[

"🎉 A new fan joined Fan India 🇮🇳",

"🎉 A new fan joined Fan Brazil 🇧🇷",

"🎉 A new fan joined Fan Argentina 🇦🇷",

"🏅 Founding Fan joined",

"🌍 Welcome New Fan",

"⭐ New Passport Created"

];

function showPopup(){

    popup.innerHTML = popupMessages[
        Math.floor(
            Math.random()*popupMessages.length
        )
    ];

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

    },3500);

}

setInterval(showPopup,25000);

// =====================================
// EXPORT FUNCTIONS
// =====================================

export function getTotalFans(){

    return totalUsers;

}

export function getNationStats(){

    return nationCounter;

}

// =====================================
// READY
// =====================================

console.log("👥 Live Counter Ready");