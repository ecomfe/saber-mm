/**
 * @file Model
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var inherits = require('saber-lang/inherits');
    var extend = require('saber-lang/extend');
    var Resolver = require('saber-promise');
    var Abstract = require('./Abstract');

    /**
     * Model
     *
     * @constructor
     * @param {Object} options 参数
     */
    function Model(options) {
        Abstract.call(this, options);
        this.init();
    }

    inherits(Model, Abstract);

    /**
     * 设置查询条件与路径参数
     *
     * @public
     * @param {Object=} query 查询条件
     * @param {Object=} params 路径参数
     */
    Model.prototype.set = function (query, params) {
        this.query = extend({}, params, query);
        this.params = params || this.params;
    };

    /**
     * 获取数据
     *
     * @public
     * @return {Promise}
     */
    Model.prototype.fetch = function () {
        return Resolver.resolved(this.query);
    };

    return Model;
});
