var fs = require('fs');

const jsDir = './src/js/';
const allDirs = [''];

var entry = {
    'index': './src/js/index.js'
};

// for (var i = allDirs.length - 1; i >= 0; i--) {
//     let path = jsDir + allDirs[i] + '/';
//     var dirs = fs.readdirSync(path);
//     dirs.forEach(function (file) {
//         var matches = file.match(/(.*)\.js$/);
//         if (matches) {
//             entry[allDirs[i] + '/' + matches[1]] = path +file;
//         }
//     })
// }

console.log(entry)

// entry['test'] = jsDir + 'test.js'

module.exports = {
    entry: entry
}
