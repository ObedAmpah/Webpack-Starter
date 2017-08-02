import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'


// Define our directory paths
const paths = {
  appRoot: __dirname,
  outputRoot: path.join(__dirname, 'dist')
}

// Define our entry points
const entries = [
  './src/index.js'
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
    template: path.join(paths.appRoot, '/src/index.html')
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'node-static',
    filename: 'node-static.js',
    minChunks(module, count) {
      const context = module.context
      return context && context.indexOf('node_modules') >= 0
    }
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'static'
  })
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

  // Define our modules
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
      }
    ]
  },

  // Set our plugins
  plugins: plugins,

  // Deal with extensions
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}

module.exports = merge(config)
