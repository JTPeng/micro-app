<template>
  <h1>vue3 {{ isKeepAlive }}</h1>
  <h3>{{ menuList.flatMenuList }}</h3>
  <micro-app
    name="appname-vue3"
    :url="url"
    baseroute="/main-vue3/app-vue3"
    :data="microAppData"
    @created="handleCreate"
    @beforemount="handleBeforeMount"
    @mounted="handleMount"
    @unmount="handleUnmount"
    @error="handleError"
    @datachange="handleDataChange"
    :keep-alive="isKeepAlive"
  ></micro-app>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import config from "../config";
import { useMenuList } from "../store/useMenuList";

const url = ref(`${config.vue3}/child/vue3/`);
const microAppData = reactive({ msg: "来自基座的数据" });
const menuList = useMenuList();

const handleCreate = () => {
  console.log("child-vue3 创建了");
};

const handleBeforeMount = () => {
  console.log("child-vue3 即将被渲染");
};

const handleMount = () => {
  console.log("child-vue3 已经渲染完成");
  setTimeout(() => {
    microAppData.msg = "来自基座的新数据";
  }, 2000);
};

const handleUnmount = () => {
  console.log("child-vue3 卸载了");
};

const handleError = () => {
  console.log("child-vue3 加载出错了");
};

const handleDataChange = (e) => {
  console.log("来自子应用 child-vue3 的数据:", e.detail.data);
};

const isKeepAlive = computed(() => {
  const bool = menuList.flatMenuList.find((item) => item.path === "/vue3");
  return bool.isKeepAlive;
});
</script>

<style></style>
