const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = ["./src/client/js/"];

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    date: BASE_JS + "date.js",
    commentSection: BASE_JS + "commentSection.js",
    reviewRating: BASE_JS + "reviewRating.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
