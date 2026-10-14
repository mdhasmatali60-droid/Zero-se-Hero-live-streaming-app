const TMDB_API_KEY = "d0bf1edf9bce13874f519004464a9be2";
const TMDB_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGJmMWVkZjliY2UxMzg3NGY1OTAwNDQ2YTRkOWJlMiIsIm5iZiI6MTc5MTg4OTI3Ni42Njc0NTk5LCJzdWIiOiI2YWNiMGY3YzM5NzJmNTFjZWQxMzVlZTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwiZXZpIjoiMXgwIn0.fykqstcZQ0RiMB1BxYh9tEDE_H3IKzbUE0u4Cclr5Mk";
const TMDB_URL = "https://api.themoviedb.org/3";
const API_URL = "";
const API_BASE = "";

console.log("API FIXED - STATIC MODE + TMDB ENABLED");

// Init - Local Storage
if (!localStorage.getItem('talentLevel')) localStorage.setItem('talentLevel', '1');
if (!localStorage.getItem('talentFollower')) localStorage.setItem('talentFollower', '0');
if (!localStorage.getItem('talentFollowing')) localStorage.setItem('talentFollowing', '0');
if (!localStorage.getItem('talentInbox')) localStorage.setItem('talentInbox', '[]');
if (!localStorage.getItem('coins')) localStorage.setItem('coins', '1000');
if (!localStorage.getItem('backpack')) localStorage.setItem('backpack', '[]');

function followUserAPI(targetID, targetName) {
  try {
    let inbox = JSON.parse(localStorage.getItem('talentInbox') || '[]');
    inbox.unshift({
      from: targetName,
      id: targetID,
      text: `Hey! Thanks for following 🥰`,
      time: new Date().toLocaleString()
    });
    localStorage.setItem('talentInbox', JSON.stringify(inbox));

    let f = parseInt(localStorage.getItem('talentFollower') || '0');
    f++;
    localStorage.setItem('talentFollower', f.toString());

    alert('✅ Followed ' + targetName + ' - Check Inbox!');
  } catch (e) {
    console.log(e);
    alert('✅ Followed ' + targetName);
  }
}

async function getBackpack() {
  return JSON.parse(localStorage.getItem("backpack") || "[]");
}

async function getCoins() {
  return parseInt(localStorage.getItem("coins") || "1000");
}

async function rechargeCoins(amount) {
  let coins = await getCoins();
  coins += parseInt(amount) || 100;
  localStorage.setItem("coins", coins.toString());
  return { success: true, coins };
}

async function sendGift() {
  return { success: true };
}

// Sab fetch ko rok do jo black screen deta hai - PAR TMDB KO MAT ROKO
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  const u = typeof url === 'string' ? url : (url && url.url ? url.url : '');
  if (u.includes('themoviedb.org')) {
    return originalFetch.apply(this, arguments);
  }
  if (u.includes('/follow') || u.includes('/api/') || u.includes('/backpack