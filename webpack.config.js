const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development'; //env переменная(объект) окружения в node.js, внутри которой есть NODE_ENV куда мы записываем мод 

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist'; //если мод development значит собираем под web, если prod - собираем под browserlist, и будем использовать автопрефиксор

const devtool = devMode ? 'source-map' : undefined; //если режим разработки будет создаваться sourcemap, для того, чтобы было легче отследить ошибки

console.log(mode)
console.log(MiniCssExtractPlugin.loader)
module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
  },
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/img/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader", // модуль, позволяет нам отслеживать изменения в разметке без обновления браузера
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader,  //модуль, позволяет нам отслеживать изменения в стилях без обновления браузера     
        'css-loader',
              {
                loader: "postcss-loader", // autoprefix добавляет нужные префиксы для того, чтобы код воспринимался старыми браузерами
                options: {
                  postcssOptions: {
                    plugins: [
                      ["postcss-preset-env"],
                    ],
                  },
                },
              },
              'sass-loader'
            ],
      },
      {
        test: /\.woff$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')// инструмент который создает файл index.html в dist
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' // инструмент который создает файл css в dist
    })
  ],
  
};