const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"], // for Bootstrap etc.
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              // ✅ Use the new Dart Sass API
              sassOptions: {
                quietDeps: true, // optional: silences warnings from node_modules
              },
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(mp4|webm|mov)$/i,
        type: "asset/resource",
        generator: {
          filename: "media/[name].[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
};
