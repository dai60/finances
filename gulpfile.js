const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function html(cb) {
    gulp.src("src/**/*.html")
        .pipe(gulp.dest("dest/"));
    cb();
}

function script(cb) {
    gulp.src("src/**/*.js")
        .pipe(gulp.dest("dest/"));
    cb();
}

function styles(cb) {
    gulp.src("src/sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dest/"));
    cb();
}

function watch(cb) {
    gulp.watch(
        ["src/**/*.html", "src/**/*.js", "src/sass/**/*.scss"],
        gulp.parallel(html, script, styles)
    );
    cb();
}

exports.html = html;
exports.script = script;
exports.watch = watch;
exports.default = gulp.series(
    gulp.parallel(html, script, styles),
    watch
);
