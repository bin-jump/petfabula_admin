const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devServer: {
    hot: true,
    devMiddleware: {
      stats: 'errors-only',
    },
    static: {
      directory: './dist',
    },
    port: 3000,
    // proxy: {
    //   '/api': 'http://localhost:8080',
    //   withCredentials: true,
    // },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  devtool: 'cheap-module-source-map',
};

module.exports = merge(baseConfig, devConfig);
