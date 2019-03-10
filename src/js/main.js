// init DOM elements
let reelStory = document.querySelectorAll(".reel-story");
let thumbnail = document.querySelectorAll(".reel-story__thumbnail-item");
let magnifyingGlass = document.querySelector(".js-magnifying-glass");
let hamburgerMenu = document.querySelector(".js-hamburger-menu");
let userIcon = document.querySelector(".js-icon-user");
let body = document.querySelector("body");
let xIcon = document.querySelector(".icon-close");
let modal = document.querySelector(".modal-j-wrapper");
let login = document.querySelector(".js-login");
let userName = document.querySelector("#username");
let userNameError = document.querySelector("#js-username-error");
let key = document.querySelector("#key");
let keyError = document.querySelector("#js-key-error");

// variables
let current = 0;
let emailRegex = /\S+@\S+\.\S+/
// events 

//functions 


// basic form validation


login.addEventListener("submit", function(e){
  // validateForm(userName, userNameError);
  // validateForm(key, keyError);
  
  if (!userName.value && userNameError.classList.contains("hide")) {
    userNameError.classList.toggle("hide")          
  } else if(userName.value && !userNameError.classList.contains("hide")){
    userNameError.classList.toggle("hide")}
  
  if (!key.value && keyError.classList.contains("hide")) {
    keyError.classList.toggle("hide")
  } else if(key.value && !keyError.classList.contains("hide")) {
    keyError.classList.toggle("hide")
  }   
  
  // prevent form from submitting; no server side code
  e.preventDefault()
})

//search bar expand and collapse

function displaySearchBar() {
  alert("clicked");
}
magnifyingGlass.addEventListener("click", displaySearchBar);



// display and remove modal on icon clicks

function toggleModal(){
  //remove scroll from body
  body.classList.toggle("no-scroll");
  // toggle the display of modal
  modal.classList.toggle("modal-j-wrapper--is-active"); 
}

userIcon.addEventListener("click", toggleModal);
xIcon.addEventListener("click", toggleModal);


// hamburger-menu expand and collapse

function expandMenu() {
  alert("clicked");
}

hamburgerMenu.addEventListener("click", expandMenu);



for (let i= 0; i < thumbnail.length; i++) {
  thumbnail[i].addEventListener("mouseover", e => {
    reset();
    current = i;   
    reelInit();
  })  
}

function reset() {
  for (let i= 0; i < reelStory.length; i++) {
    reelStory[i].classList.remove("reel-story--is-active")
    thumbnail[i].classList.remove("reel-story__thumbnail-item--is-active")
  }
}

function reelInit(){
  reset();
  reelStory[current].classList.add("reel-story--is-active");
  thumbnail[current].classList.add("reel-story__thumbnail-item--is-active");
}

// reelInit();

// autoReel with setTimeout

function autoReel(){
  reset();
  reelInit();
  if(current < thumbnail.length - 1 ) {
    current++;
  } else {
    current = 0;
  }
  setTimeout(autoReel, 4000)
}

// window.onload = autoReel();