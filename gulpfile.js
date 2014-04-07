var gulp = require('gulp'),
    util = require('gulp-util'),

    jade = require('gulp-jade'),
    beml = require('gulp-beml'),

    styl = require('gulp-stylus'),
    apfx = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),

    lint = require('gulp-jshint'),
    ugly = require('gulp-uglify'),
    cnct = require('gulp-concat'),

    imgo = require('gulp-imagemin'),

    lvrl = require('gulp-livereload'),
    emlr = require('gulp-embedlr')
    srvr = require('tiny-lr')(),

    when = require('gulp-if'),

    srcs = {
      html: ['src/**/*.jade', '!src/**/*.inc.jade', '!src/**/*.layout.jade'],
      css: ['src/**/*.styl', '!src/**/*.inc.styl'],
      js: ['src/js/**/*.js', '!src/js/**/jquery*.js'],
      jq: ['src/js/**/jquery.*.js', '!src/**/jquery.min.js'],
      img: ['src/**/*.{gif,jpg,png}', '!src/**/*.inc.{gif,jpg,png}'],
      pass: ['src/**/*.{html,css,php,svg,woff}', 'src/**/jquery.min.js']
      };

gulp.task('html', function() {
  return gulp.src(srcs.html)
    .pipe(jade({pretty: true, locals: require('./src/metadata.json')}))
    .pipe(beml())
    .pipe(emlr({
      src: "' + 'http://localhost' + ':35729/livereload.js"
      }))
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('css', function() {
  return gulp.src(srcs.css)
    .pipe(styl({urlFunc: ['uri']}))
    .pipe(apfx('last 2 version', 'ie 8', 'ie 9'))
    .pipe(csso())
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('jq', function() {
  return gulp.src(srcs.jq)
    .pipe(lint())
    .pipe(lint.reporter('default'))
    .pipe(cnct('jquery.js'))
    .pipe(gulp.dest('out/js'))
    .pipe(lvrl(srvr));
  });

gulp.task('js', function() {
  return gulp.src(srcs.js)
    .pipe(lint())
    .pipe(lint.reporter('default'))
    .pipe(cnct('script.js'))
    .pipe(gulp.dest('out/js'))
    .pipe(lvrl(srvr));
  });

gulp.task('img', function() {
  return gulp.src(srcs.img)
    .pipe(imgo())
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('pass', function() {
  return gulp.src(srcs.pass)
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('lr', function() {
  srvr.listen(35729, function(err){
    if(err)
      return console.log(err);
    });
  });

gulp.task('watch', function() {
  gulp.watch(srcs.html, ['html']);
  gulp.watch(srcs.css, ['css']);
  gulp.watch(srcs.jq, ['jq']);
  gulp.watch(srcs.js, ['js']);
  gulp.watch(srcs.img, ['img']);
  gulp.watch(srcs.pass, ['pass']);
  });

gulp.task('default', ['html', 'css', 'jq', 'js', 'img', 'pass', 'lr', 'watch']);