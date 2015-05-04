var path = require('path');


module.exports = {
    context: path.resolve('app'),
    entry: {
        app: ['./entry.js']
    },
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|gif)$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"},

        ],
    },
    devtool: 'eval',
    watchDelay: 400
};
