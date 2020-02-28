const { src, dest, parallel, watch, series } = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");

function html() {
  return src("./src/*.html")
    .pipe(dest("./build"))
    .pipe(browserSync.stream());
}

function css() {
  return src("./src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("./build/css"))
    .pipe(browserSync.stream());
}

function js() {
  return src("./src/js/**/*.js")
    .pipe(concat("scripts.js"))
    .pipe(dest("./build/js"))
    .pipe(browserSync.stream());
}

function img() {
  return src("./src/img/**")
    .pipe(dest("./build/img"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("./src/fonts/**").pipe(dest("./build/fonts"));
}

function clean() {
  return del(["build/*"]);
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  watch("./src/scss/**/*.scss", css);
  watch("./src/js/**/*.js", js);
  watch("./src/*.html", html);
  watch("./src/img/**", img);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.watchTask = watchTask;
exports.default = series(clean, parallel(html, css, js, img, fonts), watchTask);
