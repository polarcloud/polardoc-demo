const assign = require('object-assign');
const pagination = require('hexo-pagination');

hexo.config.index_generator = assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.index_generator);

hexo.extend.generator.register('blog', function(locals) {
  let config = this.config;
  let posts = locals.posts.sort(config.index_generator.order_by);
  let paginationDir = config.pagination_dir || 'page';
  let path = config.posts || 'post';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['blog'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
});


hexo.extend.helper.register('getPostPagination', function(page){
  let paginationDir = hexo.config.pagination_dir || 'page';
  let path = hexo.config.posts || 'post';
  let info = {
    pages: [],
    current: page.current,
    next: page.next,
    previous: page.prev,
    page_url: "/" + path + "/" + paginationDir + "/",
    first_page: "/" + path,
  };
  if (page.total <= 5) {
    for(let i=1;i <= page.total;i++) {
      info.pages.push(i)
    }
    return info;
  }
  let i = page.current;
  while (i <= page.total && info.pages.length) {
    info.pages.push(i);
    i++;
  }

  i = page.current;
  while (i > 0 && info.pages.length < 5) {
    info.pages.unshift(i);
    i--;
  }
  return info;
});




