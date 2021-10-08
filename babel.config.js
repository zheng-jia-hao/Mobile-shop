module.exports = {
	presets: ["@vue/cli-plugin-babel/preset"],

	plugins: [
		[
			// babel-plugin-import
			"import",
			{
				libraryName: "view-design",
				libraryDirectory: "src/components",
				// style: true,
			},
		],

		[
			// babel-plugin-component
			"component",
			{
				libraryName: "mint-ui",
				style: true,
			},
		],
	],
}
