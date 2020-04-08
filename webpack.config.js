const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "frontend/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/"),
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
};
