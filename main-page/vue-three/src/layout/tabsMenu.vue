<template>
  <el-tabs
    v-model="tabMenuLists.activeMenu"
    type="card"
    class="tabs"
    @tab-click="tabClick"
    @tab-remove="tabRemove"
  >
    <el-tab-pane
      v-for="tab in tabMenuLists.menuArr"
      :label="tab.name"
      :name="tab.path"
      :closable="tab.path !== '/'"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default {
  name: "tabsMenu",
};
</script>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from "vue";
import { menuListType } from "../types/index";
const props = defineProps({
  tabMenuLists: {
    type: Object as PropType<menuListType>,
    default: () => ({
      activeMnu: "/",
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

const tabClick = (path: object) => {
  console.info("tabClick", path);
  // props.tabMenuLists.activeMenu !== path.paneName &&
  //   emits("tabToggleMenu", path.paneName);
};

const tabRemove = (name: string) => {
  console.info("tabRemove", name);
  // emits("removeTabMenu", name);
};
</script>

<style lang="postcss" scoped>
.el-tabs {
  flex: auto;
  --el-tabs-header-height: 36px;
  padding: 0 10px;
  & >>> .el-tabs__header {
    border-bottom: none;
    & .el-tabs__nav {
      /* border: 1px solid; */
      border-bottom: 1px solid #e4e7ed;
    }
  }
}
</style>
