const card = document.querySelector(".card");
const num = card.querySelectorAll("input");
const btn = card.querySelector(".btn-outline-success");
const reset = card.querySelector(".btn-secondary");
const result = card.querySelector(".result");

btn.addEventListener("click", () => {
  const val1 = parseFloat(num[0].value);
  const val2 = parseFloat(num[1].value);

  if (!isNaN(val1) && !isNaN(val2)) {
    const sum = val1 + val2;
    result.textContent = `= ${sum}`;
    result.classList.add("show");
  }
});

reset.addEventListener("click", () => {
  num.forEach((input) => (input.value = ""));
  result.classList.remove("show");
  result.textContent = "";
});
