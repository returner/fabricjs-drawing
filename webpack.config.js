var webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const config = {
    entry: ['./app/app.ts'],
    module: {
      rules: [
          {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'ts-loader',
                },
              ],
          }
      ]
    },
    devtool: 'source-map',
    devServer : {
      contentBase : path.resolve(__dirname, './'),
      publicPath: path.resolve(__dirname, '/dist/')
    },
    resolve : {
      extensions: ['.ts', '.tsx', '.js']
    },
    output : {
      filename: 'app.js'
    }
  };

  if(options.mode === 'development') {
    config.output.path = path.resolve(__dirname, './dist');
  } else {
    config.output.path = path.resolve(__dirname, './docs/dist');

    config.plugins = [
      new CopyWebpackPlugin([
        { from : './index.html', to : '../'}
      ])
    ];
  }

  return config;
};