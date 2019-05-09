module.exports = {
	plugins: [
		require('precss'),
		require('postcss-preset-env'),
        require('autoprefixer')({browsers: ['last 10 versions','Firefox >= 20','>0%']}),
    	require('postcss-pxtorem')({
    		rootValue: 75,propList: ['*','!font-size'],minPixelValue: 1 
        }),
        require('cssnano')
	]
}