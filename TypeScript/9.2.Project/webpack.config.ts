import path from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";
import Dotenv from "dotenv-webpack";

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
  resolve: {
    extensions: [".ts", ".js"],
    fallback: { os: false },
  },
  plugins: [new Dotenv()],
};

export default config;
