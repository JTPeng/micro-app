<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Count></Count>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Count from "@/components/Count.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Count,
  },
};
</script>
