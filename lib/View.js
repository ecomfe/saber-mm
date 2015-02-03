/**
 * @file View
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('saber-lang').extend;
var etpl = require('etpl');
var globalConfig = require('./config');

function compileTemplate(view, str) {
    if (!Array.isArray(str)) {
        str = [str];
    }

    // 添加全局的模版
    str = str.concat(globalConfig.template || []);

    str = str.join('');

    var config = extend({}, globalConfig.templateConfig || {});
    var filters = {};
    if (config.filters) {
        filters = config.filters;
        delete config.filters;
    }

    // 新建模版引擎
    var tplEngine = new etpl.Engine(config);
    Object.keys(filters).forEach(function (key) {
        tplEngine.addFilter(key, filters[key]);
    });

    // 保存默认render
    var defaultRender = tplEngine.compile(str);

    // 如果没有默认render就是模版编译失败了
    if (!defaultRender) {
        throw new Error('compile template fail');
    }

    // 保存原始的render
    var orgRender = tplEngine.render;

    view.template = tplEngine;
    // 重载render以支持无target的情况
    view.template.render = function (name, data) {
        var res = '';
        // 如果只有一个参数 或者target为null
        // 则使用默认render
        if (arguments.length < 2 || !name) {
            res = defaultRender(name || data);
        }
        else {
            res = orgRender.call(this, name, data);
        }

        return res;
    };
}

function View(config) {
    extend(this, config);
    compileTemplate(this, this.template);
}

View.prototype.set = function (ele) {
    this.main = ele;
};

View.prototype.render = function (data) {
    data = extend({}, globalConfig.templateData, data);
    this.main.innerHTML = this.template.render(this.templateMainTarget, data);
};

module.exports = View;
