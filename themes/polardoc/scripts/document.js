/**
 * Created by liushuai <admin@liuyushuai.com> on 2019/1/7.
 *
 */
const path = require('path');

hexo.on('generateBefore', function () {
});

hexo.extend.helper.register('documentCategory', function(page){

  let paths = page.source.split(path.sep);
  if (paths.length < 2) {
    hexo.log.error("文档文件必须在独立的文件目录下:%s", page.source);
    process.exit();
  }
  let categoryName = paths[0];

  let key = "document/" + categoryName;
  if (!this.site.data || !this.site.data[key]) {
    hexo.log.error("缺失api文档目录配置文件:%s", "source/_data/document/" + categoryName + ".json");
    process.exit();
  }
  let html = generateDocumentCategoryHtml(this.site.data[key], categoryName, "");
  return html;
});

function generateDocumentCategoryHtml(categories, categoryName, html) {
  categories.forEach(function (item, i) {
    let name = item.text || item.file.replace(/\.[\w]+$/, "");
    let url = "";
    if (item.file) {
      url = "/" + categoryName + "/" + item.file.replace(/\.[\w]+$/, ".html");
      html += `<li> <a href='${url}'>${name}</a>`;
    } else {
      html += `<li> <a>${name}</a>`;
    }

    if (item.children && item.children.length) {
      html += "<ul>";
      html = generateDocumentCategoryHtml(item.children, categoryName, html);
      html += "</ul>";
    }
    html += "</li>";
  });
  return html;
}