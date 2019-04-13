// init DOM elements for event listeners
const reelStoryNav = document.querySelector('.reel-story__nav');
const topNavList = document.querySelector('.top-nav__list');
const searchbar = document.querySelector('.searchbar');
const topNav = document.querySelector('.top-nav');
const [hamburgerMenu, hamburgerMenu2] = document.querySelectorAll(
  '.js-hamburger-menu',
);
const userIcon = document.querySelector('.js-icon-user');
const jsModals = document.querySelector('.js-modals');
const tabSwitches = document.querySelector('.tab-switches');
const newsletter = document.querySelector('.newsletter');
const login = document.querySelector('.js-login');
const scrollButton = document.getElementById('js-scroll-button');

// FUNCTIONS //

function updateAriaCheckbox(e) {
  // toggle aria-checked state
  if (!e.target.classList.contains('checkbox')) {
    return;
  }
  if (e.target.getAttribute('aria-checked') === 'true') {
    e.target.setAttribute('aria-checked', 'false');
  } else {
    e.target.setAttribute('aria-checked', 'true');
  }
}

function updateAriaExpanded(e, parentContainer) {
  if (!e.target.hasAttribute('aria-expanded')) {
    const ariaExpandedEl = parentContainer.querySelector('[aria-expanded="true"]');
    ariaExpandedEl.setAttribute('aria-expanded', 'false');
    return;
  }
  if (e.target.getAttribute('aria-expanded') === 'false') {
    e.target.setAttribute('aria-expanded', 'true');
  } else {
    e.target.setAttribute('aria-expanded', 'false');
  }
}

const dropdown = (function dropdownScope() {
  let openedDropdown;
  let dropdownParentIsHovered = false;

  function toggleDropdown(e) {
    // only act on btn
    if (!e.target.classList.contains('top-nav__toggle-btn')) {
      return;
    }
    // if there is an open dropdown already, close it and updateAriaExpanded
    // toggle aria-expanded
    updateAriaExpanded(e);
    // toggle dropdown display
    const topNavItem = e.target.closest('.top-nav__item');
    const dropdownContainer = topNavItem.querySelector('.dropdown');
    dropdownContainer.classList.toggle('dropdown--is-visible');
    // check if dropdown is open and store in  variable
    openedDropdown = topNavList.querySelector('.dropdown--is-visible');
    // delineate searchbar
    // if mouse is not hovering over item (i.e. if down via focus), toggle delineation
    if (!dropdownParentIsHovered) {
      searchbar.classList.toggle('searchbar--is-delineated');
    }
  }
  // remove dropdown when tab focus is outside of it
  function focusOutDropdown(e) {
    if (!openedDropdown || openedDropdown.parentElement.contains(e.target)) {
      return;
    }
    // if dropdown is visible and e.target is not within
    // the element containing the dropdown (and, by extension, the dropdown menu)
    updateAriaExpanded(e, topNavList);
    // toggle dropdown display
    openedDropdown.classList.remove('dropdown--is-visible');
    if (!dropdownParentIsHovered) {
      searchbar.classList.toggle('searchbar--is-delineated');
    }
  }
  // add border to searchbar
  function delineateSearchbar() {
    // engage on press if not already engaged via hover; disengage on press if not hovered;
    if (dropdownParentIsHovered === true) {
      dropdownParentIsHovered = false;
    } else {
      dropdownParentIsHovered = true;
    }
    // toggle on hover out if dropdown not displayed
    if (!openedDropdown) {
      // if button isn't pressed (i.e. if dropdown menu isn't visible
      searchbar.classList.toggle('searchbar--is-delineated');
    }
  }
  return {
    toggle: toggleDropdown,
    focusOut: focusOutDropdown,
    delineate: delineateSearchbar,
  };
}());

const scrollToTop = (function scrollToTopScope() {
  const lFlag = document.querySelector('.l-flag h1');
  return () => {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    window.scroll({
      top: 0,
    });
    // tell screen reader where we currently are
    lFlag.focus();
  };
}());

const deployScrollNav = (function deployScrollNavScope() {
  const lLogoFixed = document.querySelector('.navbar-mobile');
  const scrollTopBoundaryAbsolute = document.getElementById('js-scroll-top');
  const scrollBottomBoundaryAbsolute = document.querySelector(
    'input[name="emailAddress"]',
  );
  const navbarScroll = document.querySelector('.l-navbar-scroll');
  const vh = window.innerHeight || document.documentElement.clientHeight;
  // value will always be the same; piped to support different browsers
  return () => {
    // dynamically grab new top position of scrollBottomTrigger
    const scrollBottomBoundaryrRelative = scrollBottomBoundaryAbsolute.getBoundingClientRect()
      .top;
    // detect if topLeft of trigger el is onscreen
    // has to be between 0 and the height of the viewport
    if (scrollBottomBoundaryrRelative > 0 && scrollBottomBoundaryrRelative <= vh) {
      // add navbar and tell screen readers it is visible
      navbarScroll.classList.add('l-navbar-scroll--is-visible');
      lLogoFixed.classList.add('navbar-mobile--is-visible');
      navbarScroll.setAttribute('aria-hidden', 'false');
    }
    if (!navbarScroll.classList.contains('l-navbar-scroll--is-visible')) {
      return;
    }
    // dynamically grab new top position of scrollTopBoundary
    const scrollTopBoundaryRelative = scrollTopBoundaryAbsolute.getBoundingClientRect().top;
    if (scrollTopBoundaryRelative > 0) {
      // remove navbar and tell screen readers it is no longer visible
      navbarScroll.classList.remove('l-navbar-scroll--is-visible');
      lLogoFixed.classList.remove('navbar-mobile--is-visible');
      navbarScroll.setAttribute('aria-hidden', 'true');
    }
  };
}());

const modal = (function modalScope() {
  const tabSwitchButtons = Array.from(tabSwitches.querySelectorAll('button'));
  const [homeSwitch, userSwitch] = tabSwitches.querySelectorAll('.js-tab-switch');
  const jsModalMenu = jsModals.querySelector('.js-modal-menu');
  const jsModalForm = jsModals.querySelector('.js-modal-form');
  const kinjaCloseIcon = document.querySelector('.js-icon-close-kinja');
  const body = document.querySelector('body');
  let previousActiveEl;
  let modalFirstFocused = false;

  function modalTrapFocus(modalEl) {
    let modalFocusableEls;
    let focusableEls;
    // store previous active element so it is on focus when user exits modal
    previousActiveEl = document.activeElement;
    // find active modal
    if (jsModalMenu.classList.contains('l-modal--is-visible')) {
      modalFocusableEls = Array.from(
        jsModalMenu.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
        ),
      );
    } else if (jsModalForm.classList.contains('l-modal--is-visible')) {
      modalFocusableEls = Array.from(
        jsModalForm.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
        ),
      );
    }
    // if tabSwitch header is visible,
    // concat active modal links to the fixed header (sibling element);
    if (tabSwitches.classList.contains('tab-switches--is-visible')) {
      focusableEls = tabSwitchButtons.concat(modalFocusableEls);
      // else just preserve active modal links
    } else {
      focusableEls = modalFocusableEls;
    }
    // find first and last focusable el in modal
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    //  focus first el only on initial open; reset state back to false when modal is closed
    if (!modalFirstFocused) {
      // delay to allow modal to display, then focus
      setTimeout(() => {
        firstFocusableEl.focus();
      }, 100);
    }
    // change firstFocused state true so that it doesn't refocus when toggling modals
    modalFirstFocused = true;
    // disregard non tab key events
    modalEl.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') {
        return;
      }
      // if tab + shift
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastFocusableEl) {
        // if just tab press and at end of focusable els . . .
        firstFocusableEl.focus();
        e.preventDefault();
      }
    });
  }

  // hamburger-menu expand and collapse
  function displayModalMenu() {
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

  // clicks on tabSwitches
  function switchModal(e) {
    if (!e.target.classList.contains('tab-switches__item')) {
      // only change if not currently active
      return;
    }
    if (!e.target.classList.contains('tab-switches__item--is-active')) {
      // grab activeTab (there can only be one activeTab at a time)
      const activeTab = tabSwitches.querySelector(
        '.tab-switches__item--is-active',
      );
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
    // update focusable elements
    modalTrapFocus(jsModals);
  }

  function closeModal() {
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
  return {
    trapFocus: modalTrapFocus,
    displayMenu: displayModalMenu,
    displayForm: displayModalForm,
    switch: switchModal,
    close: closeModal,
  };
}());

function stopSubmission(e) {
  e.preventDefault();
}

// validate fields in Kinja form
function validateField(input, message, warningId) {
  // if there is no input and the warning currently is hidden, display warning
  if (!input.value && message.classList.contains('hide')) {
    message.classList.remove('hide');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', warningId);

    input.focus();
    // if warning is displayed but input is updated, hide warning
  } else if (input.value && !message.classList.contains('hide')) {
    message.classList.add('hide');
    input.setAttribute('aria-invalid', 'false');
    input.removeAttribute('aria-describedby');
  }
}

// basic form validation
const validateForm = (function validateFormScope() {
  const userName = document.getElementById('username');
  const userNameError = document.getElementById('js-username-error');
  const key = document.getElementById('key');
  const keyError = document.getElementById('js-key-error');

  return (e) => {
    validateField(userName, userNameError, 'js-username-error');
    validateField(key, keyError, 'js-key-error');

    // prevent form from submitting; no server side code
    e.preventDefault();
  };
}());

const toggleSearchBar = (function toggleSearchBarScope() {
  const svgToggler = searchbar.querySelector('.js-searchbar-svg');
  const svgUse = svgToggler.querySelector('use');
  return (e) => {
    if (!e.target.classList.contains('js-searchbar-toggler')) {
      return;
    }
    if (svgToggler.classList.contains('icon-search')) {
      svgToggler.classList.remove('icon-search');
      svgToggler.classList.add(
        'icon-close',
        'icon-close--sm',
        'icon-close--grey',
      );
      svgUse.setAttribute('href', '#icon-close');
    } else {
      svgToggler.classList.remove(
        'icon-close',
        'icon-close--sm',
        'icon-close--grey',
      );
      svgToggler.classList.add('icon-search');
      svgUse.setAttribute('href', '#icon-search');
    }
    searchbar.classList.toggle('searchbar--is-expanded');
    updateAriaExpanded(e);
    // there is an overlay obscuring the menu items,
    // but it still shows in some contexts, so disappear it
    topNavList.classList.toggle('top-nav__list--is-hidden');
    // if dropdown menu is visible when magnifying glass is clicked, disappear it
    const dropdownContainer = topNav.querySelector('.dropdown--is-visible');
    if (dropdownContainer) {
      dropdownContainer.classList.remove('dropdown--is-visible');
    }
  };
}());

const reelTransition = (function reelTransitionScope() {
  const reelArticles = document.querySelector('.js-reel-articles');
  const thumbnails = document.querySelectorAll('.reel-story__thumbnail-item');
  const reelStories = document.querySelectorAll('.reel-story');
  const progressBarFills = document.querySelectorAll('.j-progress-bar__fill');
  const delay = 5000;
  let current = 0;
  let previousActiveThumbnail;
  let previousActiveArticle;
  let timeout;
  let start;
  let remaining;
  let formerActiveThumb;
  let formerActiveArticle;
  let currentThumbnailLi;
  let currentArticle;
  let tickingProgressFill;

  // setTimeout triggered article reel
  function autoReel() {
    // remaining time is initially the same as the delay duration
    remaining = delay;
    // grab start time for when you pause timeout
    start = Date.now();
    // if not the first function call from onload
    if (previousActiveThumbnail) {
      // remove active classes from previous elements
      previousActiveThumbnail.classList.remove(
        'reel-story__thumbnail-item--is-active',
      );
      previousActiveArticle.classList.remove('reel-story--is-active');
      // if you are at the end of the loop
      if (previousActiveThumbnail === thumbnails[thumbnails.length - 1]) {
        for (let i = 0; i < progressBarFills.length; i += 1) {
          // reset all the fills back to 0
          progressBarFills[i].classList.remove(
            'j-progress-bar__fill--is-active',
          );
          // void offsetWidth in order to restart animation
          // eslint-disable-next-line no-void
          void progressBarFills[i].offsetWidth;
        }
      }
    }
    // add active classes to current elements
    thumbnails[current].classList.add('reel-story__thumbnail-item--is-active');
    reelStories[current].classList.add('reel-story--is-active');
    progressBarFills[current].classList.add('j-progress-bar__fill--is-active');
    // store previous active elements
    previousActiveThumbnail = thumbnails[current];
    previousActiveArticle = reelStories[current];
    tickingProgressFill = progressBarFills[current];
    // if at end of loop, start again from 0; else iterate
    if (current === thumbnails.length - 1) {
      current = 0;
    } else {
      current += 1;
    }
    // run the timeout; delay time is set equal to the time specified
    // in j-progress-bar__fill--is-active animation property
    timeout = setTimeout(autoReel, delay);
  }

  // transition article via hover
  function pauseTimer(e) {
    // pause the css animation on the fill
    tickingProgressFill.classList.add('j-progress-bar__fill--is-paused');
    if (timeout) {
      window.clearTimeout(timeout);
    }
    remaining -= Date.now() - start;
    // init previously activated item
    formerActiveThumb = reelStoryNav.querySelector(
      '.reel-story__thumbnail-item--is-active',
    );
    // init previously activated item
    formerActiveArticle = reelArticles.querySelector('.reel-story--is-active');
    // reset formerly active img to default state
    formerActiveThumb.classList.remove('reel-story__thumbnail-item--is-active');
    // reset formerly active article to default state
    formerActiveArticle.classList.remove('reel-story--is-active');
    // grab alt value of e.target's img
    currentThumbnailLi = e.target.parentElement;
    const currentThumbnailImg = currentThumbnailLi.querySelector('img');
    const currentThumbnailAlt = currentThumbnailImg.getAttribute('alt');
    // find corresponding article based on img alt, and climb to ancestor reel-story
    currentArticle = reelArticles
      .querySelector(`img[alt="${currentThumbnailAlt}"]`)
      .closest('.reel-story');
    // activate thumbnail and article
    currentThumbnailLi.classList.add('reel-story__thumbnail-item--is-active');
    currentArticle.classList.add('reel-story--is-active');
  }

  function resumeTimer() {
    // resume animation
    tickingProgressFill.classList.remove('j-progress-bar__fill--is-paused');
    // new start value is used
    // in the event that user mouseovers and mouseouts multiple times before returning auto again
    start = Date.now();
    // deactivate hovered items
    currentThumbnailLi.classList.remove(
      'reel-story__thumbnail-item--is-active',
    );
    currentArticle.classList.remove('reel-story--is-active');
    // reactivate auto selected items
    formerActiveThumb.classList.add('reel-story__thumbnail-item--is-active');
    formerActiveArticle.classList.add('reel-story--is-active');
    // wait out remaining time in timeout, then let auto proceed to next item
    timeout = setTimeout(autoReel, remaining);
  }

  return {
    hoverIn: pauseTimer,
    hoverOut: resumeTimer,
    auto: autoReel,
  };
}());

// Chris Ferdinandi's debounce function
// var debounce = function(fn) {
//   // Setup a timer
//   var timeout;

//   // Return a function to run debounced
//   return function() {
//     // Setup the arguments
//     var context = this;
//     var args = arguments;

//     // If there's a timer, cancel it
//     if (timeout) {
//       window.cancelAnimationFrame(timeout);
//     }

//     // Setup the new requestAnimationFrame()
//     timeout = window.requestAnimationFrame(function() {
//       fn.apply(context, args);
//     });
//   };
// };

// throttle function from http://sampsonblog.com/simple-throttle-function/
function throttle(callback, limit) {
  let tick = false;
  return () => {
    if (!tick) {
      callback.call();
      tick = true;
      setTimeout(() => {
        tick = false;
      }, limit);
    }
  };
}

// debounce function applied to scroll event
const deployScrollNavThrottled = throttle(deployScrollNav, 120);

// EVENTS //

// hovers over first top nav item
topNav
  .querySelector('.top-nav__item:first-child')
  .addEventListener('mouseover', dropdown.delineate);
topNav
  .querySelector('.top-nav__item:first-child')
  .addEventListener('mouseout', dropdown.delineate);

// focusing out of dropdown menu
topNavList.addEventListener('focusin', dropdown.focusOut);

// clicks on hamburger menu
hamburgerMenu.addEventListener('click', modal.displayMenu);
hamburgerMenu2.addEventListener('click', modal.displayMenu);

// update aria-expanded on dropdown menu
topNav.addEventListener('click', dropdown.toggle);

// clicks on magnifying glass and x
searchbar.addEventListener('click', toggleSearchBar);

// clicks on checkbox
newsletter.addEventListener('click', updateAriaCheckbox);

// clicks on user icon
userIcon.addEventListener('click', modal.displayForm);

// clicks on close icon
jsModals.addEventListener('click', (e) => {
  if (!e.target.classList.contains('js-icon-close')) {
    return;
  }
  modal.close(e);
});

// close modal on esc press
jsModals.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.close();
  }
});

// clicks on tab-switches
tabSwitches.addEventListener('click', modal.switch);

// mouse over reel article thumbnails
reelStoryNav.addEventListener('mouseover', reelTransition.hoverIn);
reelStoryNav.addEventListener('mouseout', reelTransition.hoverOut);

// submits on Kinja form
login.addEventListener('submit', validateForm);

// deploy navbar if scrolled to the email subscribe input
window.addEventListener('scroll', deployScrollNavThrottled);

// auto-scroll to top of page on click of up arrow
scrollButton.addEventListener('click', scrollToTop);

// stop the submission of all forms
document.addEventListener('submit', stopSubmission);

// run auto reel on window load
window.onload = reelTransition.auto();
