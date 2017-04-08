'use strict'

let gulp = require('gulp')
let watch = require('gulp-watch')
let nodemon = require('gulp-nodemon')
let elm = require('gulp-elm')

let srcDirectory = './src/'
let distDirectory = 'dist/'

let paths = {

  elm: {
    in: srcDirectory + '**/*.elm',
    watch: srcDirectory + '**/*.elm'
  },

  js: {
    in: srcDirectory + '**/*.js',
    watch: srcDirectory + '**/*.js',
    distWatch: distDirectory + '**/*.js'
  },

  html: {
    in: srcDirectory + '**/*.html',
    watch: srcDirectory + '**/*.html'
  }

}

gulp.task('elm-init', elm.init)

gulp.task('elm', ['elm-init'], () =>
  gulp
    .src(paths.elm.in)
    .pipe(elm({ debug: process.env.NODE_ENV !== 'production' }))
    .on('error', console.error)
    .pipe(gulp.dest(distDirectory + 'public/'))
)

gulp.task('elm-watch', ['elm'], () =>
  watch(paths.elm.watch, () => gulp.start('elm'))
)

gulp.task('js', () =>
  gulp
    .src(paths.js.in)
    .pipe(gulp.dest(distDirectory))
)

gulp.task('js-watch', ['js'], () =>
  watch(paths.js.watch, () => gulp.start('js'))
)

gulp.task('html', () =>
  gulp
    .src(paths.html.in)
    .pipe(gulp.dest(distDirectory))
)

gulp.task('html-watch', ['html'], () =>
  watch(paths.html.watch, () => gulp.start('html'))
)

gulp.task('nodemon', ['js'], () =>
  nodemon({
    script: 'dist/app.js',
    ext: 'js',
    ignore: [distDirectory + 'public/'],
    watch: [paths.js.distWatch],
    env: { 'NODE_ENV': 'development' }
  })
)

gulp.task('build', ['elm', 'js', 'html'])
gulp.task('watch', ['elm-watch', 'js-watch', 'html-watch', 'nodemon'])

gulp.task('default', ['build'])
