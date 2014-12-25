/**
 * @file 默认的路由器
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var exports = {};

    var uri = require('saber-uri');

    /**
     * 页面跳转
     *
     * @public
     * @param {string} url
     * @param {Object=} query
     */
    exports.redirect = function (url, query) {
        var url = uri(url);
        url.query.add(query || {});
        location.href = url.toString();
    };

    return exports;
});
