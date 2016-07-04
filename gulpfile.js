var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver'),
    pug = require('gulp-pug');
//    gls = require('gulp-live-server');

const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

// run init tasks
gulp.task('default', ['dependencies',  'html', 'css', 'private:build-ng2-templates', 'ts', 'img', 'js']);

// run development task
gulp.task('dev', ['watch', 'serve' ]);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.ts', ['ts']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/**/*.*',
  ])
    .pipe(gulp.dest('build/lib'));
});

// transpile & move js
//gulp.task('js', function () {
//  return gulp.src('src/**/*.js')
//    .pipe(rename({
//      extname: ''
//    }))
//    .pipe(traceur({
//      modules: 'instantiate',
//      moduleName: true,
//      annotations: true,
//      types: true,
//      memberVariables: true
//    }))
//    .pipe(rename({
//      extname: '.js'
//    }))
//    .pipe(gulp.dest('build'));
//});

gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('build'))
});


// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('img', function () {
  return gulp.src('src/**/*.jpg')
    .pipe(gulp.dest('build'))
});


gulp.task('ts', function () {
  return gulp
    .src([
      'src/**/*.ts',
       'node_modules/angular2/typings/browser.d.ts',
        ])
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('build'));
});

gulp.task('private:build-ng2-templates', function(done){  
    return gulp.src('src/templates/**/*.jade')
        .pipe(pug())
        .pipe(gulp.dest('src/dist/templates'));
});


//gulp.task('servestatic', function() {
//  var server = gls.static('src/assets/img', 8888);
//  server.start();
//
//  gulp.watch(['static/**/*.jpg' ], function (file) {
//    server.notify.apply(server, [file]);
//  });
//
//});



