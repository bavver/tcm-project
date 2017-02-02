var gulp = require("gulp");
var concat = require("gulp-concat");
var wrap = require("gulp-wrap");

var uglify = require("gulp-uglify");

var htmlmin = require("gulp-htmlmin");

var gulpif = require("gulp-if");

var sass = require("gulp-sass");

var yargs = require("yargs");

var ngAnnotate = require("gulp-ng-annotate");

var templateCache = require("gulp-angular-templatecache");

var server = require("browser-sync");

var del = require("del");

var path = require("path");


var Dgeni = require("dgeni");


const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  distDocs: './docs/build',
  docs: './docs/app/*.js',
  scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
  tests: `${root}/app/**/*.spec.js`,
  styles: `${root}/sass/*.scss`,
  templates: `${root}/app/**/*.html`,
  modules: [
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-loading-bar/build/loading-bar.min.js'
  ],
  static: [
    `${root}/index.html`,
    `${root}/fonts/**/*`,
    `${root}/image/**/*`
  ]
};

server.create();

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('cleanDocs', cb => del(paths.distDocs + '**/**/*', cb));

gulp.task('templates', () => {
  return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    // .pipe(templateCache({
    //   root: 'app',
    //   standalone: true,
    //   transformUrl: function (url) {
    //     return url.replace(path.dirname(url), '.');
    //   }
    // }))
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('modules', ['templates'], () => {
  return gulp.src(paths.modules.map(item => 'node_modules/' + item))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      `!${root}/app/**/*.spec.js`,
      `${root}/app/**/*.module.js`,
      ...paths.scripts,
      './templates.js'
    ])
    .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('serve', () => {
  return server.init({
    files: [`${paths.dist}/**`],
    port: 4000,
    server: {
      baseDir: paths.dist
    }
  });
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});



gulp.task('default', [
  'copy',
  'styles',
  'serve',
  'watch'
]);

gulp.task('production', [
  'copy',
  'scripts'
]);

gulp.task('copyDocs', () => {
  return gulp.src(paths.docs)
    .pipe(gulp.dest(paths.distDocs + '/src'));
});

gulp.task('dgeni', ['cleanDocs', 'copyDocs'], () => {
    var dgeni = new Dgeni([require('./docs/config')]);
    return dgeni.generate();
});
