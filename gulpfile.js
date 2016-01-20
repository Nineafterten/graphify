var gulp =          require("gulp");
var copy =          require("gulp-copy");
var connect =       require("gulp-connect");
var notify =        require("gulp-notify");
var plumber =       require("gulp-plumber");

// connect to the local server
gulp.task("connect", function() {
    connect.server({
        root: "test",
        livereload: true,
        port: 7100
    });
});

// watch for html, less, and js file changes
gulp.task("watch", function () {
    gulp.watch("./src/*.html", ["html"]);
    gulp.watch("./src/*.js", ["scripts"]);
});

// update when html files change
gulp.task("html", function () {
    gulp.src("./src/example.html")
    .pipe(plumber({
        errorHandler: notify.onError("Html: <%= error.message %>")
    }))
    .pipe(gulp.dest("test/"))
    .pipe(connect.reload());
});

// update and recompile when js files change
gulp.task("scripts", function() {
    gulp.src("./src/graphify.js")
    .pipe(plumber({
        errorHandler: notify.onError("Scripts: <%= error.message %>")
    }))
    .pipe(gulp.dest("test/"))
    .pipe(connect.reload());
});

gulp.task("copy", function() {
    gulp.src([
        "./bower_components/**/*",
        "./node_modules/**/*"
    ])
    .pipe(plumber({
        errorHandler: notify.onError("Copy: <%= error.message %>")
    }))
    .pipe(copy("test/"));
});

// for development
gulp.task("dev", [
    "copy",
    "html",
    "scripts",
    "connect",
    "watch"
]);

// default
gulp.task("default", function() {
    gulp.dev();
});
