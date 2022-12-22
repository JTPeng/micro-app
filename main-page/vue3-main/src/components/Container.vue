<template>
  <el-tabs
    v-model="storageMenuList.activeMenu"
    type="card"
    class="demo-tabs"
    @tab-click="tabClick"
    @tab-remove="tabRemove"
  >
    <el-tab-pane
      v-for="tab in storageMenuList.menuArr"
      :label="tab.name"
      :name="tab.path"
      :closable="tab.path !== '/'"
    >
      {{ tab.name }}</el-tab-pane
    >
  </el-tabs>
</template>

<script>
export default {
  name: "Container",
};
</script>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  storageMenuList: {
    type: Object,
    default: () => ({
      activeMenu: "/",
      menuArr: [
        {
          name: "首页",
          path: "/",
        },
      ],
    }),
  },
});
const emits = defineEmits(["tabToggleMenu", "removeTabMenu"]);

const tabClick = (path) => {
  props.storageMenuList.activeMenu !== path.paneName &&
    emits("tabToggleMenu", path.paneName);
};

const tabRemove = (name) => {
  emits("removeTabMenu", name);
};
</script>

<style></style>
