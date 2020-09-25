const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['./src/js/index.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            minify: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            },
            {
                test:/\.css$/,
                use: ['style_loader','css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)\??.*$/,
                use: {
                    loader: 'url-loader',
                    //打包后发现HTML中<img>标签中的图片加载不出来。
                    //查看该图片打包后的路径信息： src="{"default":"data:image/jpeg;base64,....."}"
                    //原因是file-loader在新版本中esModule默认为true，因此需要手动设置为false

                    options: {
                        esModule: false,
                        limit: 8192,
                        //outputPath: 'assets',
                        //publicPath: './assets'
                        path:'./dist/assets',
                        publicPath: './assets',
                        filename: '[name].[ext]'
                        //name: './assets/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(htm|html)$/,
                loader: 'html-withimg-loader'
            }
        ]
    }
};