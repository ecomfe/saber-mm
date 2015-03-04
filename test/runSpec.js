/**
 * @file Run test spec for server
 * @author treelite(c.xinle@gmail.com)
 */

var loader = require('amder');

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
