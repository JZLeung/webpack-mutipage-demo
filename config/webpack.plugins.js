var webpack = require('webpack')
var path = require('path');
var utils = require('./utils.js')

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var entry = require('./webpack.entry.js')

var plugins = [
    // 每次打包前都清空dist文件
    new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '../')
    }),
    // 公共js提取
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
        // minChunks: 3 // 提取至少3个模块共有的部分
    }),
    // 提取公共css样式
    new ExtractTextPlugin('css/[name].css'),
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}

console.log(process.env.NODE_ENV)

let dir_root = path.resolve(__dirname, '../src/view');
var pugFiles = utils.getAllFiles(dir_root, 'pug')

pugFiles = utils.getEntry(pugFiles, ['.pug', dir_root+'/'])
// console.log(pugFiles);
// { about: '/Users/lynnleung/work/webpack-demo/src/view/about.pug',
//   index: '/Users/lynnleung/work/webpack-demo/src/view/index.pug',
//   'other/other': '/Users/lynnleung/work/webpack-demo/src/view/other/other.pug' }

for (var key in pugFiles) {
    if (pugFiles.hasOwnProperty(key)) {
        let opt = {
            filename: './'+ key +'.html',
            template: pugFiles[key],
            hash: true,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }
        if (entry.hasOwnProperty(key)) {
            opt['chunks'] = ['vendors', key]
            opt['inject']= 'body'
        }
        // console.log(opt);
        plugins.push(new HtmlWebpackPlugin(opt))
    }
}

module.exports = plugins

// for (var i = 0; i < pugFiles.length; i++) {
//     let opt = {
//
//     }
//     if (true) {
//
//     }
//     plugins.push(new HtmlWebpackPlugin(opt))
// }
