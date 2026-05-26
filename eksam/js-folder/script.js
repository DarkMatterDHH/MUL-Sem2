const menuButton = document.querySelector(".menu");
const burgerMenu = document.querySelector(".burger");
const oevelserMenu = document.querySelector(".oevelser");
const arrow = document.querySelector(".arrow");

menuButton.addEventListener("click", () => {
  if (menuButton.classList.contains("opened")) {
    burgerMenu.classList.remove("off-screen");
    burgerMenu.classList.add("on-screen");
  } else {
    burgerMenu.classList.remove("on-screen");
    burgerMenu.classList.add("off-screen");

    // 🔥 CLOSE ØVELSER MENU WHEN BURGER CLOSES
    oevelserMenu.classList.remove("on-screen");
    oevelserMenu.classList.add("off-screen");

    // 🔥 RESET ARROW TEXT
    arrow.innerHTML = "&#128899";
  }
});

arrow.addEventListener("click", () => {
  // Check if oevelser menu is hidden
  if (oevelserMenu.classList.contains("off-screen")) {
    // Show menu
    oevelserMenu.classList.remove("off-screen");
    oevelserMenu.classList.add("on-screen");

    // Change arrow to up arrow
    arrow.innerHTML = "&#128897";
  } else {
    // Hide menu
    oevelserMenu.classList.remove("on-screen");
    oevelserMenu.classList.add("off-screen");

    // Change arrow back to down arrow
    arrow.innerHTML = "&#128899";
  }
});
