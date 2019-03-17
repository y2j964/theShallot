// init DOM elements
const reelArticles = document.querySelector(".js-reel-articles");
const reelStoryNav = document.querySelector(".reel-story__nav");
const thumbnail = document.querySelectorAll(".reel-story__thumbnail-item");
const reelStory = document.querySelectorAll(".reel-story");
const lSearchbar = document.querySelector(".l-searchbar");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
const userIcon = document.querySelector(".js-icon-user");
const body = document.querySelector("body");
const jsModals = document.querySelector(".js-modals");
const jsModalMenu = jsModals.querySelector(".js-modal-menu");
const jsModalForm = jsModals.querySelector(".js-modal-form");
const xIcons = document.querySelectorAll(".js-icon-close");
const tabSwitches = document.querySelector(".tab-switches");
const tabUser = tabSwitches.querySelector(".js-icon-user");
const login = document.querySelector(".js-login");
const userName = document.querySelector("#username");
const userNameError = document.querySelector("#js-username-error");
const key = document.querySelector("#key");
const keyError = document.querySelector("#js-key-error");
const modalNav = document.querySelector(".js-modal-nav");



// variables //
let current = 0;
let emailRegex = /\S+@\S+\.\S+/

// EVENTS //

//clicks on hamburger menu
hamburgerMenu.addEventListener("click", expandMenu);

  
// hamburger-menu expand and collapse
function expandMenu() {
  //remove scroll from body
  body.classList.toggle("no-scroll");
  // toggle the display of modal
  // the first modal represents the menu we want, so we'll just return the first we find
  jsModals.querySelector(".l-modal").classList.toggle("l-modal--is-visible"); 
  
  //if menu is open and click on user, (1)toggle is-visible between two modals, (2)remove x from modalForm, and (3)retain header from modalMenu
  
}

lSearchbar.addEventListener("click", expandSearchBar);


//clicks on user icon
userIcon.addEventListener("click", displayModal);

// display and remove modal on icon clicks
function displayModal(){
  //remove scroll from body
  if(!body.classList.contains("no-scroll")){
    body.classList.add("no-scroll");
  }
  
  // if (jsModalMenu.classList.contains("l-modal--is-visible")){
    // jsModalMenu.classList.remove("l-modal--is-visible")
  // }
  
  // toggle the display of modal
  jsModalForm.classList.add("l-modal--is-visible");      
}

// clicks on close icon
jsModals.addEventListener("click", closeModal);


function closeModal(e){    
  const lModal = document.querySelector(".l-modal--is-visible");
  
  if(!e.target.classList.contains("js-icon-close")){
      return
  } 
  
  lModal.classList.remove("l-modal--is-visible");
  body.classList.remove("no-scroll");
}  

tabUser.addEventListener("click", switchModal);

reelStoryNav.addEventListener("mouseover", reelTransition)


//submits on Kinja form
login.addEventListener("submit", function(e){    
  validateForm(userName, userNameError);
  validateForm(key, keyError); 
  
  // prevent form from submitting; no server side code
  e.preventDefault()
})

// FUNCTIONS //

// basic form validation
function validateForm(input, message){
  // if there is no input and the warning currently is hidden, display warning 
  if(!input.value && message.classList.contains("hide")) {
    message.classList.toggle("hide")
    // if warning is displayed but input is updated, hide warning
  } else if (input.value && !message.classList.contains("hide")){
    message.classList.toggle("hide")
  }
}

//clicks on tabSwitches
function switchModal() {
  jsModalMenu.classList.remove("l-modal--is-visible");
  jsModalForm.classList.add("l-modal--is-visible");
}

//search bar expand and collapse
function expandSearchBar(e) {
  if(!e.target.classList.contains("js-searchbar-toggler")){            
    return
  }      
 
  lSearchbar.classList.toggle("l-searchbar--is-expanded");    
}

// hovers on article reel thumbnails

function reelTransition(e){
  // init previously activated item
  const formerActiveThumb = reelStoryNav.querySelector(".reel-story__thumbnail-item--is-active");
  // init previously activated item
  const formerActiveArticle = reelArticles.querySelector(".reel-story--is-active");
  
  // reset formerly active img to default state
  formerActiveThumb.classList.remove("reel-story__thumbnail-item--is-active");      
  // reset formerly active article to default state
  formerActiveArticle.classList.remove("reel-story--is-active");  
  
  // grab alt value of e.target's img
  const currentThumbnailLi = e.target.parentElement;
  const currentThumbnailImg = currentThumbnailLi.querySelector("img");
  const currentThumbnailAlt = currentThumbnailImg.getAttribute("alt");  
  
  // find corresponding article based on img alt
  // pay attention to number of parentElements; if you change markup, you will have to adjust this
  const currentArticle = reelArticles.querySelector("img[alt=" + CSS.escape(currentThumbnailAlt) + "]").parentElement.parentElement.parentElement;
  
  // activate thumbnail and article
  currentThumbnailLi.classList.add("reel-story__thumbnail-item--is-active");
  currentArticle.classList.add('reel-story--is-active');  
}

// autoReel of article reel with setTimeout
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