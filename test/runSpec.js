/**
 * @file Run test spec for server
 * @author treelite(c.xinle@gmail.com)
 */

var loader = require('amder');
var path = require('path');
var mm = require('../main');

mm.config({
    basePath: path.resolve(process.cwd(), 'test')
});

loader.config({
    packages: [
        {
            name: 'saber-mm',
            location: require.resolve('../')
        }
    ]
});

require('./spec/model');

require('./spec/presenter');

require('./spec/main');
