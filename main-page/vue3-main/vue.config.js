const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: "main-vue3",
  publicPath: "/main-vue3/",
  productionSourceMap: false,
  devServer: {
    hot: false,
    port: 3000,
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      jsonpFunction: `webpackJsonp-main-vue3`,
    },
  },
  chainWebpack: (config) => {
    // config.resolve.alias.set("@micro-zoe/micro-app", path.join(__dirname, '../../../micro-app/lib/index.esm.js'))
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => /^micro-app/.test(tag), // micro-app标签不识别问题
        };
        return options;
      });
  },
  transpileDependencies: true,
});
