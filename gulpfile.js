var gulp =          require("gulp");
var copy =          require("gulp-copy");
var connect =       require("gulp-connect");

// connect to the local server
gulp.task("connect", function() {
    connect.server({
        root: "demo",
        livereload: true,
        port: 7100
    });
});

// watch for html, less, and js file changes
gulp.task("watch", function () {
    gulp.watch("./src/example.html", ["html"]);
    gulp.watch("./src/graphify.js", ["scripts"]);
});

// update when html files change
gulp.task("html", function () {
    gulp.src("./src/example.html")
    .pipe(gulp.dest("demo/"))
    .pipe(connect.reload());
});

// update and recompile when js files change
gulp.task("scripts", function() {
    gulp.src("./src/graphify.js")
    .pipe(gulp.dest("demo/"))
    .pipe(connect.reload());
});

gulp.task("copy", function() {
    gulp.src("./bower_components/**/*.*")
    .pipe(copy("demo/"));
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
