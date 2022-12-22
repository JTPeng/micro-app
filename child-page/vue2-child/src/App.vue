<template>
  <div id="app">
    <nav>
      <router-link to="/">Home2</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  created() {
    console.info(
      "window.__MICRO_APP_ENVIRONMENT__",
      window.__MICRO_APP_ENVIRONMENT__
    );
    // 微前端环境下 监听子应用是否被缓存
    if (window.__MICRO_APP_ENVIRONMENT__) {
      this.toListener();
    }
    console.info("child", sessionStorage.getItem("main-tabList"));
  },
  methods: {
    // 子应用内部跳转时，通知侧边栏改变菜单状态
    onRouteChange() {
      console.info(
        "window.__MICRO_APP_ENVIRONMENT__",
        window.__MICRO_APP_ENVIRONMENT__
      );
      if (window.__MICRO_APP_ENVIRONMENT__) {
        // 发送全局数据，通知侧边栏修改菜单展示
        window.microApp.setGlobalData({ name: window.__MICRO_APP_NAME__ });
      }
    },
    toListener() {
      window.addEventListener("appstate-change", (e) => {
        if (e.detail.appState === "afterhidden") {
          console.log("已卸载");
        } else if (e.detail.appState === "beforeshow") {
          console.log("即将重新渲染");
          console.info("toListener", this.$route);
          console.info("toListener", location);
          // 重新设置 url地址  
          // 参考 https://cangdu.org/micro-app/docs.html#/zh-cn/keep-alive
          location.href += `#${this.$route.path}`;
        } else if (e.detail.appState === "aftershow") {
          console.log("已经重新渲染");
        }
      });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
