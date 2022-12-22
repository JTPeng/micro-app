<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
onMounted(() => {
  console.info("child-vue3", sessionStorage.getItem("main-tabList"));
  console.info("child-vue3", window.__MICRO_APP_ENVIRONMENT__);
  if (window.__MICRO_APP_ENVIRONMENT__) {
    toListener();
  }
});
const toListener = () => {
  window.addEventListener("appstate-change", (e) => {
    if (e.detail.appState === "afterhidden") {
      console.log("child-vue3已卸载");
    } else if (e.detail.appState === "beforeshow") {
      console.log("child-vue3,即将重新渲染");
      console.info("toListener", route.path);
      console.info("toListener", location);
      // 重新设置 url地址
      // 参考 https://cangdu.org/micro-app/docs.html#/zh-cn/keep-alive
      location.href += `#${route.path}`;
    } else if (e.detail.appState === "aftershow") {
      console.log("child-vue3,已经重新渲染");
    }
  });
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
