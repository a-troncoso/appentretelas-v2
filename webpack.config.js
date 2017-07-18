const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	// crea mapsource (permite linkear el codigo compilado con el codigo no complilado, q usamos para desarrollo)
	devtool: 'cheap-module.eval-source-map', // no iria en prod
	resolve: {
		// extensiones q leerá webpack
		extensions: ['.js', '.jsx'],
		// donde estan los modulos creados por el desarrollador y los node modules
		modules: [
			path.join(__dirname, 'src'),
			'node_modules'
		],
	},
	entry: [
		// para que weback implemente el servidor web
		'webpack-dev-server/client', // no iria en prod
		// hot reloading, el cual permite ver los cambios en el navegador mientras de desarrolla, sin perder los datos
		'webpack/hot/only-dev-server', // no iria en prod
		// ficheros de entrada
		path.join(__dirname, 'src', 'index.jsx')

	],
	// fichero final de la app (el q será subido a prod)
	output: {
		// nombre de carpeta build
		path: path.join(__dirname, 'build'),
		// nombre de archivo bundle.js
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		// reglas
		rules: [{
			// todo lo q sea fichero con extension js o jsx
			test: /\.jsx?$/,
			// excluyendo node_modules
			exclude: /node_modules/,
			// usa el babel-loader 
			use: {
				loader: 'babel-loader'
			}
		}, {
			// todos los ficheros q tengan extension scss (si no ocupo sass seria /\.css$/)
			test: /\.scss$/,
			// excluyendo node_modules
			exclude: /node_modules/,
			// usa varios loaders (aqui podemos indicar q usamos stylus o sass)
			use: [{
					// usa el loader de estilos
					loader: 'style-loader'
				}, {
					// y luego el loader de css 
					loader: 'css-loader',
					options: {
						// Usa modulos
						modules: true,
						// nombres que tendran las clases 
						localIdentName: '[path][name]__[local]--[hash:base64:5]',
						// cuandos loaders antes del css-loader deben ser aplicados a los recursos @import
						importLoaders: 1,
						sourceMap: true
					}
				},
				'sass-loader'
			]
		}, {
			// fichero de tipo fuente
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: 'file-loader'
		}, {
			test: /\.(woff|woff2)$/,
			use: 'url-loader?prefix=font/&limit?5000'
		}, {
			test: /ttf(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=image/svg+xml'
		}]
	},
	plugins: [
		// sirve para los pluggins se puedan intercalar cuando se usa hot reloading (es parte de la conf basica cuando se usa hot reloading)
		new webpack.HotModuleReplacementPlugin(),
		// para q no salgan mensajes de error q confunden
		new webpack.NoEmitOnErrorsPlugin(),
		// podeoms usar un index.html dentro de /src q luego se compile en /build, de modo q trabajemos en /src
		// y no tener q copiar el index.html a mano dentro de la carpeta build o trabajar en el index.html dentro de /build
		new HtmlWebpackPlugin({
			title: 'Entretelas',
			template: path.join(__dirname, 'src', 'index.html'),
			filename: 'index.html'
		}),
		// para extraer todas la partes de css en un solo archivo CSS (para uso en produccion)
		new ExtractTextPlugin({
			filename: 'app.css',
			allChunks: true
		})
	],
	// configuracion del servidor, no iria en prod
	devServer: {
		host: '0.0.0.0',
		hot: true,
		port: 8080,
		// toda la transpilacion que hace webpack se incruste de modo inline en la version minificada
		inline: true,
		// URL que sirva el servidor de desarrollo
		contentBase: path.join(__dirname, 'src'),
		// permite tener un sever de dev q soporte las url que crea un SPA
		historyApiFallback: true
	}
}