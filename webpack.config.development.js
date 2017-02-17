const webpack = require('webpack');
const path = require('path');

const prodConfig = require('./webpack.config.production');


const config = Object.assign({}, prodConfig, {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('development')
   })
  ]
});

const host = 'localhost';
const contentBase = path.join(__dirname, "dist");
const port = 9000;
config.devServer = { contentBase, port };
config.output.publicPath = `http://${host}:${port}/dist/`;

module.exports = config;
