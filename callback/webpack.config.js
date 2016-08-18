var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map', //便于调试
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
