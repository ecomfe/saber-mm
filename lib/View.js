/**
 * @file View for server
 * @author treelite(c.xinle@gmail.com)
 */

var inherits = require('saber-lang').inherits;
var Abstract = require('./AbstractView');

function View(options) {
    Abstract.call(this, options);
}

inherits(View, Abstract);

module.exports = View;
