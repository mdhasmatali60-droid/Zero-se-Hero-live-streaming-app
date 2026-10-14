const TMDB_API_KEY="d0bf1edf9bce13874f519004464a9be2";
const TMDB_URL="https://api.themoviedb.org/3";
const API_URL=""; const API_BASE="";
if(!localStorage.getItem('coins'))localStorage.setItem('coins','1000');
if(!localStorage.getItem('talentInbox'))localStorage.setItem('talentInbox','[]');
if(!localStorage.getItem('talentFollower'))localStorage.setItem('talentFollower','0');
function followUserAPI(id,name){
let ib=JSON.parse(localStorage.getItem('talentInbox')||'[]');
ib.unshift({from:name,text:"Thanks",time:Date.now()});
localStorage.setItem('talentInbox',JSON.stringify(ib));
let f=parseInt(localStorage.getItem('talentFollower')||'0');
localStorage.setItem('talentFollower',f+1);
alert('Followed '+name)
}
async function getBackpack(){return JSON.parse(localStorage.getItem('backpack')||'[]')}
async function getCoins(){return parseInt(localStorage.getItem('coins')||'1000')}
async function rechargeCoins(a){let c=await getCoins();c+=100;localStorage.setItem('coins',c+'');return{success:true,coins:c}}
const oF=window.fetch;
window.fetch=function(url){
let u=url+"";if(u.includes('themoviedb'))return oF.apply(this,arguments);
if(u.includes('/api')||u.includes('backpack')||u.includes('follow'))return Promise.resolve(new Response('{"success":true}',{headers:{'Content-Type':'application/json'}}));
return oF.apply(this,arguments)
}
async function getPopularMovies(){
try{let r=await oF(TMDB_URL+"/movie/popular?api_key="+TMDB_API_KEY);let d=await r.json();return d.results}catch(e){return[]}
}