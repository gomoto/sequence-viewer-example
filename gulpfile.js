var Browserifier = require('browserifier');
var browserSync = require('browser-sync').create();
var fs = require('fs');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var trash = require('trash');

var src = `${__dirname}/src`;
var build = `${__dirname}/build`;

// serve
gulp.task('default', ['ts', 'html'], () => {
  browserSync.init({
    server: {
      baseDir: build
    },
    port: 9000
  });
});

// This task finishes after initial bundle is created.
gulp.task('ts', ['mkdir'], (finished) => {
  var b = new Browserifier(`${src}/index.ts`, `${build}/app.js`, {
    debug: true,
    tsify: true,
    watchify: true,
    watchifyCallback: reloadBrowsers
  });
  b.bundle(finished);
});

// This task finishes after initial copy.
gulp.task('html', ['mkdir'], (finished) => {
  gulp.watch([`${src}/index.html`], () => {
    copyHtml(reloadBrowsers);
  });
  copyHtml(finished);
});

// This task finishes after promise resolves.
gulp.task('mkdir', () => {
  return trash([build]).then(() => {
    mkdirp.sync(build);
  });
});

function copyHtml(callback) {
  fs.createReadStream(`${src}/index.html`)
  .pipe(fs.createWriteStream(`${build}/index.html`))
  .on('close', callback);
}

function reloadBrowsers() {
  browserSync.reload();
}
