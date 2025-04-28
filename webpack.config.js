// package.json のscript.buildにwebpackでビルドすることを記載しているので、
// 下記の設定が読み込まれてビルがが行なわれる

const path = require('path')

module.exports = {
  mode: 'development', // ← この行を追加
  entry: path.resolve(__dirname, './src/main.ts'), // path.resolve を使用
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // ← これを確認または追加
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // vue-loader を追加
      },
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/, // CSS ファイルを処理するためのルールを追加
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.html'],
    modules: ['node_modules'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    // ← ここに devServer の設定を書きます
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/', // ← もしあれば確認
    },
    port: 8080,
    hot: true,
    historyApiFallback: false, // 必要に応じて設定
  },
}
