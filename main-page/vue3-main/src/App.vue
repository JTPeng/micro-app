<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-active="activeIndex" @select="selectMenu">
          <el-menu-item index="/">Home</el-menu-item>
          <el-sub-menu index="/child">
            <template #title>
              <el-icon><message /></el-icon>micro child
            </template>
            <el-menu-item-group>
              <el-menu-item index="/vue2">vue2</el-menu-item>
              <el-menu-item index="/vue3">vue3</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Message, Setting } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const activeIndex = ref("/");
const microAppData = ref();
const router = useRouter();
// 判断微前端环境
if (window.__MICRO_APP_ENVIRONMENT__) {
  // 获取基座下发的数据
  microAppData.value = window.microApp.getData();

  // 全局数据监听，监听来自其它子应用页面跳转，控制侧边栏的菜单展示
  // 因为子应用之间无法直接通信，这里采用全局数据通信
  window.microApp.addGlobalDataListener((data) => {
    console.log("全局数据:", data);
    this.getActiveIndex();
  });
}
// 用户点击菜单时控制基座应用跳转
const selectMenu = (index, indexPath) => {
  console.info("selectMenu", index, indexPath, microAppData.value);
  if (microAppData.value) {
    // 因为 child-vite 和 child-react17 子应用是hash路由，所以需要传递hash值
    let hash = null;
    if (index === "/app-vite/page2" || index === "/app-react17/page2") {
      const pathArr = index.split("/");
      index = "/" + pathArr[1];
      hash = "/" + pathArr[2];
    }

    // 获取子应用appName
    const appName = indexPath[0];

    // 控制基座跳转页面，并渲染子应用
    this.microAppData.pushState(appName, index, hash);
  } else {
    console.info("router", router);
    index && router.push(index);
  }
};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  /* background-color: var(--el-color-primary-light-7); */
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  /* background: var(--el-color-primary-light-8); */
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
