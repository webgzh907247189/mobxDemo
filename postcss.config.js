module.exports = {
	plugins: [
		require('precss'), // 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等
		require('postcss-cssnext'),
		require('autoprefixer')({browsers: ['last 10 versions','Firefox >= 20','>0%']}),
    	require('postcss-pxtorem')({
    		rootValue: 75,propList: ['*','!font-size'],minPixelValue: 1   // https://www.npmjs.com/package/postcss-pxtorem
    	})
	]
}