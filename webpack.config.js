var webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode : "development",
  entry: ['./app/app.ts'],
  output: {
    path: path.resolve(__dirname, './docs/dist'),
    filename: 'app.js',
    //publicPath : 'dist'
  },
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
        },
    ]
  },
  plugins :[
    new CopyWebpackPlugin([
      { from : './index.html', to : '../'},
    ])
  ],
  devtool: 'source-map',
  devServer : {
    contentBase : path.resolve(__dirname, './'),
    publicPath: path.resolve(__dirname, '/dist/')
  },
  resolve : {
    extensions: ['.ts', '.tsx', '.js']
  }
};