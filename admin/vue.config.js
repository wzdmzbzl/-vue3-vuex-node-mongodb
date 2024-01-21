const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/adminapi": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})
