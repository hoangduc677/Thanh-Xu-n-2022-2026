/* FIREBASE */
const firebaseConfig = {
  // DÁN CONFIG
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* BPM */
const BPM = 128;
const beat = 60000 / BPM;

/* INTRO */
const lines = [
"Chúng ta đã từng nghĩ...",
"Những ngày này sẽ kéo dài mãi mãi...",
"",
"Những buổi học lén nói chuyện...",
"Những lần cười không cần lý do...",
"",
"Rồi một ngày...",
"mọi thứ trở thành ký ức...",
"",
"Không ồn ào...",
"Không vội vã...",
"",
"Chỉ là...",
"một chút nhạc...",
"một chút nhớ...",
"",
"Và một chuyến tàu...",
"đang rời ga thanh xuân...",
"",
"Chuyến Tàu Thanh Xuân 2022 - 2026 💙"
];

let i=0;
const text=document.getElementById("text");

function showLine(){
if(i>=lines.length){
document.getElementById("intro").style.display="none";
return;
}

text.classList.remove("show");

setTimeout(()=>{
text.innerHTML=lines[i];
text.classList.add("show");
i++;
},200);

setTimeout(showLine, beat * 6);
}

showLine();

document.getElementById("skip").onclick=()=>{
document.getElementById("intro").style.display="none";
};

/* LOGIN */
function login(){
const n=document.getElementById("nick").value;
if(!n) return;
localStorage.setItem("nick",n);
document.getElementById("login").style.display="none";
document.getElementById("userTag").innerText="👤 "+n;
}

if(localStorage.getItem("nick")){
document.getElementById("login").style.display="none";
document.getElementById("userTag").innerText="👤 "+localStorage.getItem("nick");
}

/* MUSIC */
const music=document.getElementById("music");
const btn=document.getElementById("btn");

btn.onclick=()=>{
music.play();
btn.innerHTML="⏸";
btn.classList.add("spin");
};

/* BEAT EFFECT */
setInterval(()=>{
document.body.style.transform="scale(1.01)";
setTimeout(()=>{
document.body.style.transform="scale(1)";
},100);
}, beat);

/* FLOWER */
setInterval(()=>{
if(document.hidden) return;

let f=document.createElement("div");
f.className="flower";
f.innerHTML="🌸";
f.style.left=Math.random()*100+"vw";
f.style.animationDuration="4s";

document.body.appendChild(f);
setTimeout(()=>f.remove(),7000);

}, beat*2);

/* LIGHTBOX */
const images=document.querySelectorAll(".gallery img");
const lightbox=document.getElementById("lightbox");
const lightImg=document.getElementById("lightboxImg");

images.forEach(img=>{
img.onclick=()=>{
lightbox.style.display="flex";
lightImg.src=img.src;
};
});

document.getElementById("close").onclick=()=>{
lightbox.style.display="none";
};

/* SCROLL REVEAL */
const reveals=document.querySelectorAll(".reveal");

function revealOnScroll(){
const trigger=window.innerHeight*0.85;
reveals.forEach(el=>{
if(el.getBoundingClientRect().top<trigger){
el.classList.add("show");
}
});
}

window.addEventListener("scroll",revealOnScroll);
revealOnScroll();

/* MESSAGE */
function sendMsg(){
const nick=localStorage.getItem("nick");
const msg=document.getElementById("msg").value;
if(!msg) return;

db.ref("messages").push({nick,msg});
document.getElementById("msg").value="";
}

db.ref("messages").on("child_added",snap=>{
let d=snap.val();
let div=document.createElement("div");
div.innerHTML="<b>"+d.nick+"</b>: "+d.msg;
document.getElementById("messages").appendChild(div);
});