const webpack = require("webpack");

    module.exports = {   
        plugins: [
            new webpack.ProvidePlugin({
                process: "process/browser"
            }), 
            ]
    };

    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })