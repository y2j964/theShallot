// init DOM elements
const reelArticles = document.querySelector('.js-reel-articles');
const reelStoryNav = document.querySelector('.reel-story__nav');
const thumbnail = document.querySelectorAll('.reel-story__thumbnail-item');
const reelStory = document.querySelectorAll('.reel-story');
const lSearchbar = document.querySelector('.l-searchbar');
const hamburgerMenu = document.querySelector('.js-hamburger-menu');
const userIcon = document.querySelector('.js-icon-user');
const body = document.querySelector('body');
const jsModals = document.querySelector('.js-modals');
const jsModalMenu = jsModals.querySelector('.js-modal-menu');
const jsModalForm = jsModals.querySelector('.js-modal-form');
const xIcons = document.querySelectorAll('.js-icon-close');
const kinjaCloseIcon = document.querySelector('.js-icon-close-kinja');
const tabSwitches = document.querySelector('.tab-switches');
const [homeSwitch, userSwitch] = tabSwitches.querySelectorAll('.js-home-switch');
// const userSwitch = tabSwitches.querySelector('.js-user-switch');
// const tabUser = tabSwitches.querySelector('.js-icon-user');
const login = document.querySelector('.js-login');
const userName = document.querySelector('#username');
const userNameError = document.querySelector('#js-username-error');
const key = document.querySelector('#key');
const keyError = document.querySelector('#js-key-error');
const modalNav = document.querySelector('.js-modal-nav');

// variables //
const current = 0;
const emailRegex = /\S+@\S+\.\S+/;

// FUNCTIONS //

// hamburger-menu expand and collapse
function expandMenu() {
  // remove scroll from body
  body.classList.toggle('no-scroll');
  // toggle the display of modal
  // the first modal represents the menu we want, so we'll just return the first we find
  jsModals.querySelector('.l-modal').classList.toggle('l-modal--is-visible');
  tabSwitches.classList.add('tab-switches--is-visible');
  kinjaCloseIcon.classList.add('icon-close--is-hidden');
  // if menu is open and click on user, (1)toggle is-visible between two modals, (
  // 2)remove x from modalForm, and (3)retain header from modalMenu
}

// validate fields in Kinja form
function validateField(input, message) {
  // if there is no input and the warning currently is hidden, display warning
  if (!input.value && message.classList.contains('hide')) {
    message.classList.toggle('hide');
    // if warning is displayed but input is updated, hide warning
  } else if (input.value && !message.classList.contains('hide')) {
    message.classList.toggle('hide');
  }
}

// basic form validation
function validateForm(e) {
  validateField(userName, userNameError);
  validateField(key, keyError);

  // prevent form from submitting; no server side code
  e.preventDefault();
}

// display and remove modal on icon clicks
function displayModal() {
  // remove scroll from body
  if (!body.classList.contains('no-scroll')) {
    body.classList.add('no-scroll');
  }

  // if (jsModalMenu.classList.contains("l-modal--is-visible")){
    // jsModalMenu.classList.remove("l-modal--is-visible")
  // }

  // display modal
  jsModalForm.classList.add('l-modal--is-visible');
}

function closeModal(e) {
  const lModal = document.querySelector('.l-modal--is-visible');

  if (!e.target.classList.contains('js-icon-close')) {
    return;
  }

  lModal.classList.remove('l-modal--is-visible');
  tabSwitches.classList.remove('tab-switches--is-visible');
  kinjaCloseIcon.classList.remove('icon-close--is-hidden');
  body.classList.remove('no-scroll');
}

// clicks on tabSwitches
function switchModal(e) {
  if (e.target.classList.contains('tab-switches__item')) {    
    // only change if not currently active
     if (!e.target.classList.contains('tab-switches__item--is-active')) {      
      // grab activeTab (there can only be one activeTab at a time)
      const activeTab = tabSwitches.querySelector('.tab-switches__item--is-active');
      // remove active state from activeTab
      activeTab.classList.remove('tab-switches__item--is-active');
      // add active background color on newly activated tab
      e.target.classList.add('tab-switches__item--is-active');
      // switch modals
      jsModalMenu.classList.toggle('l-modal--is-visible');
      jsModalForm.classList.toggle('l-modal--is-visible'); 
    }  
  }
}

// search bar expand and collapse
function expandSearchBar(e) {
  if (!e.target.classList.contains('js-searchbar-toggler')) {
    return;
  }

  lSearchbar.classList.toggle('l-searchbar--is-expanded');
}

// hovers on article reel thumbnails

function reelTransition(e) {
  // init previously activated item
  const formerActiveThumb = reelStoryNav.querySelector('.reel-story__thumbnail-item--is-active');
  // init previously activated item
  const formerActiveArticle = reelArticles.querySelector('.reel-story--is-active');

  // reset formerly active img to default state
  formerActiveThumb.classList.remove('reel-story__thumbnail-item--is-active');
  // reset formerly active article to default state
  formerActiveArticle.classList.remove('reel-story--is-active');

  // grab alt value of e.target's img
  const currentThumbnailLi = e.target.parentElement;
  const currentThumbnailImg = currentThumbnailLi.querySelector('img');
  const currentThumbnailAlt = currentThumbnailImg.getAttribute('alt');

  // find corresponding article based on img alt, and climb to ancestor reel-story
  const currentArticle = reelArticles.querySelector(`img[alt="${currentThumbnailAlt}"]`).closest('.reel-story');

  // activate thumbnail and article
  currentThumbnailLi.classList.add('reel-story__thumbnail-item--is-active');
  currentArticle.classList.add('reel-story--is-active');
}

// autoReel of article reel with setTimeout
// function autoReel(){
  // reset();
  // reelInit();
  // if(current < thumbnail.length - 1 ) {
    // current++;
  // } else {
    // current = 0;
  // }
  // setTimeout(autoReel, 4000);
// }

// EVENTS //

// clicks on hamburger menu
hamburgerMenu.addEventListener('click', expandMenu);

lSearchbar.addEventListener('click', expandSearchBar);

// clicks on user icon
userIcon.addEventListener('click', displayModal);

// clicks on close icon
jsModals.addEventListener('click', closeModal);

tabSwitches.addEventListener('click', switchModal);

reelStoryNav.addEventListener('mouseover', reelTransition);

// submits on Kinja form
login.addEventListener('submit', validateForm);

// window.onload = autoReel();
