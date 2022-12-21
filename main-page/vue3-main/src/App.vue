<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-active="activeIndex" @select="selectMenu">
          <template v-for="menu in menuList" :key="menu.path">
            <el-sub-menu
              v-if="menu.children && menu.children.length > 0"
              :index="menu.path"
            >
              <template #title>
                <el-icon><message /></el-icon>{{ menu.name }}
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="childMenu in menu.children"
                  :key="childMenu.path"
                  :index="childMenu.path"
                  >{{ childMenu.name }}</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item :index="menu.path" v-else>
              <template #title>
                <el-icon><message /></el-icon>{{ menu.name }}
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="container-right-outer">
      <div class="container-right">
        <div class="top-menu-list">
          <Container
            :storageMenuList="storageMenuList"
            @tabToggleMenu="tabToggleMenu"
            @removeTabMenu="removeTabMenu"
          ></Container>
        </div>
        <el-header>
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
      </div>
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Message, Setting } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Container from "./components/Container.vue";
import { setSessionStorage } from "./utils/storage";
const activeIndex = ref("/");
const router = useRouter();
const menuList = ref([
  {
    name: "首页",
    path: "/",
  },
  {
    name: "micro child",
    path: "",
    children: [
      {
        name: "vue2",
        path: "/vue2",
      },
      {
        name: "vue3",
        path: "/vue3",
      },
    ],
  },
]);
const storageMenuList = reactive({
  activeMenu: "/",
  menuArr: [
    {
      name: "首页",
      path: "/",
    },
  ],
});

let flatMenuList = [];

const changeMenuList = (arr = "") => {
  const list = arr || menuList.value;
  list.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      changeMenuList(menu.children);
    }
    !menu.children && flatMenuList.push(menu);
  });
};

onMounted(() => {
  changeMenuList();
  storageTabList();
});

// 用户点击菜单时控制基座应用跳转
const selectMenu = (path) => {
  const { menuArr } = storageMenuList;
  const target = menuArr.find((item) => item.path === path);
  if (!target) {
    const menu = flatMenuList.find((item) => item.path === path);
    const list = [...storageMenuList.menuArr, menu];
    modifyMenuList(path, list);
  }
  activeIndex.value = path;
  router.push(path);
};

const tabToggleMenu = (path) => {
  activeIndex.value = path;
  modifyMenuList(path);
  router.push(path);
};

const removeTabMenu = (name) => {
  let routerPath = "";
  const list = storageMenuList.menuArr.filter((item, index) => {
    console.info("removeTabMenu", item.path, name);
    if (item.path === name) {
      routerPath = storageMenuList.menuArr[index - 1].path;
    }
    return item.path !== name;
  });
  modifyMenuList(routerPath, list);
  router.push(routerPath);
};

const storageTabList = () => {
  setSessionStorage("tabList", JSON.stringify(storageMenuList));
};

const modifyMenuList = (path, list = storageMenuList.menuArr) => {
  storageMenuList.activeMenu = path;
  storageMenuList.menuArr = [...list];
  storageTabList();
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
.container-right-outer {
  flex-direction: column;
}
.container-right {
  display: flex;
  align-items: end;
  justify-content: space-between;
}
</style>
