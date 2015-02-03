/**
 * @file Node env
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var globalConfig = require('./lib/config');

exports.config = function (config) {
   extend(globalConfig, config);
};

exports.create = function (config) {
    var Constructor;
    if (config && config.constructor !== Object) {
        Constructor = config.constructor;
    }
    else {
        Constructor = globalConfig.Presenter || require('./lib/Presenter');
    }

    return new Constructor(config);
};

exports.Presenter = require('./lib/Presenter');

exports.Model = require('./lib/Model');

exports.View = require('./lib/View');
