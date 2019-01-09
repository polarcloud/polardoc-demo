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
  let info = {
    category: "",
    next: false,
    prev: false,
  };
  let list = [];
  info.category = generateDocumentCategoryHtml(this.site.data[key], categoryName, "", page, list);

  console.log(list);

  for(let i=0; i < list.length; i++) {
    if (list[i].current) {
      if (i > 0) {
        info.prev = list[i-1];
      }
      if (i < list.length -1 ) {
        info.next = list[i + 1]
      }
      break;
    }
  }
  console.log(info);
  return info;
});

function generateDocumentCategoryHtml(categories, categoryName, html, page, list) {
  categories.forEach(function (item, i) {
    let active = "";
    if (page.source == categoryName + "/" + item.file) {
      active = 'class="active"';
    }

    let name = item.text || item.file.replace(/\.[\w]+$/, "");
    let url = "";
    if (item.file) {
      url = "/" + categoryName + "/" + item.file.replace(/\.[\w]+$/, ".html");
      html += `<li> <a href='${url}' ${active}>${name}</a>`;

      list.push({
        "name": name,
        "url": url,
        current: active.length > 0,
      });
    } else {
      html += `<li> <a>${name}</a>`;
    }

    if (item.children && item.children.length) {
      html += "<ul>";
      html = generateDocumentCategoryHtml(item.children, categoryName, html, page, list);
      html += "</ul>";
    }
    html += "</li>";
  });
  return html;
}