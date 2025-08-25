let count = 0;
const counterEl = document.getElementById("counter");

document.getElementById("increase").addEventListener("click", () => {
  count++;
  counterEl.textContent = count;
});
document.getElementById("decrease").addEventListener("click", () => {
  count--;
  counterEl.textContent = count;
});
document.getElementById("byten").addEventListener("click", () => {
  count = count + 10;
  counterEl.textContent = count;
});
document.getElementById("reset").addEventListener("click", () => {
  count = 0;
  counterEl.textContent = count;
});

document.getElementById("reset").addEventListener("click", () => {});
