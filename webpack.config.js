const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index-shadow.js',
  output: {
    path: path.resolve(__dirname, 'site'),
    filename: 'inspector-toolbar.js',
    library: 'InspectorToolbar',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: process.env.ANALYZE ? [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../dist/bundle-report.html'
    })
  ] : [],
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, 'site'),
        publicPath: '/site',
      }
    ],
    compress: true,
    port: 8080,
    open: '/site/index.html',
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*', '*.html', 'site/**/*.html'],
    devMiddleware: {
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
};