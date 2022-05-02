// Sets class for :root, specifically for switching between light and dark mode
const setTheme = theme => document.documentElement.className = theme;


// Change star rating based on user input
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

// printRatingResult(ratingResult);

function executeRating(stars, result) {
   const starClassActive = "rating__star fas fa-star";
   const starClassUnactive = "rating__star far fa-star";
   const starsLength = stars.length;
   let i;
   stars.map((star) => {
      star.onclick = () => {
         i = stars.indexOf(star);

         if (star.className.indexOf(starClassUnactive) !== -1) {
            // printRatingResult(result, i + 1);
            for (i; i >= 0; --i) stars[i].className = starClassActive;
         } 
         else {
            // printRatingResult(result, i);
            for (i; i < starsLength; ++i) stars[i+1].className = starClassUnactive;
         }
      };
   });
}

function printRatingResult(result, num = 0) {
   result.textContent = `${num}/5`;
}

executeRating(ratingStars, ratingResult);
// Uncaught TypeError: stars[(i + 1)] is undefined
// onclick http://127.0.0.1:5500/app.js:26
// executeRating http://127.0.0.1:5500/app.js:17
// executeRating http://127.0.0.1:5500/app.js:16
// <anonymous> http://127.0.0.1:5500/app.js:36









///////////
const menuButton = document.querySelector(".open-close-button");

menuButton.addEventListener("click", () => {
    (menuButton.classList.contains("open")) ? openMenu() : closeMenu();
    console.log(menuButton.classList);
});

function openMenu() {
    menuButton.classList.add("close");
    menuButton.classList.remove("open");
}

function closeMenu() {
    menuButton.classList.add("open");
    menuButton.classList.remove("close");
}