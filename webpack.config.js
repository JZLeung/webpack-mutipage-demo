var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entry = require('./config/webpack.entry.js')
var plugins = require('./config/webpack.plugins.js')
const assetsPath = function (_path) {
    var assetsSubDirectory = './src'
    return path.posix.join(assetsSubDirectory, _path)
  }
var webpackConfig = {
    entry,
    // entry: './src/js/index.js',
    // entry: {
    //     // 设置入口文件。
    //     'index': './src/js/index.js'
    // },
    output: {
        // 设置输出文件夹
        path: path.join(__dirname, 'dist'),
        // 设置公用文件夹路径
        publicPath: '/',
        // 设置输出的js文件的名字规则。
        // [name] 为chunk中的名称
        // [hash] 为webpack生成的哈希值
        filename: "js/[name].[hash].bundle.js"
    },
    module: {
        rules: [{
            // 处理css文件
            test: /\.(scss|sass|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                        loader: "css-loader",
                        options: {
                            // // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            })
            // loader: "style-loader!css-loader"
            // use: [
            //     "style-loader",
            //     {
            //         loader: "css-loader",
            //         options: {
            //             // // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            //             importLoaders: 2
            //         }
            //     },
            //     'postcss-loader',
            //     'sass-loader'
            // ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            // 处理html文件，并处理img 中 src 和 data-src 的引入路径
            test: /\.html$/,
            loader: "html-loader?attrs=img:src img:data-src"
        }, {
            // 处理pug模板文件
            test: /\.pug$/,
            loader: "pug-loader"
        }, {
            // 处理字体文件
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=./fonts/[name].[ext]'
        }, 
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins,
    // 设置开发服务器
    devServer: {
        contentBase: path.join(__dirname, "dist/"),
        host: 'localhost',
        port: 9090,
        inline: true
    }
}

module.exports = webpackConfig
