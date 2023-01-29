<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :unique-opened="true"
    @open="menuOpened"
    @select="select"
  >
    <template v-for="menu in leftMenuList">
      <el-sub-menu
        v-if="menu.children && menu.children.length > 0"
        :index="menu.key"
      >
        <template #title>
          <el-icon><location /></el-icon>{{ menu.name }}
        </template>
        <el-menu-item
          v-for="(childMenu, childIndex) in menu.children"
          :key="childIndex"
          :index="childMenu.path"
          >{{ childMenu.name }}</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item v-else :index="menu.path">
        <template #title>
          <el-icon><promotion /></el-icon>{{ menu.name }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup name="sidebar">
import { defineProps, defineEmits, PropType } from "vue";
import { menuArrType } from "../types/index";
import { Location, Promotion } from "@element-plus/icons-vue";

const props = defineProps({
  activeIndex: {
    type: String,
    default: "/",
  },
  isCollapse: {
    type: Boolean,
    default: false,
  },
  leftMenuList: {
    type: Array as PropType<menuArrType[]>,
  },
});

const emits = defineEmits(["menuOpened", "activeMenu"]);

const menuOpened = (key: string, keyPath: string[]) => {
  console.info("menuOpened", key, keyPath);
  // emits("menuOpened", key);
};
const select = (key: string, keyPath: string[]) => {
  console.info("select", key, keyPath);
  emits("activeMenu", key);
};
</script>

<style></style>
