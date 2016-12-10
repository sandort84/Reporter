const webpack = require('webpack');
const path = require('path');

const prodConfig = require('./webpack.config.production');


const config = Object.assign({}, prodConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('development')
   })
  ]
});

const host = 'localhost';
const port = 9000;
config.devServer = { host, port };
config.output.publicPath = `http://${host}:${port}/dist/`;

module.exports = config;
