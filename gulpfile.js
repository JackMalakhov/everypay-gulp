const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const {src, dest} = require('gulp');

const browserSync = require('browser-sync').create();

let projectFolder = "dist"
let sourseFolder = "src"
let path ={
    build: {
        html: projectFolder+"/",
        css: projectFolder+"/css/",
        js: projectFolder+"/js/",
        img: projectFolder+"/img/",
        fonts: projectFolder+"/fonts/"
    },
    
    src: {
        html: sourseFolder+"/*.html",
        css: sourseFolder+"/scss/style.scss",
        js: sourseFolder+"/js/script.js",
        img: sourseFolder+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourseFolder+"/fonts/*.{woff2,woff}"
    },

    watch: {
        html: sourseFolder+"/**/*.html",
        css: sourseFolder+"/scss/**/*.scss",
        js: sourseFolder+"/js/**/*.js",
        img: sourseFolder+"/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./" + projectFolder + "/"
}



    function browserSyncFunc(){
        browserSync.init({
            server:{
                baseDir: "./" + projectFolder + "/"
            },
            port: 3000,
            notify: false
        })
    }

    function html(){
        return src(path.src.html)
            .pipe(fileinclude)
            .pipe(dest(path.build.html))
            .pipe(browserSync.stream())
    }

    let build = gulp.series(html);
    let watch = gulp.parallel(build, browserSyncFunc);

    exports.html = html;
    exports.build = build;
    exports.watch = watch;
    exports.default = watch;

    