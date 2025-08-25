const typed = new Typed(".auto-type", {
  strings: ["Tip", "Split", "Enjoy"],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true,
  backDelay: 1000,
  cursorChar: "|",
  smartBackspace: true,
});
const typed2 = new Typed(".type", {
  strings: ["Hrishi Yadav"],
  typeSpeed: 100, // natural typing speed
  backSpeed: 100, // speed of deleting
  loop: true, // repeat animation
  backDelay: 1000, // pause before deleting // custom cursor
  showCursor: true, // optional here
});

document.addEventListener("DOMContentLoaded", () => {
  function calculateTip() {
    const billAmount = parseFloat(document.getElementById("bill").value);
    const serviceQuality = parseFloat(document.getElementById("service").value);
    const numberOfPeople = parseFloat(document.getElementById("people").value);

    const tip = document.getElementById("tipAmount");
    const total = document.getElementById("totalAmount");
    const person = document.getElementById("perPerson");
    const tipPerson = document.getElementById("tipPerPerson");

    if (isNaN(billAmount) || billAmount <= 0) {
      alert("PLEASE ENTER A VALID BILL AMOUNT");
      return;
    }
    if (isNaN(serviceQuality)) {
      alert("PLEASE SELECT A SERVICE RATING");
      return;
    }
    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
      alert("PLEASE ENTER A VALID NUMBER OF PEOPLE");
      return;
    }

    // ✅ Allow 0 tip when "None" is selected
    const tipAmount = billAmount * serviceQuality;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numberOfPeople;
    const tipPerPerson = tipAmount / numberOfPeople;

    // Animate values
    animateValue(tip, tip.textContent, tipAmount, 1000);
    animateValue(total, total.textContent, totalAmount, 1000);
    animateValue(person, person.textContent, perPerson, 1000);
    animateValue(tipPerson, tipPerson.textContent, tipPerPerson, 1000);
  }

  function animateValue(element, startValue, endValue, duration) {
    let start = parseFloat(startValue.replace(/[^0-9.-]+/g, "")) || 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (endValue - start) * progress;

      element.textContent = value.toFixed(2);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateTip);
});
