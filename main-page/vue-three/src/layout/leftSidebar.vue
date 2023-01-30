<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :unique-opened="true"
    @open="menuOpened"
    @select="select"
  >
    <template v-for="(menu, menuIndex) in leftMenuList" :key="menuIndex">
      <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.key">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="(childMenu, childIndex) in menu.children"
          :key="childIndex"
          :index="childMenu.path"
          >{{ childMenu.name }}</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item v-else :index="menu.path">
        <el-icon><Promotion /></el-icon>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup name="sidebar">
import { defineProps, defineEmits, PropType } from 'vue'
import { menuArrType } from '../types/index'
import { Location, Promotion } from '@element-plus/icons-vue'

defineProps({
  activeIndex: {
    type: String,
    default: '/'
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  leftMenuList: {
    type: Array as PropType<menuArrType[]>
  }
})

const emits = defineEmits(['menuOpened', 'activeMenu'])

const menuOpened = (key: string, keyPath: string[]) => {
  console.info('menuOpened', key, keyPath)
  // emits("menuOpened", key);
}
const select = (key: string, keyPath: string[]) => {
  console.info('select', key, keyPath)
  emits('activeMenu', key)
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  border-right: none;
}
.el-menu-vertical-demo {
  & h4 {
    font-weight: revert;
  }
  & .el-menu-item {
    font-size: 16px;
  }
  & .el-menu {
    width: 200px;
    border-right: none;
  }
  & .menu-item-text {
    font-size: 14px;
    user-select: none;
  }
}
</style>
