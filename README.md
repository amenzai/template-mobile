## 这是一个基于gulp构建的移动端开发模板

1. 使用了gulp 4.0，优化了gulp task的异步处理问题
2. less、autoprefix样式预处理
3. babel-preset-env处理js代码
4. 使用gulp-file-include插件，复用html模板
5. fastclick.js 处理移动端点击延迟
6. 使用 rem 尺寸单位
7. 开发npm run dev，添加了本地服务器和代理，文件变动监听并刷新浏览器
8. 发布npm run build，压缩文件，添加文件md5值防止浏览器缓存
