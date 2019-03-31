// init DOM elements
const reelArticles = document.querySelector('.js-reel-articles');
const reelStoryNav = document.querySelector('.reel-story__nav');
const thumbnail = document.querySelectorAll('.reel-story__thumbnail-item');
const reelStory = document.querySelectorAll('.reel-story');
const lSearchbar = document.querySelector('.l-searchbar');
const topNav = document.querySelector('.top-nav');
const [hamburgerMenu, hamburgerMenu2]  = document.querySelectorAll('.js-hamburger-menu');
const userIcon = document.querySelector('.js-icon-user');
const body = document.querySelector('body');
const dropdownNav = document.getElementById('dropdown-nav');
const jsModals = document.querySelector('.js-modals');
const lModals = document.querySelectorAll('.l-modal');
const jsModalMenu = jsModals.querySelector('.js-modal-menu');
const jsModalForm = jsModals.querySelector('.js-modal-form');
const xIcons = document.querySelectorAll('.js-icon-close');
const kinjaCloseIcon = document.querySelector('.js-icon-close-kinja');
const tabSwitches = document.querySelector('.tab-switches');
const tabSwitchButtons = Array.from(tabSwitches.querySelectorAll('button'));
const [homeSwitch, userSwitch] = tabSwitches.querySelectorAll('.js-tab-switch');
const newsletterForm = document.querySelector('.newsletter__form');
const login = document.querySelector('.js-login');
const userName = document.getElementById('username');
const userNameError = document.getElementById('js-username-error');
const key = document.getElementById('key');
const keyError = document.getElementById('js-key-error');
const modalNav = document.querySelector('.js-modal-nav');
// const pageHeight = document.body || document.documentElement;
const navbarScroll = document.querySelector('.l-navbar-scroll');
const vh = window.innerHeight || document.documentElement.clientHeight;
// value will always be the same; piped to support different browsers
const scrollBottomTrigger = document.querySelector('input[name="emailAddress"]')
const scrollTopBound = document.getElementById('js-scroll-top');
const scrollButton = document.getElementById('js-scroll-button');
const lLogoFixed = document.querySelector('.l-logo-fixed');
const logoHeading = document.querySelector('.l-logo h1');

let previousActiveEl;   
const current = 0;
const emailRegex = /\S+@\S+\.\S+/;

// boolean states
let dropdownTogglePressed = false;
let dropdownToggleHovered = false;
let modalFirstFocused = false;

// FUNCTIONS //

function displayDropdown(e) {  
  // only act on btn
  if (!e.target.classList.contains('top-nav__toggle-btn')) {
    return
  }
  // climb to top-nav__item parent
  let topNavItem = e.target.closest('.top-nav__item');  
  // toggle aria-expanded
  topNavItem.getAttribute('aria-expanded') === 'false'
    ? topNavItem.setAttribute('aria-expanded', 'true') 
    : topNavItem.setAttribute('aria-expanded', 'false')
  // toggle dropdown display
  let dropdown = topNavItem.querySelector('.dropdown');
  dropdown.classList.toggle('dropdown--is-visible');
  // toggle button pressed boolean 
  if (!dropdownTogglePressed) {
    dropdownTogglePressed = true;
  } else {
    dropdownTogglePressed = false;
  }
  // delineate searchbar
  // if mouse is not hovering over item (i.e. if down via focus), toggle it
  if (!dropdownToggleHovered) {    
    lSearchbar.classList.toggle('l-searchbar--is-delineated'); 
  } else {
    // if you are hovering, let mouseover handle delineation, and do nothing
    return
  }  
}  
// engage on press if not already engaged via hover; disengage on press if not hoverd; 
// 
function delineateSearchbar() {
  dropdownToggleHovered === true ? dropdownToggleHovered = false : dropdownToggleHovered = true;
  // toggle on hover out if dropdown not displayed
  if (!dropdownTogglePressed) {
    lSearchbar.classList.toggle('l-searchbar--is-delineated');    
  }
}

function scrollToTop() {  
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
  window.scroll({
    top: 0,    
  })
  // tell screen reader where we currently are 
  logoHeading.focus();
}

function deployScrollNav() {   
  // dynamically grab new top position of scrollBottomTrigger
  const scrollBottomTriggerTop = scrollBottomTrigger.getBoundingClientRect().top;
  // detect if topLeft of trigger el is onscreen
  // has to be between 0 and the height of the viewport
  if (scrollBottomTriggerTop > 0 && scrollBottomTriggerTop <= vh) {
    // add navbar and tell screen readers it is visible
    navbarScroll.classList.add('l-navbar-scroll--is-visible');
    lLogoFixed.classList.add('l-logo-fixed--is-visible');
    navbarScroll.setAttribute('aria-hidden', 'false');    
  }
  if (navbarScroll.classList.contains('l-navbar-scroll--is-visible')) {
    // dynamically grab new top position of scrollTopBound
    const scrollTopBoundTop = scrollTopBound.getBoundingClientRect().top;
    if (scrollTopBoundTop > 0) {      
    // remove navbar and tell screen readers it is no longer visible
      navbarScroll.classList.remove('l-navbar-scroll--is-visible');      
      lLogoFixed.classList.remove('l-logo-fixed--is-visible');
      navbarScroll.setAttribute('aria-hidden', 'true');      
    }
  }
}

function updateAriaCheckbox(e) {  
  // toggle aria-checked state
  if (e.target.classList.contains('checkbox')) {    
    e.target.getAttribute('aria-checked') === 'true'
      ? e.target.setAttribute('aria-checked','false')
      : e.target.setAttribute('aria-checked','true');
  }  
}

function modalTrapFocus(modalEl) {        
  let modalFocusableEls;
  let focusableEls;
  // find active modal
  if (jsModalMenu.classList.contains('l-modal--is-visible')) {
     modalFocusableEls = Array.from(jsModalMenu.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'));
  } else if (jsModalForm.classList.contains('l-modal--is-visible')) {
    modalFocusableEls = Array.from(jsModalForm.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'));
  }
  //if tabSwitch header is visible, concat active modal links to the fixed header (sibling element);       
  if (tabSwitches.classList.contains('tab-switches--is-visible')) { 
    focusableEls = tabSwitchButtons.concat(modalFocusableEls);
    // else just preserve active modal links
  } else {
    focusableEls = modalFocusableEls;
  }
  // find first and last focusable el in modal  
  let firstFocusableEl = focusableEls[0];  
  let lastFocusableEl = focusableEls[focusableEls.length - 1];    
  //  focus first el only on initial open; reset state back to false when modal is closed  
  if (!modalFirstFocused) {
    // delay to allow modal to display, then focus
    setTimeout(function (){
      firstFocusableEl.focus();
      }, 100);      
  }
  // change firstFocused state true so that it doesn't refocus when toggling modals
    modalFirstFocused = true
  // disregard non tab key events
  modalEl.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') {      
      return      
    }    
    // if tab + shift
    if (e.shiftKey) {            
      if (document.activeElement === firstFocusableEl) {             
        lastFocusableEl.focus();                
        e.preventDefault();
      }  
    } 
    // if just tab
    else {            
      if (document.activeElement === lastFocusableEl) {                
        firstFocusableEl.focus();        
        e.preventDefault();
      }
    }
  });
}

// hamburger-menu expand and collapse
function expandModalMenu() {
  // store previous active element so it is on focus when user exits modal
  previousActiveEl = document.activeElement;
  // remove scroll from body
  body.classList.toggle('no-scroll');
  // toggle the display of modal  
  jsModalMenu.classList.toggle('l-modal--is-visible');
  // display fixed header for modal
  tabSwitches.classList.add('tab-switches--is-visible');
  // remove default x icon in jsModalForm; it is supplied by fixed header in this instance
  kinjaCloseIcon.classList.add('icon-close--is-hidden');  
  modalTrapFocus(jsModals);
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

// display and remove modal on icon clicks outside of hamburger toggler
function displayModalForm() {
  // remove scroll from body
  if (!body.classList.contains('no-scroll')) {
    body.classList.add('no-scroll');
  }  
  // display modal
  jsModalForm.classList.add('l-modal--is-visible');  
  // focus-trap
  modalTrapFocus(jsModalForm);
}

function closeModal(e) {  
  const lModal = document.querySelector('.l-modal--is-visible');  
  // disappear the l-modal and the tabSwitch container
  lModal.classList.remove('l-modal--is-visible');
  tabSwitches.classList.remove('tab-switches--is-visible');  
  // restore regular close icon to Kinja in case accessed through icon-user on home page
  kinjaCloseIcon.classList.remove('icon-close--is-hidden');
  // restore scroll to body
  body.classList.remove('no-scroll');  
  // revert back to homeSwitch in the event that you close when the userSwitch is active
  if (!homeSwitch.classList.contains('tab-switches__item--is-active')) {
    homeSwitch.classList.add('tab-switches__item--is-active');
    homeSwitch.setAttribute('aria-pressed', 'true');
    userSwitch.classList.remove('tab-switches__item--is-active');
    userSwitch.setAttribute('aria-pressed', 'false');
    // remove the offset; no need when viewed via user icon
    jsModalForm.classList.remove('l-modal--top-offset'); 
  }
  // set first el focus state back to false
  modalFirstFocused = false;
  // put focus on pre-modal state
  previousActiveEl.focus();
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
      // update aria-pressed
      activeTab.setAttribute('aria-pressed', 'false');
      // add active background color on newly activated tab
      e.target.classList.add('tab-switches__item--is-active');
      e.target.setAttribute('aria-pressed', 'true');
      // switch modals
      jsModalMenu.classList.toggle('l-modal--is-visible');
      jsModalForm.classList.toggle('l-modal--is-visible'); 
      jsModalForm.classList.toggle('l-modal--top-offset'); 
      
    }  
  }
  // update focusable elements
  modalTrapFocus(jsModals);
}

// search bar expand and collapse
function expandSearchBar(e) {
  if (!e.target.classList.contains('js-searchbar-toggler')) {
    return;
  }  
  lSearchbar.classList.toggle('l-searchbar--is-expanded');
  // if dropdown menu is visible when magnifying glass is clicked, disappear it
  let dropdown = topNav.querySelector('.dropdown--is-visible');
  if (dropdown) {   
    dropdown.classList.remove('dropdown--is-visible');
  }
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

// hovers over first top nav item
topNav.querySelector('.top-nav__item').addEventListener('mouseover', delineateSearchbar);
topNav.querySelector('.top-nav__item').addEventListener('mouseout', delineateSearchbar);

// clicks on hamburger menu
hamburgerMenu.addEventListener('click', expandModalMenu);
hamburgerMenu2.addEventListener('click', expandModalMenu);

// update aria-expanded on dropdown menu
topNav.addEventListener('click', displayDropdown);

// clicks on magnifying glass and x
lSearchbar.addEventListener('click', expandSearchBar);

// clicks on checkbox
newsletterForm.addEventListener("click", updateAriaCheckbox);

// clicks on user icon
userIcon.addEventListener('click', displayModalForm);

// clicks on close icon
jsModals.addEventListener('click', function(e) {
  if (!e.target.classList.contains('js-icon-close')) {
    return;
  }
  closeModal(e);
})

// close modal on esc press
jsModals.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {    
    // console.log("standing in the window");
    closeModal();
  }
})

// clicks on tab-switches
tabSwitches.addEventListener('click', switchModal);

// mouse over reel article thumbnails
reelStoryNav.addEventListener('mouseover', reelTransition);
reelStoryNav.addEventListener('focusin', reelTransition);
reelStoryNav.addEventListener('focusout', reelTransition);

// submits on Kinja form
login.addEventListener('submit', validateForm);

// deploy navbar if scrolled to the email subscribe input
window.addEventListener('scroll', deployScrollNav);
// auto-scroll to top of page on click of up arrow
scrollButton.addEventListener('click', scrollToTop);

// window.onload = autoReel();
