<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @select="select"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/">
      <el-icon><promotion /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-sub-menu index="vue-appName">
      <template #title>
        <el-icon><location /></el-icon>
        <span>vue-first</span>
      </template>
      <el-menu-item index="appName-one">item one</el-menu-item>
      <el-menu-item index="appName-two">item two</el-menu-item>
      <el-menu-item index="appName-three">item three</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="react-appName">
      <el-icon><odometer /></el-icon>
      <template #title>react-name</template>
    </el-menu-item>
    <el-menu-item index="vite-appName" disabled>
      <el-icon><document /></el-icon>
      <template #title>vite name</template>
    </el-menu-item>
    <el-menu-item index="angular-appName">
      <el-icon><setting /></el-icon>
      <template #title>angular name</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { $ref } from "vue/macros";
import microApp, { getActiveApps } from "@micro-zoe/micro-app";
import { useRoute, useRouter } from "vue-router";
import {
  Document,
  Location,
  Setting,
  Promotion,
  Odometer,
} from "@element-plus/icons-vue";
let activeIndex: string = $ref("/");
let microAppData: any = $ref("");
let isCollapse: boolean = $ref(false);

const router = useRouter();
getActiveIndex();
// 监听浏览器前进后退按钮，激活对应菜单
window.addEventListener("popstate", () => getActiveIndex());
console.info(
  "window.__MICRO_APP_ENVIRONMENT__",
  (window as any).__MICRO_APP_ENVIRONMENT__
);
// 判断微前端环境
if ((window as any).__MICRO_APP_ENVIRONMENT__) {
  // 获取基座下发的数据
  microAppData = (window as any).microApp
    .getData()(
      // 全局数据监听，监听来自其它子应用页面跳转，控制侧边栏的菜单展示
      // 因为子应用之间无法直接通信，这里采用全局数据通信
      window as any
    )
    .microApp.addGlobalDataListener((data: any) => {
      console.log("全局数据:", data);
      getActiveIndex();
    });
}
// 用户点击菜单时控制基座应用跳转
function select(index: string, indexPath: string) {
  console.info("select", index, indexPath);
  if (microAppData) {
    // 因为 child-vite 和 child-react17 子应用是hash路由，所以需要传递hash值
    let hash = null;
    if (index === "/app-vite/page2" || index === "/app-react17/page2") {
      const pathArr = index.split("/");
      index = "/" + pathArr[1];
      hash = "/" + pathArr[2];
    }
    // 获取子应用appName
    const appName = indexPath[0];
    console.info("select", index, indexPath);
    // 控制基座跳转页面，并渲染子应用
    pushState(appName, index, hash);
  }
}

function pushState(appName: string, path: string, hash: string | null) {
  /**
   * 当子应用还未渲染，通过基座控制路由跳转，子应用在初始化时会自己根据url渲染对应的页面
   * 当子应用已经渲染，则直接控制子应用进行内部跳转
   *
   * getActiveApps: 用于获取正在运行的子应用
   */
  // 子应用未渲染
  if (!getActiveApps().includes(appName)) {
    // child-vite 和 child-react17子应用为hash路由，这里拼接一下hash值
    hash && (path += `/#${hash}`);
    // 主应用跳转
    router.push(path);
  } else {
    // 子应用已渲染 主应用下发路由地址，让子应用自己跳转
    let childPath = null;
    // child-vite 和 child-react17子应用是hash路由，hash值就是它的页面地址，这里单独处理
    if (hash) {
      childPath = hash;
    } else {
      // path的值形式如：/app-vue2/page2，这里/app-vue2是子应用的基础路由，/page2才是页面地址，所以我们需要将/app-vue2部分删除
      childPath = path.replace(/^\/app-[^/]+/, "");
      !childPath && (childPath = "/"); // 防止地址为空
    }
    // 主应用通过下发data数据控制子应用跳转
    microApp.setData(appName, { path: childPath });
  }
}
// 根据url地址获取选中菜单
function getActiveIndex() {
  // location.pathname的值通常为：/main-angular11/app-vue2/page2，我们只取`/app-vue2/page2`
  const pathArr = location.pathname.match(/\/app-.+/);
  activeIndex = pathArr ? pathArr[0].replace(/\/$/, "") : "/";

  let hash = "";
  if (location.hash) {
    hash = location.hash.split("?")[0];
  }
  // 兼容 child-vite 和 child-react17 子应用，因为它们是hash路由
  if (
    (activeIndex === "/app-vite" || activeIndex === "/app-react17") &&
    hash.includes("page2")
  ) {
    activeIndex += hash.replace(/^#/, "");
  }

  // 去除斜线后缀，如：/app-vue2/ 转换为 /app-vue2
  if (activeIndex !== "/") {
    activeIndex = activeIndex.replace(/\/$/, "");
  }

  return activeIndex;
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log("handleOpen", key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log("handleClose", key, keyPath);
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#sidebar-app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: inline-block;
  margin-right: 40px;
  border-right: 1px solid rgb(230, 230, 230);
}

h4 {
  font-weight: revert;
}

.el-menu-item {
  font-size: 16px;
}

.el-menu {
  width: 200px;
  border-right: none;
}

.submenu-text {
  font-size: 16px;
  user-select: none;
}

.menu-item-text {
  font-size: 14px;
  user-select: none;
}
</style>
