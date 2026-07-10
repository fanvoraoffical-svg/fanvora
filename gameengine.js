import { auth, db } from "./firebase.js";

import {
    doc,
    updateDoc,
    getDoc,
    increment,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ======================================
// LEVEL SYSTEM
// ======================================

const LEVELS = [

    { level:1, xp:0 },

    { level:2, xp:200 },

    { level:3, xp:500 },

    { level:4, xp:1000 },

    { level:5, xp:2000 },

    { level:6, xp:3500 },

    { level:7, xp:5000 },

    { level:8, xp:7500 },

    { level:9, xp:10000 },

    { level:10, xp:15000 }

];

// ======================================
// GET LEVEL
// ======================================

export function calculateLevel(totalXP){

    let currentLevel = 1;

    LEVELS.forEach(item=>{

        if(totalXP >= item.xp){

            currentLevel = item.level;

        }

    });

    return currentLevel;

}

// ======================================
// GET USER
// ======================================

async function getUserData(){

    const user = auth.currentUser;

    if(!user) return null;

    const snap = await getDoc(
        doc(db,"users",user.uid)
    );

    if(!snap.exists()) return null;

    return {

        uid:user.uid,

        ...snap.data()

    };

}
// ======================================
// ADD XP
// ======================================

export async function addXP(points){

    const user = await getUserData();

    if(!user) return;

    const newXP = (user.xp || 0) + points;

    const newLevel = calculateLevel(newXP);

    await updateDoc(

        doc(db,"users",user.uid),

        {

            xp: increment(points),

            level: newLevel

        }

    );

    await checkBadges(newXP,newLevel);

}

// ======================================
// REMOVE XP
// ======================================

export async function removeXP(points){

    const user = await getUserData();

    if(!user) return;

    let newXP = (user.xp || 0) - points;

    if(newXP < 0){

        newXP = 0;

    }

    const newLevel = calculateLevel(newXP);

    await updateDoc(

        doc(db,"users",user.uid),

        {

            xp:newXP,

            level:newLevel

        }

    );

}

// ======================================
// GET CURRENT XP
// ======================================

export async function getXP(){

    const user = await getUserData();

    if(!user) return 0;

    return user.xp || 0;

}

// ======================================
// GET CURRENT LEVEL
// ======================================

export async function getLevel(){

    const user = await getUserData();

    if(!user) return 1;

    return user.level || 1;

}
// ======================================
// UNLOCK BADGE
// ======================================

export async function unlockBadge(badgeName){

    const user = auth.currentUser;

    if(!user) return;

    await updateDoc(

        doc(db,"users",user.uid),

        {

            badges: arrayUnion(badgeName)

        }

    );

}

// ======================================
// BADGE ENGINE
// ======================================

export async function checkBadges(xp, level){

    if(level >= 2){

        await unlockBadge("Rookie Fan");

    }

    if(level >= 3){

        await unlockBadge("Rising Fan");

    }

    if(level >= 5){

        await unlockBadge("Elite Fan");

    }

    if(level >= 8){

        await unlockBadge("Super Fan");

    }

    if(level >= 10){

        await unlockBadge("Legend Fan");

    }

}

// ======================================
// DAILY LOGIN BONUS
// ======================================

export async function dailyLoginReward(){

    const user = auth.currentUser;

    if(!user) return;

    const today = new Date().toDateString();

    const data = await getUserData();

    if(data.lastLoginReward === today){

        return false;

    }

    await updateDoc(

        doc(db,"users",user.uid),

        {

            xp: increment(20),

            lastLoginReward: today

        }

    );

    return true;

}

// ======================================
// COUNTRY BONUS
// ======================================

export async function rewardForNation(){

    const data = await getUserData();

    if(!data) return;

    if(data.supportCountry){

        await addXP(25);

    }

}

// ======================================
// LEVEL PROGRESS
// ======================================

export function getLevelProgress(totalXP){

    let currentLevelXP = 0;

    let nextLevelXP = 0;

    for(let i=0;i<LEVELS.length;i++){

        if(totalXP >= LEVELS[i].xp){

            currentLevelXP = LEVELS[i].xp;

            nextLevelXP =
            LEVELS[i+1]
            ? LEVELS[i+1].xp
            : LEVELS[i].xp;

        }

    }

    const progress =
    ((totalXP-currentLevelXP)/
    (nextLevelXP-currentLevelXP))*100;

    return Math.min(
        Math.max(progress,0),
        100
    );

}

// ======================================
// EXPORT
// ======================================

console.log("🎮 Fanvora Game Engine Ready");