const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const DeleteChunksPlugin = require('./webpack.delete.chunks.plugin.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('style/styleCss.css');
const extractLESS = new ExtractTextPlugin('style/styleLess.css');

module.exports = {
    entry: {
        common: 'babel-polyfill',
        index: './index.js',
        appTest: './apptest.js',
        vendor: ['react','lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[chunkHash].js', //https://github.com/zhenyong/Blog/issues/1
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkHash].js'
    },
    devtool: 'nosources-source-map', //('inline-source-map') 里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],  //默认解析扩展路径
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main","module"]  //webpack先使用jsnext:main字段，在没有时使用main字段。这样就可以优化支持tree-shaking的库
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

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", //编译后用什么loader来提取css文件
                    use: ['css-loader?importLoaders=1&minimize','postcss-loader']
               })
            },

            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", //编译后用什么loader来提取css文件
                    use: ['css-loader?importLoaders=1&minimize','postcss-loader','less-loader']  //loader会依次处理，上面的loader作废
               })
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: './assets/imgs/[name].[hash:7].[ext]'
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                    }
                }]
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        // new BundleAnalyzerPlugin(),  //webpack打包分析

        new webpack.BannerPlugin('this is react demo'),
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'common', //多入口，模块重复引用，分文件输出（将多次引用的模块打包到公共模块） 
            // minChunks: 2, //引用次数
            // chunks: ['index','appTest'] //只有在index.js和appTest.js中都引用的模块才会被打包的到公共模块（这里即common.js）

            // names: ['vendor','runtime']

            names: ['commonss','vendor','runtime'],
            minChunks: 2
            // minChunks: Infinity  //防止其他代码被打包进来(只是框架代码,业务的公共代码不会进来)
        }),


        // new ExtractTextPlugin('styles.css'),
        // extractCSS,
        // extractLESS,  
        new ExtractTextPlugin('style/[name]-[contenthash].css',{allChunks: true}),

        new webpack.DefinePlugin({   //可在production环境下帮助删除重复或相似文件，可以有效减少文件大小（用于打包文件优化，建议使用在生产环境）
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,  /* 兼容IE8 */
                warnings: false,   // 在UglifyJs删除没有用到的代码时不输出警告
                reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                drop_console: true // 删除所有的 `console` 语句  还可以兼容ie浏览器
            },
            mangle: {
                screw_ie8: false,    /* 兼容IE8(把支持IE8的代码clear掉) */
                keep_fnames: true
            },
            output: {
                quote_keys: true,   /* 兼容IE8 */
                comments: false,   // 删除所有的注释
                beautify: false    // 最紧凑的输出(是否 最紧凑的输出  ->  美化输出)
            },
            sourceMap: false  //生成SourceMap文件，会导致编译过程变慢，默认true (将错误信息的位置映射到模块)
        }),
        new HtmlWebPlugin({
            filename: 'detail.html',
            template: './index.html',
            chunks: ['common','index', 'appTest','vendor','runtime','commonss'],   //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            inject: 'body',  // body等同true的效果   (所有JavaScript资源插入到body元素的底部)
            minify: {
                collapseInlineTagWhitespace: false,
                removeComments:true, //移除HTML中的注释
                collapseWhitespace: true  //压缩html模板(生产)
            },
            inlineSource: 'runtime.bundle.[a-z0-9]{20}.js$'
        }),
        new HtmlWebpackInlineSourcePlugin(),   // https://github.com/DustinJackson/html-webpack-inline-source-plugin
        new DeleteChunksPlugin({
            chunks: ['runtime']
        })
    ]
}