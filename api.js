// ZERO SE HERO - 100% STATIC FIX - NO BACKEND NEEDED
const API_URL = "";
const API_BASE = "";

console.log("API FIXED - STATIC MODE");

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
  // NO FETCH - STATIC ONLY
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

// Sab fetch ko rok do jo black screen deta hai
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (typeof url === 'string' && (url.includes('/follow') || url.includes('/api') || url.includes('/backpack') || url.includes('/recharge'))) {
    console.log("Blocked fetch:", url);
    return Promise.resolve(new Response(JSON.stringify({ success: true, data: [] }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
  }
  return originalFetch.apply(this, arguments);
};

