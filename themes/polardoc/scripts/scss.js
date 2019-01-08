var sass = require('node-sass')
var extend = require('util')._extend

scssRenderer = (ext) => function (data) {
  // support global and theme-specific config
  var userConfig = extend(
    hexo.theme.config.node_sass || {},
    hexo.config.node_sass || {}
  );

  var variables = scssVariables();

  var config = extend({
    data: variables + data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false,
    indentedSyntax: (ext === 'sass')
  }, userConfig)

  try {
    var result = sass.renderSync(config)
    return result.css.toString()
  } catch (error) {
    console.error(error.toString())
    throw error
  }
};

scssVariables = () => {
  var polarDoc =extend(
    hexo.theme.config.polardoc || {},
    hexo.config.polardoc || {}
  );
  var config = polarDoc.scss || {};
  var variables = "";
  for (var i in config) {
    variables += "$" + i + ":" + config[i] + ";"
  }
  variables += "\n";
  return variables;
};


hexo.extend.renderer.register('scss', 'css', scssRenderer('scss'))
hexo.extend.renderer.register('sass', 'css', scssRenderer('sass'))