var path = require('path');

module.exports = {
  entry: {
    'polyfills': './polyfills.browser.ts',
    'vendor':    './vendor.browser.ts',
    'main':      './main.browser.ts',
  },

  output: {
    path: './build',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [ __dirname ],
    extensions: ['', '.ts', '.js']
  },

  plugins: [
//    new webpack.optimize.OccurenceOrderPlugin(true),
//    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  }
};
