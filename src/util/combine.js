define(function (require, exports, module) {
    /**
     * @file 对象组合
     * @author treelite(c.xinle@gmail.com)
     */

    /**
     * 合并对象
     * 相同key的数据按数组进行合并
     *
     * @param {Object} target 目标对象
     * @param {Object=} source 源对象
     * @return {Object}
     */
    function combine(target, source) {
        if (!source) {
            return target;
        }

        var item;
        Object.keys(source).forEach(function (key) {
            item = source[key];

            if (target.hasOwnProperty(key)) {
                if (!Array.isArray(target[key])) {
                    target[key] = [target[key]];
                }
                target[key].push(item);
            }
            else {
                target[key] = item;
            }
        });

        return target;
    }

    /**
     * 对象组合
     *
     * @public
     * @param {Object=} target 组合目标
     * @param {...Object} source 源对象
     * @return {Object}
     */
    module.exports = function (target) {
        target = target || {};

        for (var i = 1; i < arguments.length; i++) {
            target = combine(target, arguments[i]);
        }

        return target;
    };
});
