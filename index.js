const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const yaml = require('js-yaml');

hexo.extend.generator.register('album', function(locals) {
  const config = hexo.config.album || {};
  
  // 检查插件是否启用
  if (!config.enable) {
    return;
  }

  const outputPath = path.join(config.output_path || 'album/index.html'); // 相册页面路径
  const site_title = config.site_title || 'Album'; // 页面标题
  const favicon = config.favicon || 'https://img.icons8.com/ios/50/apple-camera.png'; // 网站图标

  // 读取相册数据
  const albumDataPath = path.join(hexo.source_dir, '_data', 'album.yml');
  const albumData = yaml.load(fs.readFileSync(albumDataPath, 'utf8')).categories || [];

  // 渲染 EJS 模板
  const templatePath = path.join(__dirname, 'template', 'index.ejs');
  const templateData = {
    categories: albumData,
    site_title: site_title,
    favicon: favicon
  };

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, templateData, (err, str) => {
      if (err) {
        console.error('Error rendering EJS template:', err);
        reject(err);
        return;
      }

      // 返回生成的文件信息
      resolve([{
        path: outputPath,
        data: str
      }]);
    });
  });
});