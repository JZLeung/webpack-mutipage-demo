var path = require('path');
var utils = require('./utils.js')

var dir_root = path.resolve(__dirname, '../src/js');

// console.log(getAllFiles(dir_root));
var allFiles = utils.getAllFiles(dir_root, 'js')
// var entry = {}
// for (var i = 0; i < allFiles.length; i++) {
//     var filename = allFiles[i].replace('.js', '')
//                               .replace(dir_root+'/', '');
//     entry[filename] = allFiles[i]
// }
var entry = utils.getEntry(allFiles, ['.js', dir_root+'/'])
// console.log(entry);
module.exports = entry
