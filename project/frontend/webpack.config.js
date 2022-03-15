const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const clientConfig = {
	entry: './src/app.tsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '..', '.dist', 'js')
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: "tsconfig.json"
						}
					}
				],
				exclude: /node_modules|index\.ts/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					},
				],
			},
			{
				test: /\.less$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]_[hash:base64:5]'
							},
							importLoaders: 1,
							sourceMap: true
						}
					},
					{
						loader: "less-loader",
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
		alias: {
			'~app': path.resolve(__dirname, 'src/app'),
			'~ui': path.resolve(__dirname, 'src/ui'),
			'~tasks': path.resolve(__dirname, 'src/app/tasks'),
			'~components': path.resolve(__dirname, 'src/app/content/components'),
			'~page': path.resolve(__dirname, 'src/app/content/entities/page'),
			'~store': path.resolve(__dirname, 'src/app/store'),
			'~utils': path.resolve(__dirname, 'src/utils/index.ts'),
			'~shared': path.resolve(__dirname, '../shared'),
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: "./src/index.html", to: "../index.html" }
			]
		})
	],
}

module.exports = clientConfig;