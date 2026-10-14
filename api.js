const API_URL = "https://talent-hunt-api.onrender.com";

function getBackpack() {
  return fetch(API_URL + "/backpack").then(r => r.json());
}
function rechargeCoins(amount) {
  return fetch(API_URL + "/recharge", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({userId:"66278246", amount:amount})
  }).then(r => r.json());
}
