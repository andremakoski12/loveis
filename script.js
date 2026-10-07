const relationshipStart=new Date("2026-09-13T00:00:00-03:00");

const el=id=>document.getElementById(id);

function updateRelationship(){
  let diff=Math.max(0,new Date()-relationshipStart);
  const s=1000,m=s*60,h=m*60,d=h*24;
  el("days").textContent=Math.floor(diff/d).toLocaleString("pt-BR");
  el("hours").textContent=String(Math.floor(diff% d/h)).padStart(2,"0");
  el("minutes").textContent=String(Math.floor(diff% h/m)).padStart(2,"0");
  el("seconds").textContent=String(Math.floor(diff% m/s)).padStart(2,"0");
}

function nextDay13(now){
  let target=new Date(now.getFullYear(),now.getMonth(),13,0,0,0);
  if(target<=now) target=new Date(now.getFullYear(),now.getMonth()+1,13,0,0,0);
  return target;
}

function updateNext(){
  const now=new Date(),target=nextDay13(now);
  let diff=Math.max(0,target-now);
  const s=1000,m=s*60,h=m*60,d=h*24;
  el("nextDays").textContent=String(Math.floor(diff/d)).padStart(2,"0");
  el("nextHours").textContent=String(Math.floor(diff%d/h)).padStart(2,"0");
  el("nextMinutes").textContent=String(Math.floor(diff%h/m)).padStart(2,"0");
  el("nextSeconds").textContent=String(Math.floor(diff%m/s)).padStart(2,"0");
  el("nextMonthLabel").textContent="Próximo capítulo: "+new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).format(target);
}

const song=el("loveSong"),musicToggle=el("musicToggle"),musicLabel=el("musicLabel");
musicToggle.addEventListener("click",async()=>{
  try{
    if(song.paused){await song.play();musicLabel.textContent="Pausar nossa música";musicToggle.classList.add("playing");}
    else{song.pause();musicLabel.textContent="Tocar nossa música";musicToggle.classList.remove("playing");}
  }catch(e){musicLabel.textContent="Adicione a música em assets/";}
});

document.querySelectorAll("[data-scroll]").forEach(btn=>{
  btn.addEventListener("click",()=>document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
});

const gallery=document.getElementById("gallery");
let down=false,startX=0,scrollLeft=0;
gallery.addEventListener("mousedown",e=>{down=true;startX=e.pageX-gallery.offsetLeft;scrollLeft=gallery.scrollLeft});
gallery.addEventListener("mouseleave",()=>down=false);
gallery.addEventListener("mouseup",()=>down=false);
gallery.addEventListener("mousemove",e=>{
  if(!down)return;e.preventDefault();
  gallery.scrollLeft=scrollLeft-(e.pageX-gallery.offsetLeft-startX)*1.2;
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

updateRelationship();updateNext();
setInterval(updateRelationship,1000);
setInterval(updateNext,1000);
