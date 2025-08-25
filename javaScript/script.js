const btn1El = document.querySelector(".btn1");
const btn2El = document.querySelector(".btn2");
const btn3El = document.querySelector(".btn3");
const bodyEl = document.querySelector("body");
const el = document.querySelector("h1");

btn1El.addEventListener("click", () => {
  bodyEl.style.backgroundColor =
    bodyEl.style.backgroundColor === "lightblue" ? "lightcoral" : "lightblue";
});

btn2El.addEventListener("click", () => {
  el.style.fontSize = el.style.fontSize === "80px" ? "35px" : "80px";
});

btn3El.addEventListener("click", () => {
  bodyEl.style.backgroundColor = el.style.fontSize = "";
});
