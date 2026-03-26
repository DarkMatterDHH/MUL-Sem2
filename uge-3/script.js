/* offcanvas*/
const burgeroverlay = document.querySelector(".burger-offcanvas");
const burgeree = document.querySelector(".icon");

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */

burgeree.addEventListener("click", function () {
  console.log("Du har klikket på Åben menu-knappen!");
  burgeroverlay.classList.toggle("show");
});

/**/

/**/
/* slideshow funtion for menu'en */
const slides = document.querySelectorAll(".card");
let curentIndex = 1;

function displayImageNumber(displayNumber) {
  curentIndex = displayNumber;
  // skjuller alle billeder
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  if (curentIndex > slides.length - 1) {
    curentIndex = 0;
  } else if (curentIndex < 0) {
    curentIndex = slides.length - 1;
  }

  slides[curentIndex].style.display = "flex";
}

displayImageNumber(0);
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

btnNext.addEventListener("click", () => {
  displayImageNumber(curentIndex + 1);
});

btnPrev.addEventListener("click", () => {
  displayImageNumber(curentIndex - 1);
});

/* */

/* */

/* counter / cart "needs fixing" */
let cart = [];

function updateCart() {
  let cartItems = document.getElementById("cartItems");
  let totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    let div = document.createElement("div");

    div.innerHTML = `
      <p>${item.name} - ${item.price} kr</p>
    `;

    cartItems.appendChild(div);

    total += item.price;
  });

  totalPrice.textContent = total;
}

function addToCart(name, price) {
  let product = {
    name: name,
    price: price,
  };

  cart.push(product);

  updateCart();
}
/* */

/* */

/* overlay "need fixing" */

/* open cart/order popup */

document.querySelector(".cart").addEventListener("click", function () {
  document.querySelector(".order").classList.add("show");
  document.querySelector(".overlay").classList.add("show");
});

/* confirm order */

document.getElementById("orderBtn").addEventListener("click", function () {
  document.querySelector(".order").classList.remove("show");
  document.querySelector(".th").classList.add("show");

  cart = [];
  updateCart();
});

/* close overlay */

document.querySelector(".th").addEventListener("click", function () {
  document.querySelector(".overlay").classList.remove("show");
  document.querySelector(".order").classList.remove("show");
  document.querySelector(".th").classList.remove("show");
});

/* opening hours */

let now = new Date();
let hour = now.getHours();

let openText = document.querySelector(".open");
let closedText = document.querySelector(".closed");

if (hour >= 10 && hour < 20) {
  openText.style.display = "block";
} else {
  closedText.style.display = "block";
}
