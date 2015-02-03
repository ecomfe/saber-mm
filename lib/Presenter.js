/**
 * @file Presenter
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var globalConfig = require('./config');

function Presenter(config) {
    extend(this, config);

    var Constructor;
    if (this.view
        && this.view.constructor !== Object
    ) {
        Constructor = this.view.constructor;
    }
    else {
        Constructor = globalConfig.View || require('./View');
    }
    this.view = new Constructor(this.view);

    if (this.model
        && this.model.constructor !== Object
    ) {
        Constructor = this.model.constructor;
    }
    else {
        Constructor = globalConfig.Model || require('./Model');
    }
    this.model = new Constructor(this.model);
}

Presenter.prototype.enter = function (main, path, query, params) {
    this.view.set(main);
    this.model.set(query, params, path);
    return this.model.fetch().then(this.view.render.bind(this.view));
};

module.exports = Presenter;
