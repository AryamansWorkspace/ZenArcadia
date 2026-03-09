<<<<<<< HEAD
let data = JSON.parse(localStorage.getItem("zenarcadia"));

if(!data){
data={
aryaman:{xp:0,level:1,history:[],shields:1,streak:0,lastSolved:null},
arshiya:{xp:0,level:1,history:[],shields:1,streak:0,lastSolved:null}
};
}

/* PARTICLES */

const particleContainer=document.getElementById("particles");

for(let i=0;i<35;i++){

let p=document.createElement("div");

p.className="particle";

p.style.left=Math.random()*100+"vw";
p.style.animationDuration=(6+Math.random()*6)+"s";
p.style.animationDelay=Math.random()*5+"s";

particleContainer.appendChild(p);

}

/* CLICK SOUND + START MUSIC */

let bgmStarted=false;

document.addEventListener("click",()=>{

document.getElementById("clickSound").play();

if(!bgmStarted){
let bgm=document.getElementById("bgm");
bgm.volume=0.35;
bgm.play();
bgmStarted=true;
}

});

/* XP POPUP */

function showXPPopup(amount){

let popup=document.createElement("div");

popup.className="xp-popup";

popup.innerText="+"+amount+" XP";

popup.style.left=(Math.random()*60+20)+"vw";
popup.style.top="60vh";

document.body.appendChild(popup);

setTimeout(()=>popup.remove(),1500);

}

/* XP CALC */

function xpNeeded(level){
return level*50;
}

/* SOLVE */

function solveProblem(player){

let today=new Date().toDateString();
let xp=10;

if(data[player].lastSolved!==today){

data[player].streak++;
data[player].lastSolved=today;

}

addXP(player,xp);

}

/* ADD XP */

function addXP(player,xp){

document.getElementById("xpSound").play();
showXPPopup(xp);

data[player].history.push({
prevXP:data[player].xp,
prevLevel:data[player].level
});

data[player].xp+=xp;

while(data[player].xp>=xpNeeded(data[player].level)){
data[player].xp-=xpNeeded(data[player].level);
data[player].level++;
}

save();
render();

}

/* UNDO */

function undoXP(player){

let last=data[player].history.pop();
if(!last)return;

data[player].xp=last.prevXP;
data[player].level=last.prevLevel;

save();
render();

}

/* SHIELD */

function useShield(player){

if(data[player].shields<=0)return;

data[player].shields--;
data[player].streak++;

save();
render();

}

/* TIMER */

function updateTimer(){

let now=new Date();
let midnight=new Date();

midnight.setHours(24,0,0,0);

let diff=midnight-now;

let h=Math.floor(diff/3600000);
let m=Math.floor(diff%3600000/60000);
let s=Math.floor(diff%60000/1000);

document.getElementById("streakTimer").innerText=
h+"h "+m+"m "+s+"s";

}

setInterval(updateTimer,1000);

/* RENDER */

function render(){

document.getElementById("aXP").innerText=data.aryaman.xp;
document.getElementById("aLevel").innerText=data.aryaman.level;

document.getElementById("bXP").innerText=data.arshiya.xp;
document.getElementById("bLevel").innerText=data.arshiya.level;

document.getElementById("aStreak").innerText=data.aryaman.streak;
document.getElementById("bStreak").innerText=data.arshiya.streak;

document.getElementById("aShields").innerText=data.aryaman.shields;
document.getElementById("bShields").innerText=data.arshiya.shields;

let aNeeded=xpNeeded(data.aryaman.level);
let bNeeded=xpNeeded(data.arshiya.level);

document.getElementById("aProgress").style.width=(data.aryaman.xp/aNeeded*100)+"%";
document.getElementById("bProgress").style.width=(data.arshiya.xp/bNeeded*100)+"%";

}

function save(){
localStorage.setItem("zenarcadia",JSON.stringify(data));
}

=======
/* RESET LOCAL STORAGE */

localStorage.removeItem("zenarcadia");

let data={
aryaman:{xp:0,level:1,history:[],shields:1,streak:0,lastSolved:null},
arshiya:{xp:0,level:1,history:[],shields:1,streak:0,lastSolved:null}
};

/* click sound */

document.addEventListener("click",()=>{
document.getElementById("clickSound").play();
});

/* xp needed */

function xpNeeded(level){
return level*50;
}

/* solve */

function solveProblem(player){

let today=new Date().toDateString();
let xp=10;

if(data[player].lastSolved!==today){

data[player].streak++;
data[player].lastSolved=today;

}

addXP(player,xp);

}

function addXP(player,xp){

document.getElementById("xpSound").play();

data[player].history.push({
prevXP:data[player].xp,
prevLevel:data[player].level
});

data[player].xp+=xp;

while(data[player].xp>=xpNeeded(data[player].level)){
data[player].xp-=xpNeeded(data[player].level);
data[player].level++;
}

render();

}

function undoXP(player){

let last=data[player].history.pop();
if(!last)return;

data[player].xp=last.prevXP;
data[player].level=last.prevLevel;

render();

}

function useShield(player){

if(data[player].shields<=0)return;

data[player].shields--;
data[player].streak++;

render();

}

function updateTimer(){

let now=new Date();
let midnight=new Date();

midnight.setHours(24,0,0,0);

let diff=midnight-now;

let h=Math.floor(diff/3600000);
let m=Math.floor(diff%3600000/60000);
let s=Math.floor(diff%60000/1000);

document.getElementById("streakTimer").innerText=
h+"h "+m+"m "+s+"s";

}

setInterval(updateTimer,1000);

function render(){

document.getElementById("aXP").innerText=data.aryaman.xp;
document.getElementById("aLevel").innerText=data.aryaman.level;

document.getElementById("bXP").innerText=data.arshiya.xp;
document.getElementById("bLevel").innerText=data.arshiya.level;

document.getElementById("aStreak").innerText=data.aryaman.streak;
document.getElementById("bStreak").innerText=data.arshiya.streak;

document.getElementById("aShields").innerText=data.aryaman.shields;
document.getElementById("bShields").innerText=data.arshiya.shields;

let aNeeded=xpNeeded(data.aryaman.level);
let bNeeded=xpNeeded(data.arshiya.level);

document.getElementById("aProgress").style.width=(data.aryaman.xp/aNeeded*100)+"%";
document.getElementById("bProgress").style.width=(data.arshiya.xp/bNeeded*100)+"%";

}

>>>>>>> 05129158a1705bd3dddaf026de74ed72f0a9c77d
render();