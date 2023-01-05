/*
 * @Description:
 * @Date: 2022-07-08 17:54:21
 */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './public/example/index.ts',
  output: {
    path: path.resolve(__dirname, 'localdev'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json']
  }
};
