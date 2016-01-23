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

// watch for file changes
gulp.task("watch", function () {
    gulp.watch("./src/*.*", ["update"]);
});

// update when files change
gulp.task("update", function () {
    gulp.src("./src/*.*")
    .pipe(gulp.dest("demo/"))
    .pipe(connect.reload());
});

gulp.task("bower", function() {
    gulp.src("./bower_components/**/*.*")
    .pipe(copy("demo/"));
});

// for development
gulp.task("dev", [
    "bower",
    "update",
    "connect",
    "watch"
]);

// default
gulp.task("default", function() {
    gulp.dev();
});
