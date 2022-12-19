import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 与基座进行数据交互
function handleMicroData(router) {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log("child-vue3 getData:", window.microApp.getData());

    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log(
        "child-vue3 addDataListener:",
        data,
        router.currentRoute.value.path
      );

      // 当基座下发path时进行跳转
      if (data.path && data.path !== router.currentRoute.value.path) {
        router.push(data.path);
      }
    });

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ myname: "child-vue3" });
    }, 3000);
  }
}
handleMicroData(router);

createApp(App).use(router).mount("#app");
