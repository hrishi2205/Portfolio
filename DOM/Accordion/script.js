document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;
    const accordionContent = button.nextElementSibling;

    const contentHeight =
      accordionContent.querySelector(".accordion-body").offsetHeight;

    //if already active
    if (accordionItem.classList.contains("active")) {
      //close
      accordionContent.style.maxHeight = "0px";
      accordionItem.classList.remove("active");
      accordionContent.classList.remove("active");
    } else {
      //close any open item first
      document
        .querySelectorAll(".accordion-item.active")
        .forEach((activeItem) => {
          activeItem.classList.remove("active");
          activeItem.querySelector(".accordion-content").style.maxHeight =
            "0px";
          activeItem
            .querySelector(".accordion-content")
            .classList.remove("active");
        });
      accordionContent.style.maxHeight = contentHeight + "px";
      accordionItem.classList.add("active");
      accordionContent.classList.add("active");
    }
  });
});
