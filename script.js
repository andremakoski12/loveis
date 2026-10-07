const song=document.getElementById('loveSong');
const toggle=document.getElementById('musicToggle');
const label=document.getElementById('musicLabel');
let musicWanted=false, musicVolume=.72, fadeTimer=null;

function setMusicLabel(){label.textContent=song.paused?'Tocar nossa música':'Pausar nossa música'}
function fadeTo(target,duration=700){
 clearInterval(fadeTimer); const start=song.volume,distance=target-start,steps=18; let step=0;
 fadeTimer=setInterval(()=>{step++;song.volume=Math.min(1,Math.max(0,start+distance*(step/steps)));if(step>=steps){clearInterval(fadeTimer);fadeTimer=null}},duration/steps)
}
async function playMusic(){musicWanted=true;try{await song.play();fadeTo(musicVolume,500)}catch(e){}setMusicLabel()}
function pauseMusic(){musicWanted=false;fadeTo(0,350);setTimeout(()=>{if(!musicWanted)song.pause()},380);setMusicLabel()}
toggle.addEventListener('click',()=>song.paused?playMusic():pauseMusic());
song.volume=musicVolume;setMusicLabel();

/* 13/09/2026 é somente a data oficial do namoro.
   Como o horário real não é conhecido, o contador usa 00:00 no horário de Brasília
   como referência técnica, sem afirmar que esse foi o horário da oficialização. */
const start=new Date('2026-09-13T00:00:00-03:00');
function relationship(){
 const elapsed=Math.max(0,Date.now()-start.getTime()),s=1000,m=s*60,h=m*60,d=h*24;
 document.getElementById('days').textContent=Math.floor(elapsed/d);
 document.getElementById('hours').textContent=String(Math.floor(elapsed%d/h)).padStart(2,'0');
 document.getElementById('minutes').textContent=String(Math.floor(elapsed%h/m)).padStart(2,'0');
 document.getElementById('seconds').textContent=String(Math.floor(elapsed%m/s)).padStart(2,'0');
}
relationship();setInterval(relationship,1000);

const videos=document.querySelectorAll('.memory-video');
function lowerMusicForVideo(){if(!song.paused)fadeTo(.10,700)}
function restoreMusicAfterVideo(){if(musicWanted&&!song.paused)fadeTo(musicVolume,900)}
videos.forEach(video=>{
 const frame=video.closest('.video-frame'),soundButton=frame.querySelector('.sound');
 video.addEventListener('play',lowerMusicForVideo);
 video.addEventListener('ended',restoreMusicAfterVideo);
 video.addEventListener('pause',()=>{if(video.currentTime<video.duration-.25)restoreMusicAfterVideo()});
 soundButton.addEventListener('click',()=>{
  video.muted=!video.muted;soundButton.textContent=video.muted?'som':'mudo';
  if(!video.muted)videos.forEach(other=>{if(other!==video){other.pause();other.muted=true}})
 });
});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 const video=entry.target;
 if(entry.isIntersecting&&entry.intersectionRatio>=.45)video.play().catch(()=>{});
 else video.pause();
}),{threshold:[0,.45,.8]});
videos.forEach(video=>observer.observe(video));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{
 const target=document.querySelector(button.dataset.scroll);if(target)target.scrollIntoView({behavior:'smooth'})
}));
