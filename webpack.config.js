const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

const projectRoot = path.resolve(__dirname);
const sourceCodeRoot = path.resolve(projectRoot, 'src');
const distRoot = path.resolve(projectRoot, 'dist');

// base config
const cfg = {
  mode: isProduction ? 'production' : 'development',
  target: 'web',
  entry: {
    app: path.resolve(sourceCodeRoot, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: distRoot
  },
  plugins: [],
  module: {
    rules: [],
    noParse: [
      /\.min\.js/
    ]
  }
};

// process JS code
cfg.module.rules.push({
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader'
    }
  ],
  exclude: [/node_modules/]
});

// process CSS code
const cssRule = {
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader'
    }
  ]
};

if (isProduction) {
  cssRule.use.unshift({
    loader: MiniCssExtractPlugin.loader
  });
} else {
  cssRule.use.unshift({
    loader: 'style-loader'
  });
}

cfg.module.rules.push(cssRule);

if (isProduction) {
  cfg.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].css',
    allChunks: true
  }));
}

// process HTML templates
cfg.module.rules.push({
  test: /\.tpl\.html/,
  use: {
    loader: 'html-loader',
    options: {
      minimize: isProduction
    }
  }
});

// setup dev server
if (!isProduction) {
  cfg.devServer = {
    host: 'localhost',
    port: 3000,
    stats: 'minimal',
    contentBase: distRoot,
    disableHostCheck: true
  };
}

// setup HTML entries
cfg.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(sourceCodeRoot, 'index.html'),
  minify: false
}));

// clean release directory before production build
if (isProduction) {
  cfg.plugins.push(new CleanWebpackPlugin([
    distRoot
  ]));
}

// optimizations
if (isProduction) {
  cfg.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  };
}

module.exports = cfg;
