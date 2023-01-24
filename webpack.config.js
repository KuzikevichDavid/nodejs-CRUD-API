const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()], // removes node_modules from your final bundle
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: 'bundle.js',
        libraryTarget: 'this'
    },
    optimization: {
        minimize: false, // enabling this reduces file size and readability
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
};