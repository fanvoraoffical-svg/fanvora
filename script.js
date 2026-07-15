// ==========================================
// FANVORA V1.1
// SCRIPT
// ==========================================

// ==========================================
// HAMBURGER MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {

menuToggle.addEventListener("click", () => {

navLinks.classList.toggle("active");

});

}

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function (e) {

const target = document.querySelector(this.getAttribute("href"));

if (target) {

e.preventDefault();

target.scrollIntoView({

behavior: "smooth"

});

}

});

});

// ==========================================
// DOWNLOAD MODAL
// ==========================================

const downloadBtn = document.getElementById("downloadBtn");

const downloadModal = document.getElementById("downloadModal");

const closeDownload = document.getElementById("closeDownload");

if(downloadBtn){

downloadBtn.onclick = (e)=>{

e.preventDefault();

downloadModal.style.display="flex";

}

}

if(closeDownload){

closeDownload.onclick = ()=>{

downloadModal.style.display="none";

}

}

// ==========================================
// DEMO MODAL
// ==========================================

const watchDemo = document.getElementById("watchDemo");

const demoModal = document.getElementById("demoModal");

const closeDemo = document.getElementById("closeDemo");

if(watchDemo){

watchDemo.onclick=(e)=>{

e.preventDefault();

demoModal.style.display="flex";

}

}

if(closeDemo){

closeDemo.onclick=()=>{

demoModal.style.display="none";

}

}

// ==========================================
// CLOSE MODAL
// ==========================================

window.onclick=(e)=>{

if(e.target===downloadModal){

downloadModal.style.display="none";

}

if(e.target===demoModal){

demoModal.style.display="none";

}

}

// ==========================================
// NAVBAR SHADOW
// ==========================================

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>60){

navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.35)";

}else{

navbar.style.boxShadow="none";

}

});

// ==========================================
// ACTIVE MENU
// ==========================================

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
// ==========================================
// FAN COUNTER ANIMATION
// ==========================================

const fanCounter = document.getElementById("fanCounter");

if (fanCounter) {

    let current = 0;
    const target = 17;

    const counter = setInterval(() => {

        current++;

        fanCounter.textContent = current + "+";

        if (current >= target) {

            clearInterval(counter);

        }

    }, 80);

}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(
".sport-card, .badge-card, .passport-content, .passport-image, .community-content, .community-image, .about-wrapper, .founder-box"
);

const revealOnScroll = () => {

    revealElements.forEach((element) => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

document.querySelectorAll(".primary-btn").forEach(button => {

    button.addEventListener("click", function(e){

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left = e.offsetX - diameter/2 + "px";

        circle.style.top = e.offsetY - diameter/2 + "px";

        circle.classList.add("ripple");

        const ripple = this.querySelector(".ripple");

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

// ==========================================
// COMING SOON PAGES
// ==========================================

document.querySelectorAll(
'a[href="football.html"],a[href="cricket.html"],a[href="basketball.html"],a[href="f1.html"]'
).forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        alert("🚀 This section will be available soon.");

    });

});

// ==========================================
// IMAGE FADE IN
// ==========================================

const images = document.querySelectorAll("img");

images.forEach(img=>{

    img.onload=()=>{

        img.style.opacity="1";

    };

});

// ==========================================
// PREVENT EMPTY LINKS
// ==========================================

document.querySelectorAll('a[href="#"]').forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

    });

});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log("🔥 Fanvora V1.1 Loaded Successfully");

// ==========================================
// FUTURE FUNCTIONS
// ==========================================

// TODO:
// Live Match API
// Live Fan Counter
// QR Generator
// Download PDF
// Notifications
// Fan Battle
// Community Chat
// Blockchain Passport
// University League