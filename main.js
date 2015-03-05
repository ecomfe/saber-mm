/**
 * @file Node env
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var Resolver = require('saber-promise');
var configMgr = require('./lib/config');

function isString(value) {
    return Object.prototype.toString.call(value)
        === '[object String]';
}

/**
 * 全局配置
 *
 * @param {Object} options 配置信息
 * @param {string|Array.<string>=} options.template 公共模版
 * @param {Object=} options.templateConfig 模版配置信息
 * @param {Object=} options.templateData 公共静态模版数据
 * @param {Object=} options.router 路由器
 * @param {string=} options.basePath 动态加载Presenter的根路径
 */
exports.config = function (options) {
    configMgr.set(options);
};

/**
 * 创建Presenter
 *
 * @inner
 * @param {Object|string} config 配置信息
 * @return {Promise}
 */
exports.create = function (config) {
    // 动态加载Presenter配置
    if (isString(config)) {
        var path = require('path');
        var base = configMgr.get('basePath') || process.cwd();
        config = path.resolve(base, config);
        return exports.create(require(config));
    }

    var Constructor;
    config = configMgr.normal(config);

    if (config.constructor !== Object) {
        Constructor = config.constructor;
    }
    else {
        Constructor = require('./lib/Presenter');
    }

    return Resolver.resolved(new Constructor(config));
};

exports.Abstract = require('./lib/Abstract');

exports.Presenter = require('./lib/Presenter');

exports.Model = require('./lib/Model');

exports.View = require('./lib/View');
