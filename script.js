// ===== EDIT PASSWORD HERE (not case sensitive) =====
const PASSWORD = "LOKI";

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

  if (input.value.trim().toUpperCase() === PASSWORD.toUpperCase()) {
    sessionStorage.setItem("unlocked", "yes");
    unlock();
  } else {
    error.hidden = false;
    input.value = "";
    input.focus();
  }
});