const px2rem = require("postcss-px2rem")

const postcss = px2rem({
	remUnit: 37.5,
})
/**
 * 我真是操了尼玛的傻逼，
 * vue.config.js都能尼玛的写错写成vue.comfig.js ，你他妈的真的人才
 */
module.exports = {
	devServer: {
		proxy: {
			"/api": {
				// 匹配所有以 '/api'开头的请求路径
				target: "http://localhost:4000", // 代理目标的基础路径
				changeOrigin: true, // 支持跨域
				pathRewrite: {
					// 重写路径: 去掉路径中开头的'/api'
					"^/api": "",
				},
			},
		},
	},
	css: {
		//适配插件 postcss-px2rem
		loaderOptions: {
			postcss: {
				plugins: [postcss],
			},
		},
	},
}
