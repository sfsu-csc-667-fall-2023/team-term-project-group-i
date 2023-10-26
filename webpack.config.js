const path = require("path");
module.exports = {
    entry: "./frontend/index.js",
    output: {
        path: path.join(__dirname, "backend", "static", "js"),
        publicPath: "./backend/static/js",
        filename: "bundle.js",
    },
    mode: "production",
    module: {
        
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" },
            },
        ],
    },
}; 