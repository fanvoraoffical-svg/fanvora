import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

collection,
query,
orderBy,
limit,
onSnapshot

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";

import {
collection,
query,
orderBy,
limit,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =========================================
// ELEMENTS
// =========================================

const leaderboardList =
document.getElementById("leaderboardList");

const totalFans =
document.getElementById("totalFans");

const totalXP =
document.getElementById("totalXP");

const onlineUsers =
document.getElementById("onlineUsers");

const myRank =
document.getElementById("myRank");

const fansTab =
document.getElementById("fansTab");

const nationTab =
document.getElementById("nationTab");

const fansSection =
document.getElementById("fansSection");

const nationSection =
document.getElementById("nationSection");

// =========================================
// CHECK LOGIN
// =========================================

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

return;

}

loadLeaderboard(user.uid);

});

// =========================================
// TAB SWITCH
// =========================================

fansTab.onclick=()=>{

fansTab.classList.add("active");

nationTab.classList.remove("active");

fansSection.classList.remove("hidden");

nationSection.classList.add("hidden");

}

nationTab.onclick=()=>{

nationTab.classList.add("active");

fansTab.classList.remove("active");

nationSection.classList.remove("hidden");

fansSection.classList.add("hidden");

}
// =========================================
// LOAD LEADERBOARD
// =========================================

function loadLeaderboard(currentUID){

    const q = query(

        collection(db,"users"),

        orderBy("xp","desc"),

        limit(100)

    );

    onSnapshot(q,(snapshot)=>{

        leaderboardList.innerHTML="";

        let rank=1;

        let totalXPCount=0;

        let currentUserRank="-";

        totalFans.textContent=snapshot.size;

        snapshot.forEach((docSnap)=>{

            const data=docSnap.data();

            totalXPCount += data.xp || 0;

            if(docSnap.id===currentUID){

                currentUserRank=rank;

            }

            let medal=rank;

            let medalClass="";

            if(rank===1){

                medal="🥇";

                medalClass="gold";

            }

            else if(rank===2){

                medal="🥈";

                medalClass="silver";

            }

            else if(rank===3){

                medal="🥉";

                medalClass="bronze";

            }

            const initials=(data.name || "F")
            .charAt(0)
            .toUpperCase();

            leaderboardList.innerHTML += `

            <div class="user-row">

                <div class="rank ${medalClass}">
                    ${medal}
                </div>

                <div class="user-info">

                    <div class="user-avatar">
                        ${initials}
                    </div>

                    <div>

                        <h3>${data.name || "Fan"}</h3>

                        <small>${data.email || ""}</small>

                    </div>

                </div>

                <div>

                    🌍 Fan ${data.supportCountry || "-"}

                </div>

                <div>

                    ⭐ Lv.${data.level || 1}

                </div>

                <div>

                    ${data.xp || 0} XP

                </div>

            </div>

            `;

            rank++;

        });

        totalXP.textContent=
        totalXPCount.toLocaleString();

        myRank.textContent=
        "#" + currentUserRank;

    });

}
// =========================================
// TOP FAN NATIONS
// =========================================

const nationIds = {

    India: "indiaFans",

    Brazil: "brazilFans",

    Argentina: "argentinaFans",

    France: "franceFans",

    Germany: "germanyFans",

    Portugal: "portugalFans",

    Spain: "spainFans",

    England: "englandFans",

    Netherlands: "netherlandsFans",

    Japan: "japanFans"

};

const nationCount = {

    India:0,

    Brazil:0,

    Argentina:0,

    France:0,

    Germany:0,

    Portugal:0,

    Spain:0,

    England:0,

    Netherlands:0,

    Japan:0

};

// =========================================
// LIVE NATION COUNTER
// =========================================

onSnapshot(collection(db,"users"),(snapshot)=>{

    Object.keys(nationCount).forEach(key=>{

        nationCount[key]=0;

    });

    snapshot.forEach((doc)=>{

        const data=doc.data();

        if(data.supportCountry &&
        nationCount.hasOwnProperty(data.supportCountry)){

            nationCount[data.supportCountry]++;

        }

    });

    Object.keys(nationIds).forEach(country=>{

        const el=document.getElementById(nationIds[country]);

        if(el){

            el.textContent=
            nationCount[country]+" Fans";

        }

    });

});

// =========================================
// ONLINE USERS
// (Launch Version)
// =========================================

// Temporary formula
// Later replace with real online presence

setInterval(()=>{

    const fans=parseInt(totalFans.textContent)||0;

    if(fans===0){

        onlineUsers.textContent="0";

        return;

    }

    const online=Math.max(

        1,

        Math.floor(fans*0.15)

    );

    onlineUsers.textContent=online;

},1000);

// =========================================
// LIVE ACTIVITY
// =========================================

const activityFeed=

document.getElementById("activityFeed");

const activities=[

"🟢 New Fan joined Fan India 🇮🇳",

"🟢 New Fan joined Fan Brazil 🇧🇷",

"🟢 New Fan joined Fan Argentina 🇦🇷",

"🏅 Founding Fan Badge Unlocked",

"⭐ A Fan reached Level 2",

"🔥 New Passport Created",

"🌍 A New Nation was Selected",

"🏆 XP Earned"

];

function updateActivity(){

    if(!activityFeed) return;

    activityFeed.innerHTML="";

    const shuffled=

    [...activities]

    .sort(()=>Math.random()-0.5)

    .slice(0,5);

    shuffled.forEach(item=>{

        activityFeed.innerHTML+=`

        <div class="activity-item">

            ${item}

        </div>

        `;

    });

}

updateActivity();

setInterval(updateActivity,10000);

// =========================================
// READY
// =========================================

console.log("🏆 Fanvora Leaderboard Ready");
// ===============================
// FILTER BUTTONS
// ===============================

document.querySelectorAll(".filter-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{
    
    document.querySelectorAll(".filter-btn")
    .forEach(b=>b.classList.remove("active"));
    
    btn.classList.add("active");
    
    });
    
    });
    // ===============================
// REAL LEADERBOARD
// ===============================

async function loadLeaderboard(){

    const rankingTable =
    document.getElementById("rankingTable");

    if(!rankingTable) return;

    rankingTable.innerHTML="";

    try{

        const q = query(
            collection(db,"users"),
            orderBy("xp","desc"),
            limit(100)
        );

        const snap = await getDocs(q);

        let rank = 1;

        snap.forEach(doc=>{

            const user = doc.data();

            rankingTable.innerHTML += `

            <div class="ranking-row">

                <span>#${rank}</span>

                <span>${user.name || "Fan"}</span>

                <span>🌍 ${user.country || "-"}</span>

                <span>${user.level || 1}</span>

                <span>${user.xp || 0} XP</span>

            </div>

            `;

            rank++;

        });

    }

    catch(error){

        console.error(error);

    }

}

loadLeaderboard();
// ===============================
// SEARCH
// ===============================

const searchInput =
document.getElementById("searchPlayer");

searchInput?.addEventListener("keyup",()=>{

const value =
searchInput.value.toLowerCase();

document
.querySelectorAll(".ranking-row")
.forEach(row=>{

row.style.display =
row.innerText
.toLowerCase()
.includes(value)
? "grid"
: "none";

});

});