const path = require("path");
const CopyRightWebpackPlugin = require("./plugins/copyright-webpack-plugin");
const { FileListPlugin } = require('./plugins/file-list-plugin.js');


module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    resolveLoader: {
        modules: ["node_modules", "./loaders"]
    },
    module: {
        rules: [{
            test: /\.js/,
            use: [
                {
                    loader: path.resolve(__dirname, "./loaders/replaceLoader.js")
                },
                {
                    loader: path.resolve(__dirname, "./loaders/replaceLoaderAsync.js"),
                    options: {
                        name: "lee"
                    }
                }
            ]
        }]
    },
    plugins: [
        new FileListPlugin({
            outputFile: 'my-assets.md',
        })
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    }
}