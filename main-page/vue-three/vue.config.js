const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "main-vue3",
  publicPath: "/",
  productionSourceMap: false,
  devServer: {
    hot: false,
    port: 3000,
    // open: true,
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // jsonpFunction: `webpackJsonp-main-vue3`,
    },
    resolve: {
      extensions: [],
      alias: {
        assets: "@/assets",
        utils: "@/utils",
        components: "@/components",
        layout: "@/layout",
        types: "@/types",
      },
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
          isCustomElement: (tag) => /^micro-app/.test(tag),
        };
        return {
          ...options,
          reactivityTransform: true,
        };
      });
  },
});
