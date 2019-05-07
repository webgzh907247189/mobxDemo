const webpack = require('webpack');
const path = require('path')
const os = require('os')
const HtmlWebPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');


const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'

module.exports = {
    entry: {
        common: '@babel/polyfill',
        index: './index.tsx',
        vendor: ['react','lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[chunkHash].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkHash].js'
    },
    devtool: 'nosources-source-map', 
    resolve:{
        extensions: ['.js','.tsx','.ts','.web.js','.jsx','.json', '.scss'],  //默认解析扩展路径
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/',
            util: __dirname + '/src/util/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main","module"]  //webpack先使用jsnext:main字段，在没有时使用main字段。这样就可以优化支持tree-shaking的库
    },
    module: {
        rules: [
            {   
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'         //'babel-loader?cacheDirectory'   babel的缓存编译结果
            },
            {
				test: /\.css$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
					},
					{
						loader: 'postcss-loader'
					}
				],
				exclude: /node_modules/
            },
            {
                test: /\.less$/,                 //less-loader需要依赖less才能实现。如果用的npm3.0+，less是不会随着less-loader自动安装的，需要手动安装
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                exclude: /node_modules/
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
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					minSize: 30000,
					minChunks: 1,
					chunks: 'initial',
					priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
				},
				commons: {
					test: /[\\/]src[\\/]common[\\/]/,
					name: 'commons',
					minSize: 30000,
					minChunks: 3,
					chunks: 'initial',
					priority: -1,
					reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
				}
			}
		},
		runtimeChunk: {
			name: 'runtime'
		},
		minimizer: [
			new UglifyJsPlugin({
				exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
				cache: true,
				parallel: os.cpus().length - 1, //true, // 开启并行压缩，充分利用cpu (多核压缩)
				sourceMap: false,
				extractComments: false, // 移除注释
				uglifyOptions: {
					compress: {
						unused: true,
						warnings: false,
						drop_debugger: true,
						drop_console: true // 删除所有的 `console` 语句
					},
					output: {
						comments: false
					}
				}
			}),
			// 用于优化css文件 (CSS nano 解决单页的css)
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessorOptions: {
					safe: true,
					autoprefixer: {
						disable: true
					}, // 不移除autoprefixer加好的前缀
					mergeLonghand: false,
					discardComments: {
						removeAll: true // 移除注释
					}
				},
				canPrint: true
			})
		]
	},
    plugins: [
        // new BundleAnalyzerPlugin(),  //webpack打包分析

        new webpack.BannerPlugin('this is react demo'),
        new MiniCssExtractPlugin({
			filename: "style/[name].[hash:5].css",
			chunkFilename: "style/[id].[hash:5].css"
        }),
        new ManifestPlugin(),
		new ProgressBarPlugin(),
        new webpack.DefinePlugin({   //可在production环境下帮助删除重复或相似文件，可以有效减少文件大小（用于打包文件优化，建议使用在生产环境）
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        new HtmlWebPlugin({
            filename: 'detail.html',
            template: './index.html',
            // chunks: ['common','index', 'appTest','vendor','runtime','commonss'],   //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            inject: 'body',  // body等同true的效果   (所有JavaScript资源插入到body元素的底部)
            minify: {
                collapseInlineTagWhitespace: false,
                removeComments:true, //移除HTML中的注释
                collapseWhitespace: true  //压缩html模板(生产)
            }
        }),
        new InlineManifestWebpackPlugin('runtime')
    ]
}