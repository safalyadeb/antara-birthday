/* Antara's Birthday – vanilla JS */
const $=s=>document.querySelector(s);
const caps=["A smile worth remembering. ❤️","Elegance in every little moment.","Simply beautiful, effortlessly.","A little sunshine in a photograph.","Some moments deserve to stay forever.","Laughter that lights up everything.","That look says a thousand stories.","Golden hours, golden heart.","Radiant like the morning sun.","Soft moments, endless charm."];
const rots=[-3,2.5,-2,3,-1.5,2,-2.5,1.5,-3,2.5];
const wishes=[["🌸","Endless happiness."],["📸","Beautiful memories."],["🤝","Genuine friendships."],["🏆","Success in everything you do."],["🦋","Confidence to chase your dreams."],["😊","A lifetime of reasons to smile."]];
const letter=`Dear Antara,

Happy Birthday! ❤️

I hope this new chapter of your life brings you endless happiness, beautiful memories, exciting opportunities, and everything your heart wishes for.

Never stop smiling, never stop dreaming, and never forget how special you are.

May every little wish of yours come true.

Keep shining, keep smiling, and always be the wonderful person you are.

Once again, a very Happy Birthday, Antara! 🎂

With lots of warm wishes. ❤️`;

/* Build gallery, cards, collage from data */
caps.forEach((c,i)=>{$('#grid').insertAdjacentHTML('beforeend',`<figure class="pol reveal" style="--r:${rots[i]}deg;transition-delay:${(i%3)*.15}s" data-i="${i}"><img src="assets/antara-${i+1}.jpeg" alt="Antara – ${c}" loading="lazy"><p>${c}</p></figure>`);
 $('#collage').insertAdjacentHTML('beforeend',`<img src="assets/antara-${i+1}.jpeg" alt="Antara" style="--r:${rots[i]}deg" loading="lazy">`)});
wishes.forEach((w,i)=>$('#cards').insertAdjacentHTML('beforeend',`<div class="card" style="--d:${i*.15}s"><span>${w[0]}</span>${w[1]}</div>`));

/* Scroll reveal (staggered for cards) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.reveal,.card').forEach(el=>io.observe(el));

/* Floating hearts + falling petals */
for(let i=0;i<22;i++){const e=document.createElement('span');const heart=i%2;e.className=heart?'h':'p';e.textContent=heart?'❤':'🌸';
 e.style.cssText=`left:${Math.random()*100}%;font-size:${10+Math.random()*16}px;animation-duration:${9+Math.random()*10}s;animation-delay:${-Math.random()*15}s`;$('#fx').appendChild(e)}

/* Nav + hero button */
$('#burger').onclick=()=>$('#links').classList.toggle('open');
$('#links').onclick=()=>$('#links').classList.remove('open');
$('#open').onclick=()=>{burst();$('#about').scrollIntoView({behavior:'smooth'});startMusic()};

/* Lightbox */
const lb=$('#lb');
$('#grid').onclick=e=>{const f=e.target.closest('.pol');if(!f)return;$('#lbimg').src=f.querySelector('img').src;$('#lbcap').textContent=caps[f.dataset.i];lb.classList.add('on')};
lb.onclick=e=>{if(e.target!==$('#lbimg'))lb.classList.remove('on')};
addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});

/* Envelope: open, then typewriter the letter */
let typed=false;
function openEnv(){const env=$('#env');if(typed)return;typed=true;env.classList.add('open');
 let i=0;setTimeout(function t(){$('#type').textContent=letter.slice(0,++i);if(i<letter.length)setTimeout(t,35);else{burst(120);fwShow(3)}},1600)}
$('#env').onclick=openEnv;$('#env').onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openEnv()};

/* Cake */
function lightCandles(){$('.candles').classList.remove('out');$('#wishmsg').classList.remove('show')}
$('#blow').onclick=()=>{$('.candles').classList.add('out');$('#wishmsg').classList.add('show');burst()};

/* Confetti on canvas (particles pooled per burst, stops when empty) */
const cv=$('#confetti'),cx=cv.getContext('2d');let parts=[],run=false;
const size=()=>{cv.width=innerWidth;cv.height=innerHeight};size();addEventListener('resize',size);
function burst(n=160){const cols=['#f4a9c0','#d9667f','#d9ccf2','#ffd86b','#fff','#ff8fab'];
 for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight*.6,vx:(Math.random()-.5)*16,vy:-Math.random()*17-4,s:5+Math.random()*7,c:cols[i%6],r:Math.random()*6,vr:(Math.random()-.5)*.4,l:1});
 if(!run){run=true;requestAnimationFrame(tick)}}
function tick(){cx.clearRect(0,0,cv.width,cv.height);
 parts=parts.filter(p=>p.l>0&&p.y<cv.height+20);
 parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.28;p.vx*=.99;p.r+=p.vr;p.l-=.004;cx.save();cx.globalAlpha=Math.max(p.l,0);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()});
 if(parts.length)requestAnimationFrame(tick);else run=false}

/* Celebrate Again: confetti, then replay from the top */
$('#again').onclick=()=>{burst(300);setTimeout(()=>burst(200),400);
 setTimeout(()=>{$('#hero').scrollIntoView({behavior:'smooth'});lightCandles();
  typed=false;$('#env').classList.remove('open');$('#type').textContent=''},1800)};

/* Background music: soft synthesized "Happy Birthday" loop via WebAudio (no autoplay) */
let ac,master,playing=false,muted=false,timer;
const notes=[[392,.75],[392,.25],[440,1],[392,1],[523,1],[494,2],[392,.75],[392,.25],[440,1],[392,1],[587,1],[523,2],[392,.75],[392,.25],[784,1],[659,1],[523,1],[494,1],[440,2],[698,.75],[698,.25],[659,1],[523,1],[587,1],[523,2]];
function note(f,t,d){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.35,t+.04);g.gain.exponentialRampToValueAtTime(.001,t+d);
 o.connect(g).connect(master);o.start(t);o.stop(t+d+.05)}
function loop(){let t=ac.currentTime+.1;const b=.5;notes.forEach(([f,d])=>{note(f,t,d*b*1.1);t+=d*b});
 timer=setTimeout(loop,(t-ac.currentTime+1.5)*1000)}
function startMusic(){if(playing)return;ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume();
 master=master||Object.assign(ac.createGain(),{});master.gain.value=muted?0:.25;master.connect(ac.destination);
 playing=true;$('#play').textContent='❚❚ Pause';loop()}
function stopMusic(){playing=false;clearTimeout(timer);ac.suspend();$('#play').textContent='♪ Play'}
$('#play').onclick=()=>{if(playing){stopMusic()}else{if(ac){ac.resume();playing=true;$('#play').textContent='❚❚ Pause';loop()}else startMusic()}};
$('#mute').onclick=()=>{muted=!muted;if(master)master.gain.value=muted?0:.25;$('#mute').textContent=muted?'🔇':'🔊'};

/* Custom cursor (desktop only) */
if(matchMedia('(pointer:fine)').matches){document.body.classList.add('cur');const c=$('#cursor');
 addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});
 document.addEventListener('mouseover',e=>c.classList.toggle('big',!!e.target.closest('button,a,.pol,.env')))}

/* ===== v2: extra animation ===== */
/* Letter-by-letter hero heading */
document.querySelectorAll('#hero h1').forEach(h=>{const t=h.textContent;h.textContent='';h.classList.remove('rise');
 [...t].forEach((c,i)=>{const s=document.createElement('span');s.className='ch';s.textContent=c===' '?'\u00a0':c;s.style.animationDelay=(.4+i*.06)+'s';h.appendChild(s)})});

/* Floating photo bubbles around the hero */
[[6,'4%','11%'],[7,'76%','9%'],[8,'3%','66%'],[9,'77%','64%'],[10,'43%','90%']].forEach(([n,l,t],i)=>{
 const b=document.createElement('div');b.className='bubble';b.style.cssText=`left:${l};top:${t};--d:${-i*1.2}s`;
 b.innerHTML=`<img src="assets/antara-${n}.jpeg" alt="Antara" loading="lazy">`;$('#hero').appendChild(b)});

/* Scrolling photo film strip (list duplicated for a seamless loop) */
for(let k=0;k<2;k++)caps.forEach((c,i)=>$('#track').insertAdjacentHTML('beforeend',`<img src="assets/antara-${i+1}.jpeg" alt="" style="--r:${rots[i]}deg" loading="lazy">`));

/* Glowing fireflies */
for(let i=0;i<26;i++){const f=document.createElement('span');f.className='ff';
 f.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;--x:${(Math.random()-.5)*120}px;--y:${(Math.random()-.5)*120}px;--d:${-Math.random()*8}s`;$('#fx').appendChild(f)}

/* Scroll progress bar */
addEventListener('scroll',()=>{$('#progress').style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});

/* Sparkle trail on mouse / touch */
let lastSp=0;
function sparkle(x,y){const n=Date.now();if(n-lastSp<60)return;lastSp=n;const s=document.createElement('span');s.className='sp';
 s.textContent=['✦','❤','✿','✧'][Math.random()*4|0];s.style.cssText=`left:${x}px;top:${y}px;--x:${(Math.random()-.5)*60}px;--y:${20+Math.random()*40}px`;
 document.body.appendChild(s);setTimeout(()=>s.remove(),900)}
addEventListener('mousemove',e=>sparkle(e.clientX,e.clientY));
addEventListener('touchmove',e=>sparkle(e.touches[0].clientX,e.touches[0].clientY),{passive:true});

/* 3D tilt on polaroids and wish cards */
document.querySelectorAll('.pol,.card').forEach(el=>{
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();
  el.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');el.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*14+'deg')});
 el.addEventListener('mouseleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})});

/* Mini confetti whenever a section title is revealed */
const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){burst(30);tio.unobserve(e.target)}}),{threshold:.9});
document.querySelectorAll('#wishes .title,#final .big').forEach(el=>tio.observe(el));

/* ===== v3: phone-first behaviour ===== */
/* Lighter effects on touch devices for smooth scrolling */
if(matchMedia('(pointer:coarse)').matches)document.querySelectorAll('#fx .ff:nth-child(odd),#fx .h:nth-child(3n)').forEach(e=>e.remove());

/* Lightbox with prev/next buttons and swipe */
let cur=0;
function showPhoto(i){cur=(i+caps.length)%caps.length;$('#lbimg').src=`assets/antara-${cur+1}.jpeg`;$('#lbcap').textContent=caps[cur];lb.classList.add('on')}
$('#grid').onclick=e=>{const f=e.target.closest('.pol');if(f)showPhoto(+f.dataset.i)};
['prev','next'].forEach((d,k)=>{const b=document.createElement('button');b.className='lb-nav '+d;b.textContent=k?'›':'‹';b.setAttribute('aria-label',d);
 b.onclick=e=>{e.stopPropagation();showPhoto(cur+(k?1:-1))};lb.appendChild(b)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)showPhoto(cur+(dx<0?1:-1))});
lb.onclick=e=>{if(e.target===lb||e.target.id==='lbx')lb.classList.remove('on')};

/* Pause music when the phone screen locks or the tab is hidden */
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stopMusic()});

/* ===== v4: cinematic surprise intro, fireworks, photo rain ===== */
history.scrollRestoration='manual';scrollTo(0,0);document.body.classList.add('locked');
const wait=ms=>new Promise(r=>setTimeout(r,ms));

/* Fireworks on a global canvas (additive blending, fading trails) */
const fc=$('#fw'),fg=fc.getContext('2d');let sp=[],fr=false;
const sizeF=()=>{fc.width=innerWidth;fc.height=innerHeight};sizeF();addEventListener('resize',sizeF);
function firework(x,y){const h=Math.random()*70+320;
 for(let i=0;i<70;i++){const a=Math.PI*2*i/70,v=2+Math.random()*4;sp.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,h:h+Math.random()*40})}
 if(!fr){fr=true;ftick()}}
function ftick(){fg.globalCompositeOperation='destination-out';fg.fillStyle='rgba(0,0,0,.2)';fg.fillRect(0,0,fc.width,fc.height);
 fg.globalCompositeOperation='lighter';sp=sp.filter(p=>p.l>0);
 sp.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.04;p.vx*=.985;p.vy*=.985;p.l-=.011;fg.fillStyle=`hsla(${p.h},100%,65%,${p.l})`;fg.beginPath();fg.arc(p.x,p.y,2.2,0,7);fg.fill()});
 if(sp.length)requestAnimationFrame(ftick);else{fg.clearRect(0,0,fc.width,fc.height);fr=false}}
/* Launch n fireworks at random spots in the upper sky */
function fwShow(n=6){for(let i=0;i<n;i++)setTimeout(()=>firework(innerWidth*(.15+Math.random()*.7),innerHeight*(.15+Math.random()*.45)),i*260)}

/* Her photos rain down from the sky */
function rain(){for(let i=1;i<=10;i++){const m=document.createElement('img');m.src=`assets/antara-${i}.jpeg`;m.className='rain';
 m.style.cssText=`left:${5+Math.random()*80}%;--t:${2+Math.random()*1.5}s;--rot:${(Math.random()-.5)*60}deg;animation-delay:${Math.random()*.8}s`;
 document.body.appendChild(m);setTimeout(()=>m.remove(),5000)}}

/* The countdown reveal: 3 · 2 · 1 · SURPRISE! then the curtains open */
$('#begin').onclick=async()=>{startMusic();$('#ct').style.opacity=0;const c=$('#count');
 for(const n of ['3','2','1']){c.innerHTML=`<span>${n}</span>`;if(ac)note(660+(3-n)*110,ac.currentTime,.4);await wait(1000)}
 c.innerHTML='<span class="sur">SURPRISE! 🎉</span>';fwShow(7);rain();burst(200);await wait(1400);
 $('#intro').classList.add('open');document.body.classList.remove('locked');burst(250);setTimeout(()=>$('#intro').remove(),1800)};

/* Tap her photo for a rush of hearts */
$('.hero-frame').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();
 for(let i=0;i<14;i++){const s=document.createElement('span');s.className='up';s.textContent=['❤','💖','✨','🌸'][i%4];
  s.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;--x:${(Math.random()-.5)*220}px;font-size:${18+Math.random()*16}px;animation-delay:${i*.04}s`;
  document.body.appendChild(s);setTimeout(()=>s.remove(),2200)}};

/* Shooting stars every few seconds */
setInterval(()=>{if(document.hidden)return;const s=document.createElement('i');s.className='shoot';s.style.cssText=`left:${40+Math.random()*60}%;top:${Math.random()*30}%`;document.body.appendChild(s);setTimeout(()=>s.remove(),1300)},3500);

/* Grand finale fireworks when the last section appears, and on Celebrate Again */
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){fwShow(6);o.disconnect()}}),{threshold:.6}).observe($('#final'));
$('#again').addEventListener('click',()=>fwShow(9));

/* ===== v5: luxe polish ===== */
/* Inline SVG flower: two layers of petals around a golden centre */
function flowerSVG(a,b){let p='';for(let i=0;i<8;i++)p+=`<ellipse cx="50" cy="24" rx="10" ry="22" fill="${a}" opacity=".88" transform="rotate(${i*45} 50 50)"/>`;
 for(let i=0;i<8;i++)p+=`<ellipse cx="50" cy="33" rx="7" ry="15" fill="${b}" opacity=".9" transform="rotate(${i*45+22} 50 50)"/>`;
 return `<svg viewBox="0 0 100 100">${p}<circle cx="50" cy="50" r="9" fill="#f2c46d"/><circle cx="50" cy="50" r="4" fill="#fff3c9"/></svg>`}
['#hero','#about','#final'].forEach(id=>['a','b','c','d'].forEach((k,i)=>{
 if(id==='#about'&&(k==='b'||k==='c'))return;
 const d=document.createElement('div');d.className='fl '+k;d.innerHTML=flowerSVG(i%2?'#f4a9c0':'#f9c6d6',i%2?'#fff0f5':'#d9ccf2');$(id).appendChild(d)}));

/* Golden sparkles orbiting her hero photo */
$('.hero-frame').insertAdjacentHTML('beforeend','<div class="orbit"><i>✦</i><i>✧</i><i>✦</i><i>✧</i></div>');

/* Soft wave dividers between sections */
['#gallery','#letter','#cake','#wishes','#final'].forEach(id=>$(id).insertAdjacentHTML('beforebegin',
 '<div class="wave"><svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30C150 0 300 60 450 30S750 0 900 30s200 25 300 0V60H0z" fill="rgba(255,255,255,.4)"/></svg></div>'));
