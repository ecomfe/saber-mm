/**
 * @file Load AMD module
 * @author treelite(c.xinle@gmail.com)
 */

var path = require('path');

var packages = {
    'saber-mm': '../../main'
};

/**
 * 加载AMD模块
 *
 * @public
 * @param {string} filename AMD模块的完整路径
 * @return {*}
 */
module.exports = function (filename) {
    var res;
    var raw = global.define;

    /**
     * AMD模块中的局部Require
     * 将内部require的模块全部转化为完整路径加载
     *
     * @inner
     * @param {string} moduleId 模块ID
     * @return {*}
     */
    function localRequire(moduleId) {
        // packages处理
        var id = packages[moduleId];
        if (id) {
            return require(id);
        }
      
        // 将相对路径转化为完整路径
        id = path.resolve(filename, moduleId);
        return require(id);
    }

    // 定义全局的define
    global.define = function (def) {
        res = def(localRequire);
    };

    // 引用AMD模块
    require(filename);

    // 清楚全局define的定义
    global.define = raw;

    return res;
};
