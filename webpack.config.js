var webpack = require('webpack');
var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});


var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './js');
var STYLE_DIR = path.resolve(__dirname, './less-utopians');



module.exports = {
    entry: ["babel-polyfill", "./app/js"]
};

var config = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        publicPath: '/'
    },
    entry:{
        app : APP_DIR + '/utopians.js',       
        styles_utopians: STYLE_DIR + '/main.less',
    
    },
    
    module : {

        rules : [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    },
                }
            },
            
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader',

            },

          


            {
                test: /\.css$/,
                //include: [STYLE_DIR_TIMEPICKER,STYLE_DIR, STYLE_DIR_SURVEY],
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'style!css?url=false!less'
                ]
            },
            
          

       
        
        {
            test: /\.less$/,
            //include: [STYLE_DIR_TIMEPICKER,STYLE_DIR, STYLE_DIR_SURVEY],
            use: extractLess.extract({
                use: [{
                    loader: "css-loader",
                    options: { url: false }
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
        
        {
              test: /\.(png|svg|jpe?g|gif)$/i,
              use: [
                'file-loader?name=[path][name].[ext]',             //this will keep file names and dir same in build
                'image-webpack-loader'                             //optimising images
              ]
          }
           

        ]
    },
    plugins: [
       extractLess
    ],
    output: {
        path: BUILD_DIR,
        filename: "[name].js"

    }
};

module.exports = config;

