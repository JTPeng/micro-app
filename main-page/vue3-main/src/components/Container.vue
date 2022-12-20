<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="tabClick"
  >
    <el-tab-pane label="User" name="first"></el-tab-pane>
    <el-tab-pane label="Config" name="second"></el-tab-pane>
    <el-tab-pane label="Role" name="third"></el-tab-pane>
    <el-tab-pane label="Task" name="fourth"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Container",
};
</script>

<script setup>
import { ref } from "vue";
import { useMenuList } from "../store/useMenuList";

const activeName = ref("/");
const tabClick = (e) => {
  console.info("tabClick", e);
};
</script>

<style></style>
