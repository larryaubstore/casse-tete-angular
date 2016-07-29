var gulp = require('gulp'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    pug = require('gulp-pug')
    shell = require('gulp-shell')
    clean = require('gulp-clean'),
    server = require('gulp-express');

var runSequence = require('run-sequence');

const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

gulp.task('default', function(done) {
  runSequence(
              'private:build-ng2-templates', function() {

    runSequence( 'compilets', 'serve', function() {
      console.log('running');

    }); 

  });
});

gulp.task('heroku:', function(done) {
  runSequence(
              'private:build-ng2-templates', function() {
    console.log('done ...');
  });
});



gulp.task('serve', function () {
  server.run(['app.js']);

});





gulp.task('compilets', function () {
  return gulp
    .src([
      'typings/index.d.ts',
      'app/**/*.ts'
        ])
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('app'));
});



gulp.task('private:build-ng2-templates', function(done){  
    return gulp.src('app/templates/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('app/dist/templates'));
});
