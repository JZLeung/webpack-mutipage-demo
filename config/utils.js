var fs = require('fs');

function getAllFiles(dirRoot, type){
    var filterReg = new RegExp('.'+type+'$');
    function getAllFileFromDir(root) {
        var res = [], files = fs.readdirSync(root)
        files.forEach((file) => {
            var pathname = root+'/'+file,
                state = fs.lstatSync(pathname)
            if (!state.isDirectory()) {
                filterReg.test(pathname) && res.push(pathname)
                // res.push(pathname.replace(dir_root+'/', ''))
            }else{
                res = res.concat(getAllFileFromDir(pathname))
            }
        })
        return res
    }
    return getAllFileFromDir(dirRoot)
}

function getEntry(files, replaces){
    var entry = {}
    for (var i = 0; i < files.length; i++) {
        var filename = files[i]
        replaces.map((replace) => {
            filename = filename.replace(replace, '')
        })
        entry[filename] = files[i]
    }
    return entry
}

module.exports = {
    getAllFiles,
    getEntry
}
