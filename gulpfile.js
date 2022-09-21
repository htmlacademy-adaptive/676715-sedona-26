import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
// import csso from 'postcss-csso';
// import rename from 'gulp-rename';
// import htmlmin from 'gulp-htmlmin';
// import terser from 'gulp-terser';
// import squoosh from 'gulp-libsquoosh';
// import svgo from 'gulp-svgmin';
// import svgstore from 'gulp-svgstore';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
      // csso()
    ]))
    // .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// // Html
// export const html = () => {
//   return gulp.src('source/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('build'));
// }

// // Scripts
// export const scripts = () => {
//   return gulp.src('source/js/*.js')
//     .pipe(terser())
//     .pipe(gulp.dest('build/js'));
// }

// // Images
// export const images = () => {
//   return gulp.src('source/img/**/*.{jpg,png}')
//     .pipe(squoosh())
//     .pipe(gulp.dest('build/img'));
// }

// // Images
// // const optimizeImages = () => {
// //   return gulp.src('source/img/**/*.{jpg,png}')
// //     .pipe(squoosh())
// //     .pipe(gulp.dest('build/img'))
// // }

// // export const copyImages = () => {
// //   return gulp.src('source/img/**/*.{jpg,png}')
// //     .pipe(gulp.dest('build/img'))
// // }

// // WebP
// export const createWebp = () => {
//   return gulp.src('source/img/**/*.{jpg,png}')
//     .pipe(squoosh({
//       webp: {}
//     }))
//     .pipe(gulp.dest('build/img'));
// }

// // SVG
// export const svg = () =>
//   gulp.src(['source/img/*.svg', 'source/img/advantages/*.svg', 'source/img/banner/*.svg', '!source/img/icons/*.svg'])
//     .pipe(svgo())
//     .pipe(gulp.dest('build/img'));

// export const sprite = () => {
//   return gulp.src('source/img/icons/*.svg')
//     .pipe(svgo())
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename('sprite.svg'))
//     .pipe(gulp.dest('build/img'));
// }

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher
  // html, styles, scripts, images, createWebp, svg, sprite, server, watcher
  // html, styles, scripts, copyImages, server, watcher
);
