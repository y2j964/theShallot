var gulp = require('gulp'),
    prefix = require("gulp-autoprefixer"),
    terser = require("gulp-terser"),
    sass = require("gulp-sass"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    cleanCSS = require("gulp-clean-css"),
    sourcemaps =require("gulp-sourcemaps"),
    lineEndings = require("gulp-line-ending-corrector"),
    browserSync = require("browser-sync").create();           
    
sass.compiler = require("node-sass");
    
// you can use plumber or you can just use, for example, sass's on error handling          

// compress images
gulp.task("imageMin", function(){
  return gulp.src("src/assets/images/*")
  .pipe(imagemin())
  .pipe(gulp.dest("dist/assets/images"))
});

// concatenate and minify js
gulp.task("scripts", function(){
  return gulp.src("src/**/*.js")
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(lineEndings())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
});    

// browser-sync on changes
gulp.task("serve", function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }  
  });  
  gulp.watch("src/styles/**/*.scss", gulp.series("sass"));
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

//compile sass and rename to conventional styles.css
gulp.task("sass", function(){
  return gulp.src("src/styles/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(prefix("last 2 versions"))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(lineEndings())
    .pipe(rename("styles.css"))
    .pipe(gulp.dest("dist/"))  
    .pipe(browserSync.stream())
});

gulp.task("default", gulp.series("scripts", "sass", "serve"));