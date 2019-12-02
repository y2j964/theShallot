# theShallot
The Shallot is a humorously fictitious news media webpage I wrote in the vein of [The Onion](https://www.theonion.com/).

![The Shallot animated demo](demo/demo.gif)

## Table of contents
* [Demo](#Demo)
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Acknowledgements](#acknowledgements)

## Demo
[Watch video demo](https://youtu.be/Igac3Qn17LA).

[Interact with demo](https://y2j964.github.io/theShallot/).

## General Info
I wanted to take on a more ambitious and personal webpage than I had made in the past, so I came up with the idea of modeling a homepage after The Onion. I love to write, and given that The Onion's stories are made up, it gave me the opportunity to showcase my own writing. So all of the headlines and stories were written by me. It bears repeating, though, that this is simply a webpage; none of my article links lead anywhere. However, the buttons all mimic the behavior of the buttons from The Onion with some additional tweaks I made out of accessibility concern (e.g. I changed the dropdown navigation menu to a click toggle).

## Technologies
* [Gulp 4.0.2](https://gulpjs.com/)
* BEM styled CSS
* Sass
* [Tailwind CSS 1.0.1](https://tailwindcss.com/)
* Git and Git Bash
* Inkscape 0.92.4

## Features
* Automatically revolving article reel
* Focus-trapped modal
* Form validation
* Throttled scroll listener
* Fixed top menu that appears when the user scrolls down to the email address input
* Responsive layout
* Aria-supported
* Custom Shallot logo created in Inkscape

## Setup
We're using gulp as a task runner. All the gulp scripts can be found in gulpfile.js, but we'll run through everything here to get you acclimated.

### Dependencies
To get started, clone this repo  and run `npm install`.

### Gulp Scripts
Here are all the gulp scripts:

#### `gulp`
Sets up a watch with browser-sync and outputs compiled css (from Sass), autoprefixed css, babel-ed js, and minified code to the dist folder.

#### `gulp eslint`
Runs linter in the terminal.

#### `gulp eslintFix`
Applies default fixes to eslint errors.

#### `gulp imageMin`
Compresses images and outputs to the dist folder.

## Acknowledgements
* This was modeled after the UI of The Onion homepage. It has changed slightly since the original time of this publication.
* The idea to use padding to keep images of disparate sizes in a consistent aspect ratio is an idea I got from [Netflix](https://www.netflix.com).
* The favicon was generated via [realfavicongenerator](realfavicongenerator.net).
* Images for The Onion's affiliate sites (The AV Club, Deadspin, etc) were sourced from The Onion.
* [Google Fonts](https://fonts.google.com/) was used for additional fonts.
