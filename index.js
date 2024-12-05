const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

hexo.extend.generator.register('album', function(locals) {
  const config = hexo.config.album || {};
  
  const outputPath = path.join(hexo.public_dir, config.output_path || 'album/index.html'); // 相册页面路径
  const baseUrl = config.base_url || '/'; // 图片基础 URL

  
  // 读取相册数据
  const albumData = hexo.locals.get('data').album || [];

  // 渲染 EJS 模板
  const templatePath = path.join(__dirname, 'layout', 'index.ejs');
  const templateData = {
    albumData: albumData,
    resUrl: resUrl,
    baseUrl: baseUrl
  };

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, templateData, (err, str) => {
      if (err) {
        console.error('Error rendering EJS template:', err);
        reject(err);
        return;
      }

      // 将渲染后的 HTML 写入文件
      fs.writeFileSync(outputPath, str);
      console.log('hexo-album-page: Album page generated at', outputPath);

      resolve({
        path: outputPath,
        data: str
      });
    });
  });
});
