var webpack = require('webpack');
var path = require('path')

module.exports = {
  entry: {
    'react-notification': './src/index.js',
    'react-notification.min': './src/index.js'
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd',
    library: 'ReactNotification',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: { warnings: false }
    })
  ],

  module: {
    rules: [
      {
        test: /prop-types/,
        use: 'null-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1'],
            plugins: [
              require('babel-plugin-transform-react-remove-prop-types').default,
            ],
          },
        },
      },
    ],
  }
};
