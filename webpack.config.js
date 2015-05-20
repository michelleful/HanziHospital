var path = require('path');


module.exports = {
    context: path.resolve('app'),
    entry: {
        dev: [
            'webpack/hot/dev-server',
            './entry.js'
        ],
        standalone: [
            './entry.js'
        ]
    },
    output: {
        path: 'app_build',
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|gif|jpg|svg|woff|woff2|eot|ttf|)$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"},

        ],
    },
    devtool: 'eval',
    watchDelay: 400,
    externals: {
        "jquery": "jQuery"
    }
};
