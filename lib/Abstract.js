/**
 * @file Abstract
 * @author treelite(c.xinle@gmail.com)
 */

var Emitter = require('saber-emitter');
var extend = require('saber-lang').extend;
var bind = require('saber-lang').bind;
var inherits = require('saber-lang').inherits;
var combine = require('./util/combine');

/**
 * 绑定事件
 *
 * @inner
 * @param {Object} abs 对象
 */
function bindEvents(abs) {
    var fns;
    var events = abs.events || {};

    function bindEvent(obj, name, fn) {
        // 没有':'表示abs事件
        if (name.indexOf(':') < 0) {
            obj.on(name, fn);
        }
        // 有':'表示绑定组件事件(view或者model的事件)
        // e.g: view:add
        else {
            var items = name.split(':');
            var item = items[0].trim();

            name = items[1] && items[1].trim();
            if (item && obj[item] && name) {
                obj[item].on(name, bind(fn, obj));
            }
        }
    }

    Object.keys(events).forEach(function (name) {
        fns = events[name];
        if (!Array.isArray(fns)) {
            fns = [fns];
        }
        for (var i = 0, fn; fn = fns[i]; i++) {
            bindEvent(abs, name, fn);
        }
    });
}

/**
 * Abstract
 *
 * @constructor
 * @param {Object} options 配置参数
 * @param {Object} options.events 事件配置
 */
function Abstract(options) {
    options = options || {};

    var events = options.events;
    if (events) {
        this.events = combine(this.events, events);
        delete options.events;
    }

    extend(this, options);
}

// 使用继承而非mixin能提升性能
inherits(Abstract, Emitter);

/**
 * 初始化
 *
 * @public
 */
Abstract.prototype.init = function () {
    bindEvents(this);
    this.emit('init');
};

/**
 * 销毁
 *
 * @public
 */
Abstract.prototype.dispose = function () {
    // 注销所有事件
    this.off();
};

module.exports = Abstract;
