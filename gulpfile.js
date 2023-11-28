const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");

const paths = {
  styles: "src/styles/**/*.scss",
  scripts: "src/scripts/**/*.js",
};

gulp.task("styles", () => {
  return gulp
    .src(paths.styles)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", () => {
  return gulp
    .src(paths.scripts)
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", () => {
  gulp.watch(paths.styles, gulp.series("styles"));
  gulp.watch(paths.scripts, gulp.series("scripts"));
});

gulp.task("default", gulp.parallel("styles", "scripts", "watch"));
