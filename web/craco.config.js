const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components/"),
      '@styles': path.resolve(__dirname, "src/assets/styles/"),
      '@images': path.resolve(__dirname, "src/assets/images/"),
      '@utils': path.resolve(__dirname, "src/utils/")
    }
  }
}