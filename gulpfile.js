const gulp = require('gulp');
// const size = require('gulp-size');
// const stylelint = require('gulp-stylelint');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify'); // Js Minify
const sassLint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssMinify = require('gulp-css-minify'); // CSS Minify
const sourcemaps = require('gulp-sourcemaps');
const bs = require('browser-sync');

const DIST_FOLDER = './advanced_assets';
const SASS_SOURCES = [
  'Main.scss', // All other Sass files in the /css directory
  'node_modules/swiper/swiper.scss',
];

const CSS_DIST_FINAL = './advanced_assets/style.min.css';
// const CSS_TEMP_FINAL = './advanced_assets/tempstyle.min.css';

const SASS_SOURCES_DIR = [
  //"./*.scss", // This picks up our style.scss file at the root of the theme
  'Scss/**/*.scss'
];

const JS_DEFAULT_SRC = 'Js/*.js';
const JS_SOURCES = [
  JS_DEFAULT_SRC
];

const JS_SOURCES_LIBRARIES = [
  'node_modules/swiper/swiper-bundle.min.js'
];
const JS_RESULT = "./advanced_assets/script.min.js";
const JS_RESULT_LIBRARY = "./advanced_assets/lib.min.js";


// const CSS_SOURCE_FILES = [
//   'node_modules/swiper/swiper-bundle.min.css'
// ];

gulp.task('jquery:js', function (done) {
  gulp
    .src('node_modules/jquery/dist/jquery.min.js')
    // .pipe(minify({ noSource: true }))
    // .pipe(concat('.'))
    .pipe(gulp.dest(DIST_FOLDER));
  done();
});


gulp.task('libraries:js', function (done) {
  gulp
    .src(JS_SOURCES_LIBRARIES)
    .pipe(minify({ noSource: true }))
    .pipe(concat('.'))
    .pipe(gulp.dest(JS_RESULT_LIBRARY));
  done();
});

gulp.task('compress:js', function (done) {
  gulp
    .src(JS_SOURCES)
    .pipe(minify({ noSource: true }))
    .pipe(concat('.'))
    .pipe(gulp.dest(JS_RESULT));
  done();
});

gulp.task('fix:js', function (done) {
  gulp
    .src([JS_RESULT])
    .pipe(minify({ noSource: true }))
    .pipe(gulp.dest(JS_RESULT));
  done();
});



/**
 * Lint Sass
 */
gulp.task('lint:sass', (done) => {
  // gulp
  //   .src(SASS_SOURCES)
  //   .pipe(plumber())
  //   // .pipe(cssMinify())
  //   .pipe(sassLint())
  //   .pipe(sassLint.format());
  done();
});
/**
 * Compile Sass files
 */
gulp.task(
  'compile:sass',
  gulp.series('lint:sass', (done) => {
    gulp
      .src(SASS_SOURCES)
      .pipe(plumber()) // Prevent termination on error
      .pipe(
        sass({
          outputStyle: 'compressed',
          includePaths: [
            'dev/assets/sass/',
          ],
        })
      )
      .pipe(concat('.'))
      .pipe(gulp.dest(CSS_DIST_FINAL)) // Output compiled files in the same dir as Sass sources
      .pipe(bs.stream());
    done();
  })
); // Stream to browserSync


// gulp.task('css', function() {
//   return gulp.src(CSS_SOURCE_FILES)
//     .pipe(concat('.'))
//     .pipe(concat(CSS_TEMP_FINAL))
//     .pipe(gulp.dest(CSS_DIST_FINAL));
// });


/**
 * Start up browserSync and watch Sass files for changes
 */
gulp.task(
  'watch:sass',
  gulp.series('compile:sass', (done) => {
    gulp.watch(
      ['Scss/**/*.scss' , 'ScssConfig/**/*.scss' , 'Main.scss'],
      gulp.series('compile:sass', 'lint:sass', (done) => {
        done();
      })
    );
    done();
  })
);


gulp.task(
  'watch:js',
  gulp.series('compress:js', (done) => {
    gulp.watch(
      JS_DEFAULT_SRC,
      gulp.series('compress:js', (done) => {
        done();
      })
    );
    done();
  })
);

gulp.task('watch:js', function () {
  gulp.watch(JS_DEFAULT_SRC, gulp.series(['compress:js']));
});




/**
 * Default task executed by running `gulp`
 */
gulp.task(
  'default',
  gulp.series('watch:sass', 'watch:js', 'compress:js', 'libraries:js' , 'jquery:js', (done) => {
    done();
  })
);


/**
 * Default task executed by running `gulp`
 */
gulp.task(
  'build',
  gulp.series('compile:sass', 'compress:js', 'libraries:js', 'jquery:js', (done) => {
    done();
  })
);
