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
  runSequence('clean',
              'dependencies',  
              'index',
              'css', 
              'private:build-ng2-templates', 
              'html', 
              'js', 
              'img',  
              'ts', function() {

    runSequence( 'compilets', 'serve', function() {
      console.log('running');

    }); 

  });
});

gulp.task('prod', function(done) {
  runSequence('clean',
              'dependencies',  
              'index',
              'css', 
              'private:build-ng2-templates', 
              'html', 
              'js', 
              'img',  
              'ts', function() {
    console.log('done ...');
  });
});


gulp.task('clean', function () {

  return gulp.src('build')
        .pipe(clean());

});

gulp.task('serve', function () {
  server.run(['app.js']);

});

// serve the build dir
//gulp.task('serve', function () {
//  gulp.src('build')
//    .pipe(webserver({
//      open: true
//    }));
//});





// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('build/**/*.html', ['html']);
  gulp.watch('build/**/*.css', ['css']);
  gulp.watch('build/**/*.ts', ['ts']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/**/*.*'
  ])
    .pipe(gulp.dest('build/node_modules'));
});

// move index.html 
gulp.task('index', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest('build'))
});


// move css
gulp.task('css', function () {
  return gulp.src('assets/css/**/*.css')
    .pipe(gulp.dest('build/assets/css'))
});

// move css
gulp.task('img', function () {
  return gulp.src('assets/css/**/*.jpg')
    .pipe(gulp.dest('build/assets/css'))
});

gulp.task('js', function () {
  return gulp.src('systemjs.config.js')
    .pipe(gulp.dest('build'))
});

gulp.task('ts', function () {
  return gulp.src('app/**/*.ts')
    .pipe(gulp.dest('build/app'))
});


gulp.task('compilets', function () {
  return gulp
    .src([
      'typings/index.d.ts',
      'app/**/*.ts'
        ])
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('build/app'));
});

//gulp.task('compilets', shell.task([
//        'tsc'
//]));

gulp.task('html', function () {
  return gulp.src('app/dist/templates/**/*.html')
    .pipe(gulp.dest('build/app/dist/templates'))
});



gulp.task('private:build-ng2-templates', function(done){  
    return gulp.src('app/templates/**/*.jade')
        .pipe(pug())
        .pipe(gulp.dest('app/dist/templates'));
});
