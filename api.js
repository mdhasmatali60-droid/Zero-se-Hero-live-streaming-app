const API_URL = "https://zero-se-hero-live-streaming-app.vercel.app";

// GET BACKPACK - ORIGINAL
function getBackpack(){
  return fetch(API_URL + "/backpack")
  .then(r => r.json())
  .then(data => {
    console.log('Backpack:', data);
    // Backpack page me data dikhao
    if(document.getElementById('backpackContent')){
      // yahan backpack items render honge
    }
    return data;
  });
}

// RECHARGE COINS - ORIGINAL
function rechargeCoins(amount){
  return fetch(API_URL + "/recharge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({userId: localStorage.getItem('talentID'), amount: amount})
  }).then(r => r.json())
  .then(data => {
    console.log('Recharge:', data);
    alert('✅ Recharge Success - ' + amount + ' Coins!');
    return data;
  });
}

// PROFILE AUTO ID + FOLLOW BACK + INBOX - JO TU MANG RAHA THA
if(!localStorage.getItem('talentID')){
  localStorage.setItem('talentID','66'+Math.floor(100000+Math.random()*900000));
}
if(!localStorage.getItem('talentLevel')){
  localStorage.setItem('talentLevel','12');
  localStorage.setItem('talentFollowers','248');
  localStorage.setItem('talentFollowing','102');
  localStorage.setItem('talentInbox','[]');
}

function followUserAPI(targetID, targetName){
  let inbox = JSON.parse(localStorage.getItem('talentInbox'));
  inbox.unshift({
    from: targetName,
    id: targetID,
    text: `Hey! Thanks for following 😍 - ${targetName} followed you back! Let's Party? 🎉`,
    time: new Date().toLocaleString()
  });
  localStorage.setItem('talentInbox', JSON.stringify(inbox));
  
  let f = parseInt(localStorage.getItem('talentFollowers'))+1;
  localStorage.setItem('talentFollowers', f);
  
  alert('✅ Followed '+targetName+' - Follow Back + Inbox Msg Sent!');
  
  // Optional - API pe bhi follow bhejo
  fetch(API_URL + "/follow", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({follower: localStorage.getItem('talentID'), following: targetID})
  });
}
