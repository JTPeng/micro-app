<template>
  <el-container class="main-container">
    <el-aside class="sidebar" :class="{ isCollapse: isCollapse }">
      <el-scrollbar>
        <Sidebar
          :activeIndex="activeIndex"
          :leftMenuList="leftMenuList"
          :isCollapse="isCollapse"
          @menuOpened="menuOpened"
          @activeMenu="activeMenu"
        ></Sidebar>
      </el-scrollbar>
    </el-aside>
    <el-container class="content">
      <el-header>
        <div class="content-collapse">
          <el-icon @click="toggleSidebar">
            <expand v-if="isCollapse" />
            <fold v-else />
          </el-icon>
        </div>
        <TabsMenu
          :tabMenuLists="tabMenuLists"
          @tabToggleMenu="tabToggleMenu"
          @removeTabMenu="removeTabMenu"
        ></TabsMenu>
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
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { $ref } from "vue/macros";
import { useRouter } from "vue-router";
import TabsMenu from "layout/tabsMenu.vue";
import Sidebar from "layout/sidebar.vue";
import { menuListType, menuArrType } from "./types/index";
import { getSessionStorage, setSessionStorage } from "./utils/storage";
import { Setting, Expand, Fold } from "@element-plus/icons-vue";

const router = useRouter();
let activeIndex: string = $ref("/");
let isCollapse: boolean = $ref(false);
const leftMenuList: menuArrType[] = $ref([
  {
    name: "首页",
    path: "/",
  },
  {
    name: "学生管理",
    key: "studentManager",
    path: "",
    children: [
      {
        name: "学员列表",
        path: "/about",
        url: "",
      },
      {
        name: "订单管理",
        path: "/vue3",
        url: "",
      },
      {
        name: "课时统计",
        path: "/vue3/about",
        url: "",
      },
    ],
  },
  {
    name: "财务管理",
    key: "financeManager",
    path: "",
    children: [
      {
        name: "数据导出",
        path: "/dataExport",
        url: "",
      },
      {
        name: "缴费审批",
        path: "/approve",
        url: "",
      },
      {
        name: "退费审批",
        path: "/returnMoney",
        url: "",
      },
    ],
  },
]);
console.info("leftMenuList", leftMenuList);
let tabMenuLists: menuListType = $ref({
  activeMenu: "/",
  menuArr: [
    {
      path: "/",
      name: "首页",
    },
  ],
});
// 监听浏览器前进后退按钮，激活对应菜单

window.addEventListener("popstate", () => getActiveIndex());
// 扁平化菜单 便于后续查找
let flatMenuList: menuArrType[] = [];
function changeMenuList(arr: menuArrType[], key: string = "") {
  const list: menuArrType[] = arr;
  list.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      changeMenuList(menu.children, menu.key);
    }
    !menu.children && flatMenuList.push({ ...menu, key });
  });
  console.info("flatMenuList", flatMenuList);
}
changeMenuList(leftMenuList);
// 获取存储的tab菜单数据
function getStorageMenuList() {
  const res: string = getSessionStorage("menuList") || "";
  console.info("getStorageMenuList", res);
  res && (tabMenuLists = JSON.parse(res));
  getActiveIndex();
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

getStorageMenuList();

// 用户点击菜单时控制基座应用跳转
function activeMenu(path: string) {
  console.info("activeMenu", path);
  const { menuArr } = tabMenuLists;
  const target = menuArr.find((item) => item.path === path);
  // 菜单不存在
  if (!target) {
    const currentMenu: any = flatMenuList.find((item) => item.path === path);
    const list: menuArrType[] = [...tabMenuLists.menuArr, currentMenu];
    modifyMenuList(path, list);
  } else {
    // tab菜单存在
    modifyMenuList(path, []);
  }
  // 路由跳转
  router.push(path);
}

/**
 * 打开菜单
 * @param key 当前菜单的index
 * @param keyPath 当前菜单的index数组
 */
const menuOpened = (key: string) => {
  const target = leftMenuList.find((item) => item.key === key);
  let name: string = key;
  if (target) {
    const { children } = target;
    name = (children as Array<menuArrType>)[0].path;
  }
  activeMenu(name);
  console.log("menuOpened", name);
};

const modifyMenuList = (path: string, list: menuArrType[]) => {
  tabMenuLists.activeMenu = path;
  activeIndex = path;
  list.length > 0 && (tabMenuLists.menuArr = [...list]);
  storageTabList();
};

const storageTabList = () => {
  setSessionStorage("menuList", JSON.stringify(tabMenuLists));
};

const toggleSidebar = () => {
  isCollapse = !isCollapse;
};

/**
 * tab切换菜单
 * @param path route地址
 */
const tabToggleMenu = (path: string) => {
  modifyMenuList(path, []);
  router.push(path);
};

const removeTabMenu = (path: string) => {
  let routerPath: string = "";
  const list = tabMenuLists.menuArr.filter((item, index) => {
    if (item.path === path) {
      routerPath = tabMenuLists.menuArr[index - 1].path;
    }
    return item.path !== path;
  });
  console.info("removeTabMenu", path);
  modifyMenuList(routerPath, list);
  router.push(routerPath);
};
</script>

<style lang="postcss" scoped>
.main-container {
  display: flex;
  & .sidebar {
    width: 200px;
    &.isCollapse {
      width: 60px;
    }
  }
  & .content {
    & .el-header {
      display: flex;
      align-items: center;
      height: auto;
      padding: 10px 20px 0px;
      & .content-collapse {
        vertical-align: middle;
        & > .el-icon {
          font-size: 24px;
        }
      }
    }
    & .el-main {
      background: #eee;
      & > .el-card {
        height: calc(100vh - 104px);
        & >>> .el-card__body {
          padding: 0;
          height: 100%;
        }
      }
    }
  }
}
</style>
