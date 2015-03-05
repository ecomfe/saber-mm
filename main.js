/**
 * @file Node env
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var configMgr = require('./lib/config');

/**
 * 全局配置
 *
 * @param {Object} options 配置信息
 * @param {string|Array.<string>=} options.template 公共模版
 * @param {Object=} options.templateConfig 模版配置信息
 * @param {Object=} options.router 路由器
 */
exports.config = function (options) {
    configMgr.set(options);
};

/**
 * 创建Presenter
 *
 * @inner
 * @param {Object} config 配置信息
 * @return {Object}
 */
exports.create = function (config) {
    var Constructor;
    config = configMgr.normal(config);

    if (config.constructor !== Object) {
        Constructor = config.constructor;
    }
    else {
        Constructor = require('./lib/Presenter');
    }

    return new Constructor(config);
};

exports.Abstract = require('./lib/Abstract');

exports.Presenter = require('./lib/Presenter');

exports.Model = require('./lib/Model');

exports.View = require('./lib/View');
