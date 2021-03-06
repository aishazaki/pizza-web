var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    /*تم لحل مشكلة 
    webpack < 5 used to include polyfills for node.js core modules by default.     
This is no longer the case. Verify if you need this module and configure a polyfill for it.
باضافة target: node*/
  
    target: 'node',


    entry: {
        app: "./src/index.js"
    },

    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "",
        filename: "main.js",
    },
    mode: "development",

    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 1337,
        writeToDisk: true,
        open: true,
    },

    /* لحل مشكلة 
    webpack < 5 used to include polyfills for node.js core modules by default.     
This is no longer the case. Verify if you need this module and configure a polyfill for it.*/
    resolve:{
        fallback:{
            util: require.resolve("util/"),
            "path": require.resolve("path-browserify"),
        },
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]

            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader'

                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            name: '[name].[ext]',
                            outputPath: "images",
                        }
                    }
                ]
            },
            {
                test:  /\.(svg|eot|woff|ttf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "fonts",
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options:{
                    exposes:['$', 'jQuery'],
                },
            },
            /* {
                test: require.resolve('jquery-validation'),
                loader: 'imports-loader',
                query: 'define=>false,$=jquery',
            }, */
            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'./src/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'about-us.html',
            template:'./src/about-us.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'product.html',
            template:'./src/product.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'product-chickenPizza.html',
            template:'./src/product-chickenPizza.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'product-margheritaPizza.html',
            template:'./src/product-margheritaPizza.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            template:'./src/contact.html',
        }),
        new MiniCssExtractPlugin({ filename: 'css/style.css'}),
        new OptimizeCssAssetsWebpackPlugin({}),
    ],
};
