const fs = require('fs')

/**
 * node 根据文件名查找其在指定目录中的路径
 * @param {string} path 指定路径
 * @param {string} it 文件名
 */
function findFileDir(path, it) {
    const dirList = fs.readdirSync(path);
    for (var i = 0; i < dirList.length; i++) {
        const item = dirList[i];
        if (fs.statSync(path + '\\' + item).isDirectory()) {
            if (item == it) {
                return path + '\\' + item;
            } else {
                var j = findFileDir(path + '\\' + item, it);
                if (j) {
                    return j;
                } else {
                    continue;
                }
            }
        } else if (fs.statSync(path + '\\' + item).isFile()) {
            if (item == it) {
                return path + '\\' + item;
            }
        }
    }
}

module.exports = {
    findFileDir
}