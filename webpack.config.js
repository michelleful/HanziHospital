var path = require('path');


module.exports = {
    context: path.resolve('app'),
    entry: {
        app: ['./entry.js']
    },
    output: {
        path: 'build',
        filename: 'bundle.js'
    }
};
