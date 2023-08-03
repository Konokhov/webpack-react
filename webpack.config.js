const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const srcPath = path.resolve(__dirname, "src");
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

module.exports = {
  entry: path.join(srcPath, "index.js"),
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    modules: ["node_modules"]
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: [{loader: "babel-loader"}],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer"
                ]
              }
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset/resource",
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebPackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    new ForkTsCheckerPlugin(),
    isDev && new ReactRefreshPlugin()
  ].filter(Boolean),
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 9001,
    historyApiFallback: true,
    hot: true,
  }
}