/**
 * @file Model
 * @param treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var inherits = require('saber-lang/inherits');
    var Resolver = require('saber-promise');
    var Abstract = require('./Abstract');

    /**
     * Model
     *
     * @constructor
     */
    function Model(options) {
        Abstract.call(this, options);
        this.init();
    }

    inherits(Model, Abstract);

    /**
     * 填充数据
     *
     * @public
     * @param {*} data
     */
    Model.prototype.fill = function () {};

    /**
     * 获取数据
     *
     * @public
     * @param {string} url
     * @param {Object} query
     * @return {Promise}
     */
    Model.prototype.fetch = function (url, query) {
        return Resolver.resolved(query);
    };

    return Model;
});
