'use strict';

// Load Gulp for execution
var gulp = require('gulp');
// Compile SASS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var csswring = require('csswring'); 
var mqpacker = require('css-mqpacker');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
// Compile JS
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
// Servers
var livereload = require('gulp-livereload');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// Others
var rename = require('gulp-rename');
// Compress images
var imagemin = require('gulp-imagemin');

// Variables folders PROD
var prodFolderSASS = 'src/FrontBundle/Resources/production/scss/main.scss';
var prodFolderJS = 'src/FrontBundle/Resources/production/js/**/*.js';
var prodFolderPicture = 'src/FrontBundle/Resources/production/images/';

// Variables folders DIST
var distFolderCSS = 'src/FrontBundle/Resources/public/css/';
var distFolderJS = 'src/FrontBundle/Resources/public/js/';
var distFolderPicture = 'src/FrontBundle/Resources/public/images/';
var basePath = 'src/FrontBundle/Resources';
// Tab Processors 
var processors = [
    autoprefixer({browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
    ]}),
    mqpacker,
    pxtorem
];

// Compilation du SASS
gulp.task('sass', function(){
  return gulp.src(prodFolderSASS)
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' })
              .on('error', sass.logError)
        )
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(rename('style.css'))
  .pipe(gulp.dest(distFolderCSS))
});

// Compress JS
gulp.task('compress-js', function() {
  return gulp.src(prodFolderJS)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distFolderJS));
});

// Compress CSS
gulp.task('compress-css', function() {
  return gulp.src(distFolderCSS + '*.css')
    .pipe(postcss([csswring({
                            removeAllComments: true
                          })
                  ])
    )
    .pipe(gulp.dest(distFolderCSS));
});

gulp.task('compress-images', function(){
  return gulp.src(prodFolderPicture)
    .pipe(imagemin())
    .pipe(gulp.dest(distFolderPicture))
});

// Action pour Distribution
gulp.task('distribution', ['compress-js','compress-css', 'compress-images'], function() {
  console.log('JavaScript Minify | CSS Minify');
});

// Action pour Production
gulp.task('productionLocal', ['sass', 'compress-js', 'browserSync'], function() {
    gulp.watch('src/FrontBundle/Resources/production/scss/**/*.scss', ['sass']);
    gulp.watch('src/FrontBundle/Resources/production/js/**/*.js', ['compress-js']);
    gulp.watch('src/FrontBundle/Resources/production/scss/**/*.scss').on('change', browserSync.reload);
    gulp.watch('src/FrontBundle/Resources/views/**/*.twig').on('change', browserSync.reload);
    gulp.watch('src/FrontBundle/Resources/production/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('browserSync', function(){
    return browserSync.init([
            basePath + 'public/css/style.css',
        ],{
       proxy:'http://localhost',
       startPath:"web/app_dev.php",
       ghostMode: {
         scroll: true,
             links: true,
             forms: true
       },
        watchTask:true
    });
});













