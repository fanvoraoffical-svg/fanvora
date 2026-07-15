import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";
// ==========================================
// Elements
// ==========================================

const passportName = document.getElementById("passportName");
const passportSport = document.getElementById("passportSport");

const passportId = document.getElementById("passportId");
const passportCountry = document.getElementById("passportCountry");
const passportTeam = document.getElementById("passportTeam");

const passportLevel = document.getElementById("passportLevel");
const passportXP = document.getElementById("passportXP");

const passportBio = document.getElementById("passportBio");

const memberSince = document.getElementById("memberSince");

const downloadBtn = document.getElementById("downloadPassport");
const shareBtn = document.getElementById("sharePassport");
const passportQR = document.getElementById("passportQR");
// ==========================================
// Check Login
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    loadPassport(user.uid);

});

// ==========================================
// Load Passport
// ==========================================

async function loadPassport(uid){

    try{

        const ref = doc(db,"users",uid);

        const snap = await getDoc(ref);

        if(!snap.exists()) return;

        const data = snap.data();

        passportName.textContent =
        data.name || "Fanvora User";

        passportSport.textContent =
        data.favoriteSport || "Football Fan";

        passportId.textContent =
        data.passportId || "-";

        passportCountry.textContent =
        data.country || "Not Added";

        passportTeam.textContent =
        data.favoriteTeam || "Not Added";

        passportLevel.textContent =
        data.level || 1;

        passportXP.textContent =
        (data.xp || 0) + " XP";

        passportBio.textContent =
        data.bio || "No bio added yet.";
// Generate QR Code

const qrData = `https://fanvora.in/passport.html?id=${uid}`;

passportQR.innerHTML = "";

const canvas = document.createElement("canvas");

QRCode.toCanvas(canvas, qrData, {
    width: 150
}, function(error) {

    if (error) {
        console.error(error);
        return;
    }

    passportQR.appendChild(canvas);

});
        if(data.joinedAt){

            const date =
            data.joinedAt.toDate();

            memberSince.textContent =
            date.toLocaleDateString();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==========================================
// Download Passport
// ==========================================

if (downloadBtn) {

    downloadBtn.addEventListener("click", async () => {

        const { jsPDF } = window.jspdf;

        const card = document.getElementById("passportCard");

        const canvas = await html2canvas(card, {
            scale: 2,
            backgroundColor: null
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 190;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);

        pdf.save("Fanvora-Passport.pdf");

    });

}

// ==========================================
// Share Passport
// ==========================================

if(shareBtn){

shareBtn.addEventListener("click",async()=>{

if(navigator.share){

try{

await navigator.share({

title:"My Fanvora Passport",

text:"Check out my Fanvora Passport!",

url:window.location.href

});

}

catch(error){

console.log(error);

}

}

else{

navigator.clipboard.writeText(

window.location.href

);

alert("🔗 Passport link copied!");

}

});

}

console.log("🎫 Fanvora Passport Ready");