/**
 * @file Model
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var Resolver = require('saber-promise');

function Model(config) {
    extend(this, config);
    this.store = extend({}, this.store);
}

Model.prototype.set = function (name, value) {
    this.store[name] = value;
};

Model.prototype.get = function (name) {
    return this.store[name];
};

Model.prototype.fill = function (data) {
    this.store = extend(this.store, data);
};

Model.prototype.del = function (name) {
    var data = this.store[name];
    delete this.store[name];
    return data;
};

Model.prototype.fetch = function () {
    return Resolver.resolved(extend({}, this.params, this.query));
};

module.exports = Model;
