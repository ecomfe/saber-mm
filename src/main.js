/**
 * @file main
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var Resolver = require('saber-promise');

    function isString(value) {
        return Object.prototype.toString.call(value)
            === '[object String]';
    }

    /**
     * 异步创建Presenter
     *
     * @inner
     * @param {string} moduleId
     * @return {Promise}
     */
    function createAsync(moduleId) {
        var resolver = new Resolver();

        window.require([moduleId], function (config) {
            create(config).then(function (action) {
                resolver.resolve(action);
            });
        });

        return resolver.promise();
    }

    /**
     * 创建Presenter
     *
     * @inner
     * @param {Object|string} config
     * @return {Promise}
     */
    function create(config) {
        if (isString(config)) {
            return createAsync(config);
        }

        var Constructor;
        if (config && config.constructor !== Object) {
            Constructor = config.constructor;
        }
        else {
            Constructor = require('./Presenter');
        }
        return Resolver.resolved(new Constructor(config));
    }

    var exports = {};

    /**
     * 配置
     *
     * @param {Object} options
     * @param {string|Array.<string>=} options.template 公共模版
     * @param {Object=} options.templateConfig 模版配置信息
     * @param {Object=} options.router 路由器
     */
    exports.config = function (options) {
        var globalConfig = require('./config');
        var extend = require('saber-lang/extend');
        extend(globalConfig, options);
    };

    /**
     * 创建Presenter
     *
     * @public
     * @param {Object|string} config
     * @return {Promise}
     */
    exports.create = create;

    return exports;
});
