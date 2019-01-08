/**
 * Created by liushuai <admin@liuyushuai.com> on 2019/1/8.
 *
 */


hexo.extend.generator.register('index', function(locals) {
  locals.__index = true;
  return {
    path: "index.html",
    data: locals,
    layout: "index",
  }
});