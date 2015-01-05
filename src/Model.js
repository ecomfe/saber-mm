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
     * 获取数据
     *
     * @public
     * @param {Object} query
     * @param {string} url
     * @return {Promise}
     */
    Model.prototype.fetch = function (query, url) {
        return Resolver.resolved(query);
    };

    return Model;
});
