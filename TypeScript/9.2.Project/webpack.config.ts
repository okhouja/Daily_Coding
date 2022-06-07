import path from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
const api_Key = process.env.GOOGLE_API_KEY;

const config: Configuration = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  devtool: "inline-source-map",
  // target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  stats: { children: true },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: { os: false },
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: false,
      env: process.env.NODE_ENV,
      apiUrl: `https://maps.googleapis.com/maps/api/js?key=${api_Key}`,
    }),
  ],
};

export default config;
