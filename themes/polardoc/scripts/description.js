const h2p = require('html2plaintext');

hexo.extend.filter.register('after_post_render', function (data) {
  if (data.description) {
    return data;
  }
  let plain = h2p(data.content);

  data.description = plain.substring(0, hexo.config.description_length);
  return data;
});