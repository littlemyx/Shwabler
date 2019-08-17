const path = require('path')

module.exports = async ({config, mode}) => {
  config.resolve.alias = {
    '@': path.dirname(path.resolve(__dirname)),
    'vue$': 'vue/dist/vue.esm.js',
  }
  config.resolve.extensions.push('.js', '.vue', '.json', '.css', '.less', '.scss', '.sass', '.html')
  config.module.rules.push({ test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] });
  config.module.rules.push({ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' });

  return config;
}