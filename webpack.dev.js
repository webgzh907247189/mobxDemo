const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')
const babelPolyfill = require('babel-polyfill')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const extractCSS = new ExtractTextPlugin('style/styleCss.css');
// const extractLESS = new ExtractTextPlugin('style/styleLess.css');

let childProcess = require('child_process')
let devPort = '8000'

const commonDevModules = [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${devPort}`,
    'webpack/hot/only-dev-server'
]

let { port:mockPort } = require('./mock/config')
childProcess.exec('nodemon ./mock/nodeExpressMock.js')

module.exports = {
    entry: {
        common: commonDevModules,
        index: './index.js',
        appTest: './apptest.js',
        vendor: ['react','lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'inline-source-map', //里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/',
            util: __dirname + '/src/util/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main", "module"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'         //'babel-loader?cacheDirectory'   babel的缓存编译结果
            },

            // {
            //     test: /\.css$/,   //这有个缺点，您将无法利用浏览器的异步和并行加载CSS的能力。这样，您的网页必须等待，直到您的整个JavaScript 包下载完成，然后重绘网页。
            //     use: 'css-loader' //并使用css-loader（它输出CSS作为JS模块） js是阻塞加载的，样式会出现很慢
            // },

            // {
            //     test: /\.css$/,
            //     use: extractCSS.extract(['css-loader?importLoaders=1','postcss-loader']) ///对于css中@import进来的css同样做前缀处理
            // },
            // {
            //     test: /\.less$/,
            //     use: extractLESS.extract(['css-loader?importLoaders=1','postcss-loader','less-loader']) //less-loader需要依赖less才能实现。如果用的npm3.0+，less是不会随着less-loader自动安装的，需要手动安装
            // }
            
            {
                test: /\.css$/,
                use: ['style-loader','css-loader?importLoaders=1','postcss-loader'] ///对于css中@import进来的css同样做前缀处理
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader?importLoaders=1','postcss-loader','less-loader'] //less-loader需要依赖less才能实现。如果用的npm3.0+，less是不会随着less-loader自动安装的，需要手动安装
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: './assets/imgs/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        new webpack.BannerPlugin('react demo'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        // new ExtractTextPlugin('styles.css'),
        // extractCSS,
        // extractLESS,

        new openBrowserWebpackPlugin({
            url: `http://localhost:${devPort}`
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r) (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','runtime'],
            minChunks: Infinity  //防止其他代码被打包进来
        }),
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['common','index', 'appTest','vendor','runtime'],   //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            inject: true,
            minify: {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ],
    devServer: {
        host: 'localhost',
        port: devPort,
        hot: true,
        historyApiFallback: true,  //??     ??http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
        // compress: true,

        inline: true,
        disableHostCheck: true,
        proxy: {
            /** 联调环境下 **/
            // '/api/*': {
            //     target: 'http://localhost:4000'
            // }

            /** 开发环境下 **/
            '/api/*': {
                target: `http://localhost:${mockPort}`
            }
        } 

        // *表示任意文件名，**表示任意一层子目录
        // proxy: [{
        //     context: ['**', '!**/*.html', '!**/*.js', '!**/*.css'],
        //     target: 'http://localhost:7001'
        // }]
    }
}