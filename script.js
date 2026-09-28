// ===== PASSWORD (case sensitive) =====
// The password itself isn't stored here, only a scrambled fingerprint of it.
// To change the password: open the site, open the browser console,
// type  hash("NEWPASSWORD")  and paste the result between the quotes below.
const PASSWORD_HASH = "700cb220d1c4584b";

function hash(text) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}

const lock = document.getElementById("lock");
const party = document.getElementById("party");
const form = document.getElementById("lock-form");
const input = document.getElementById("password");
const error = document.getElementById("error");

function unlock() {
  lock.hidden = true;
  party.hidden = false;
}

// Skip the password if it was already entered during this visit
if (sessionStorage.getItem("unlocked") === "yes") {
  unlock();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (hash(input.value.trim()) === PASSWORD_HASH) {
    sessionStorage.setItem("unlocked", "yes");
    unlock();
  } else {
    error.hidden = false;
    input.value = "";
    input.focus();
  }
});
