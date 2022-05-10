const qs = document.querySelector.bind(document); 
const qsa = document.querySelectorAll.bind(document);
// ex:  qs('#myButton');




// Sets class for :root, specifically for switching between light and dark mode
const setTheme = theme => document.documentElement.className = theme;




//  Change rating on book being added or edited
const starsArray = [...document.getElementsByClassName("add-book-star-button")]; 
const starButtons = qs(".add-book-star-button");
const starIconFilled = qs(".add-star-active");
const starIconOutline = qs(".add-star-inactive");

let newBookRating = 0;
let inputisEmpty = true;

function setStarRating(arr) {
        arr.forEach((starButton) => {       /////// use 'forEach'  or  '.map' ?????
            starButton.onclick = () => {
                for (let i = 0; i <= arr.indexOf(starButton); i++) {
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[1];
                    let inactiveStar = currentStarButton.children[0];
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                    newBookRating = i + 1;
                    inactiveStar.classList.remove("star-is-required");
                }
                for (let i = arr.length - 1; i > arr.indexOf(starButton); i--) {
                    let currentStarButton = arr[i];
                    let activeStar = currentStarButton.children[0];
                    let inactiveStar = currentStarButton.children[1];
                    addStarVisibleClass(activeStar);
                    addStarHiddenClass(inactiveStar);
                    activeStar.classList.remove("star-is-required");
                }
                console.log(`${newBookRating} out of 5 stars.`);
            }
        });
}

function addStarVisibleClass(star) {
    star.classList.remove("star-hidden");
    star.classList.add("star-visible");
}
function addStarHiddenClass(star) {
    star.classList.remove("star-visible");
    star.classList.add("star-hidden");
}

starButtons.addEventListener("click", setStarRating(starsArray));


starsArray.forEach((button) => {
    button.disabled = true;
});

const statusDropdown = document.getElementById("status-dropdown");

statusDropdown.addEventListener("change", disableStarButtons);

function disableStarButtons(event) {
    let currentOption = statusDropdown.value;
    let newOption = event.target.value;
    
    if (newOption === "currently-reading" || newOption === "want-to-read" || currentOption === "currently-reading" || currentOption === "want-to-read") {
        starsArray.forEach((button) => {
            button.disabled = true;
            setStarRatingToZero(starsArray);
            button.firstElementChild.classList.remove("star-is-required");
        });
    }
    else {
        currentOption = statusDropdown.value;
        starsArray.forEach((button) => {
            button.disabled = false;
        });
    }
}

function setStarRatingToZero(arr) {
    arr.forEach((star) => {
        if (star.children[1].classList.contains("star-visible")) {
            addStarHiddenClass(star.children[1]);
            addStarVisibleClass(star.children[0]);
        }
    });
    newBookRating = 0;
}

window.onload = () => statusDropdown.value.selected = "want-to-read";




//
const titleInput = document.getElementById("title-input");
const authorFirstNameInput = document.getElementById("author-first-name-input");
const authorLastNameInput = document.getElementById("author-last-name-input");
const pageCountInput = document.getElementById("page-count");
let inputArray = [...document.getElementsByClassName("input-required")];

//
function addInputIsRequiredClass(inputElement) {
    inputElement.classList.add("input-required-alert");
}
function removeInputIsRequiredClass(inputElement) {
    inputElement.classList.remove("input-required-alert");
}

//check if input is empty
function checkIfInputIsEmpty(input) {
    if (input.value === "") {
        inputisEmpty = true;
        addInputIsRequiredClass(input);
    }
    else {
        inputisEmpty = false;
        removeInputIsRequiredClass(input);
    }
}

//check if any input is empty
function checkIfAnyInputIsEmpty(array) {

    array.forEach((input) => {
        checkIfInputIsEmpty(input);
    });
}

//check if first star is filled or not
    //if it isn't then they all get red fill upon clicking 'add book' button
function checkifRequiredStarIsFilled(arr) {
    if ((statusDropdown.value === "read" || statusDropdown.value === "abandoned") && newBookRating == 0) {
        arr.forEach((star) => {
            // star.firstElementChild.style.fill = "rgba(255, 0, 0, 0.5)";
            star.firstElementChild.classList.add("star-is-required");
        });
        inputisEmpty = true;
    }
}

    

//submit button event listener
// const addBookButton = qs(".add-book-button");
// addBookButton.addEventListener("click", () => {
//     checkIfAnyInputIsEmpty(inputArray);
//     checkifRequiredStarIsFilled(starsArray);
//     if (!inputisEmpty) {
//         //and submit book THEN clear
//         clearFormInfo();
//     }

// });


//clear inputs
function clearInputs() {
    inputArray.forEach((input) => input.value = "");
}


//
function clearFormInfo() {
    clearInputs();
    setStarRatingToZero(starsArray);
    // statusDropdown.value = "want-to-read";
}

inputArray.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            removeInputIsRequiredClass(input);
            inputisEmpty = false;
        }
    });
});




//create array of ALL book objects
const allBookObjectsArray = [];
const readBooksArray = [];
const currentlyReadingBooksArray = [];
const abandonedBooksArray = [];
const wantToReadBooksArray = [];


//create book object constructor
function Book(title, firstName, lastName, status, rating, pageCount) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
    this.rating = rating;
    this.pageCount = pageCount;
}

//create new book using input elements' content as object arguments
//      add newly created book object to BOTH 'allBookObjectsArray' and array for its status
//              create actual book row using respective book object info (and assign it a unique data-set value???????) 
//              books section display: flex column, each child (book row) is 100% width
//                      check if row should be displayed based on which filter option is selected
//                              if it should be displayed then first sort the filter array it is in and then display the array


//create book object and add to all books array
function addBookToBookArrays() {
    const newBookObject = new Book(titleInput.value, 
                                    authorFirstNameInput.value, 
                                    authorLastNameInput.value, 
                                    statusDropdown.value, 
                                    newBookRating, 
                                    pageCountInput.value);
    allBookObjectsArray.unshift(newBookObject);
    switch (newBookObject.status) {
        case "read":
            readBooksArray.unshift(newBookObject);
            break;
        case "want-to-read":
            wantToReadBooksArray.unshift(newBookObject);
            break;
        case "currently-reading":
            currentlyReadingBooksArray.unshift(newBookObject);
            break;
        default:
            abandonedBooksArray.unshift(newBookObject);
            break;
    }
}







const addBookButton = qs(".add-book-button");
addBookButton.addEventListener("click", () => {
    checkIfAnyInputIsEmpty(inputArray);
    checkifRequiredStarIsFilled(starsArray);
    if (!inputisEmpty) {
        //submit book THEN clear
        addBookToBookArrays();
        // console.log(allBookObjectsArray[allBookObjectsArray.length - 1]);
        // console.log(wantToReadBooksArray);

        clearFormInfo();
    }

});













//  Adds/Removes css classes that open/close menu
const menuButton = qs(".menu-button");
const menuIcon = qs(".menu-icon");
const mobileSidebar = qs(".sidebar-menu-container");

menuButton.addEventListener("click", () => {
    (menuIcon.classList.contains("open-menu")) ? openMenu() : closeMenu();
    console.log(menuIcon.classList);
});

function openMenu() {
    menuIcon.classList.add("close-menu");
    menuIcon.classList.remove("open-menu");
    mobileSidebar.classList.add("show-menu");
    mobileSidebar.classList.remove("hide-menu");
}

function closeMenu() {
    menuIcon.classList.add("open-menu");
    menuIcon.classList.remove("close-menu");
    mobileSidebar.classList.add("hide-menu");
    mobileSidebar.classList.remove("show-menu");
}




//  Rotating sort normal/reverse icon on click
const sortNormalReverseButton = qs(".sort-normal-reverse-button");
const sortNormalReverseIcon = qs(".sort-normal-reverse-icon");

sortNormalReverseButton.addEventListener("click", () => {
    (sortNormalReverseIcon.classList.contains("sort-normal")) ? setSortingIconToReverseOrder() : setSortingIconToNormalOrder();
});

function setSortingIconToNormalOrder() {
    if (sortNormalReverseIcon.classList.contains("sort-reverse")) {
        sortNormalReverseIcon.classList.remove("sort-reverse");
    }
    sortNormalReverseIcon.classList.add("sort-normal");
}

function setSortingIconToReverseOrder() {
    if (sortNormalReverseIcon.classList.contains("sort-normal")) {
        sortNormalReverseIcon.classList.remove("sort-normal");
    }
    sortNormalReverseIcon.classList.add("sort-reverse");
}