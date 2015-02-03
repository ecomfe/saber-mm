/**
 * @file Model
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var Resolver = require('saber-promise');

function Model(config) {
    extend(this, config);
}

Model.prototype.set = function (query, params, path) {
    this.query = query;
    this.params = params;
    this.path = path;
};

Model.prototype.fetch = function () {
    return Resolver.resolved(extend({}, this.params, this.query));
};

module.exports = Model;
