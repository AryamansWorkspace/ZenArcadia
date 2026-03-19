let data = JSON.parse(localStorage.getItem("zenarcadia"));

if(!data){
data={
aryaman:{xp:0,level:1,history:[],shields:1,streak:0,lastSolved:null},
arshiya:{xp:0,level:1,history:[],shields:1,streak:0,lastSolved:null}
};
}

/* FIREBASE */

let db, ref, updateDB, onValue;

function initFirebase(){

if(!window.firebaseReady){
setTimeout(initFirebase,100);
return;
}

db = window.firebaseReady.db;
ref = window.firebaseReady.ref;
updateDB = window.firebaseReady.update;
onValue = window.firebaseReady.onValue;

/* LIVE SYNC */

onValue(ref(db,"zenarcadia"),(snapshot)=>{

const cloud=snapshot.val();
if(!cloud)return;

data.aryaman.xp=cloud.aryaman.xp;
data.aryaman.level=cloud.aryaman.level;
data.aryaman.streak=cloud.aryaman.streak;
data.aryaman.shields=cloud.aryaman.shields;

data.arshiya.xp=cloud.arshiya.xp;
data.arshiya.level=cloud.arshiya.level;
data.arshiya.streak=cloud.arshiya.streak;
data.arshiya.shields=cloud.arshiya.shields;

render();

});

}

initFirebase();

/* PARTICLES */

const container=document.getElementById("particles");

for(let i=0;i<35;i++){
let p=document.createElement("div");
p.className="particle";
p.style.left=Math.random()*100+"vw";
p.style.animationDuration=(6+Math.random()*6)+"s";
container.appendChild(p);
}

/* CLICK + MUSIC */

let bgmStarted=false;

document.addEventListener("click",()=>{

document.getElementById("clickSound").play();

if(!bgmStarted){
document.getElementById("bgm").volume=0.35;
document.getElementById("bgm").play();
bgmStarted=true;
}

});

/* XP */

function xpNeeded(level){
return level*50;
}

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

save();
render();

}

function undoXP(player){

let last=data[player].history.pop();
if(!last)return;

data[player].xp=last.prevXP;
data[player].level=last.prevLevel;

save();
render();

}

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

if(db){

updateDB(ref(db,"zenarcadia/aryaman"),{
xp:data.aryaman.xp,
level:data.aryaman.level,
streak:data.aryaman.streak,
shields:data.aryaman.shields
});

updateDB(ref(db,"zenarcadia/arshiya"),{
xp:data.arshiya.xp,
level:data.arshiya.level,
streak:data.arshiya.streak,
shields:data.arshiya.shields
});

}

}

render();