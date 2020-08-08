const gulp = require("gulp");
const del = require("del"); // node 模块
const cleanCSS = require("gulp-clean-css"); // css文件压缩
const sass = require("gulp-sass"); // sass 转 css
const rename = require("gulp-rename"); // 重新命名文件或者文件夹
const autoprefixer = require("gulp-autoprefixer"); // 浏览器兼容性自动补齐前缀

gulp.task("default", async () => {
  // 先删除后编译
  // force 允许删除当前工作目录和外部目录
  // dryRun 查看将被删除的内容
  await del(["../dist/styles/**/*", "!../dist/styles"], {
    force: true,
    dryRun: true
  });

  // 编译scss
  await gulp
    .src("../src/styles/index.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions", "ie > 8"]
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("hui.css"))
    .pipe(gulp.dest("../dist/styles"));

  // 拷贝字体文件
  // await gulp
  //   .src("../src/styles/common/iconfont/fonts/*.*")
  //   .pipe(gulp.dest("../dist/styles/fonts"));
});
