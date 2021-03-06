import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'


// Define our directory paths
const paths = {
  appRoot: __dirname,
  outputRoot: path.join(__dirname, 'dist')
}

// Define our entry points
const entries = [
  './src/index.js',
  './assets/styles/master.scss'
]

// Define our plugins
const plugins = [
  new webpack.HotModuleReplacementPlugin(),

  new CleanWebpackPlugin(['dist'], {
    root: paths.appRoot,
    dry: false,
    watch: true
  }),

  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(paths.appRoot, '/src/index.html'),
    chunksSortMode: 'dependency'
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: true
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'node-static',
    filename: 'node-static.js',
    minChunks(module, count) {
      const context = module.context
      return context && context.indexOf('node_modules') >= 0
    }
  }),

  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),

  // UnComment for bundle analysis

  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static'
  // })
]

const config = {
  context: paths.appRoot,
  devtool: 'eval',
  entry: entries,

  // Define our ouput point
  output: {
    path: paths.outputRoot,
    filename: '[name].bundle.js',
    chunkFilename: '[name].js'
  },

  // modules
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },

  // plugins
  plugins: plugins,

  // extensions
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}

module.exports = merge(config)
