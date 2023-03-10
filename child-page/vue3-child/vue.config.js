const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: "vue3",
  publicPath: "/child/vue3/",
  productionSourceMap: false,
  devServer: {
    hot: false,
    port: 4009,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {},
  transpileDependencies: true,
});
