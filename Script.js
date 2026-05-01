/* ===== SAFE START ===== */
window.addEventListener("load", ()=>{

/* ===== BPM ===== */
const BPM = 128;
const beat = 60000 / BPM;

/* ===== INTRO ===== */
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
  if(!text) return;

  if(i>=lines.length){
    document.getElementById("intro").style.display="none";
    return;
  }

  text.classList.remove("show");

  setTimeout(()=>{
    text.innerHTML = lines[i];
    text.classList.add("show");
    i++;
  },200);

  setTimeout(showLine, beat * 6);
}

showLine();

/* FAILSAFE intro (chống đen màn) */
setTimeout(()=>{
  let intro = document.getElementById("intro");
  if(intro) intro.style.display="none";
},10000);

/* SKIP */
const skipBtn = document.getElementById("skip");
if(skipBtn){
  skipBtn.onclick = ()=>{
    document.getElementById("intro").style.display="none";
  };
}

/* ===== LOGIN ===== */
function login(){
  const n = document.getElementById("nick").value;
  if(!n) return alert("Nhập biệt danh!");
  localStorage.setItem("nick",n);
  document.getElementById("login").style.display="none";
  document.getElementById("userTag").innerText="👤 "+n;
}

window.login = login;

if(localStorage.getItem("nick")){
  document.getElementById("login").style.display="none";
  document.getElementById("userTag").innerText="👤 "+localStorage.getItem("nick");
}

/* ===== MUSIC ===== */
const music=document.getElementById("music");
const btn=document.getElementById("btn");

let playing=false;

if(btn && music){
  btn.onclick=()=>{
    if(!playing){
      music.play().catch(()=>{});
      btn.innerHTML="⏸";
      btn.classList.add("spin");
    }else{
      music.pause();
      btn.innerHTML="▶";
      btn.classList.remove("spin");
    }
    playing=!playing;
  };
}

/* ===== BEAT EFFECT ===== */
setInterval(()=>{
  document.body.style.transform="scale(1.01)";
  setTimeout(()=>{
    document.body.style.transform="scale(1)";
  },100);
}, beat);

/* ===== FLOWER ===== */
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

/* ===== LIGHTBOX ===== */
const images=document.querySelectorAll(".gallery img");
const lightbox=document.getElementById("lightbox");
const lightImg=document.getElementById("lightboxImg");

if(images){
  images.forEach(img=>{
    img.onclick=()=>{
      if(lightbox && lightImg){
        lightbox.style.display="flex";
        lightImg.src=img.src;
      }
    };
  });
}

if(lightbox){
  lightbox.onclick=(e)=>{
    if(e.target!==lightImg){
      lightbox.style.display="none";
    }
  };
}

const closeBtn=document.getElementById("close");
if(closeBtn){
  closeBtn.onclick=()=>{
    lightbox.style.display="none";
  };
}

/* ===== SCROLL REVEAL ===== */
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

/* ===== COUNTDOWN ===== */
setInterval(()=>{
  let d=new Date("2026-05-30")-new Date();
  let el=document.getElementById("countdown");
  if(el){
    el.innerText="Còn "+Math.floor(d/86400000)+" ngày";
  }
},1000);

});
