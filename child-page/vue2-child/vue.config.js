const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: "vue2",
  publicPath: "/child/vue2/",
  productionSourceMap: false,
  devServer: {
    hot: false,
    port: 4008,
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
