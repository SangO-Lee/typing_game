const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry :{
        router:'./src/router.js',
        main: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: '[name].js',
    },
    module:{
        rules:[
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        compress:true,
        port:9000,
        publicPath: '/',
        hot:true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin({
          cleanAfterEveryBuildPatterns: ['public']
        })
    ]
   
}