const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateHtmlPlugins = require('./generateHtmlPlugins.js');

const htmlPlugins = generateHtmlPlugins('./src/views');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].[chunkhash].js',
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/components'),
        use: ['raw-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
    disableHostCheck: true,
    stats: {
      colors: true,
      modules: false,
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      env: true,
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:9000' }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/fonts'),
        to: path.resolve(__dirname, 'public/fonts'),
      },
      {
        from: path.resolve(__dirname, 'src/img'),
        to: path.resolve(__dirname, 'public/img'),
      },
      {
        from: path.resolve(__dirname, 'src/robots.txt'),
        to: path.resolve(__dirname, 'public/'),
      },
      {
        from: path.resolve(__dirname, 'src/pwa/manifest.json'),
        to: path.resolve(__dirname, 'public/'),
      },
      {
        from: path.resolve(__dirname, 'src/pwa/pwabuilder-sw.js'),
        to: path.resolve(__dirname, 'public/'),
      },
    ]),
  ].concat(htmlPlugins),
};
