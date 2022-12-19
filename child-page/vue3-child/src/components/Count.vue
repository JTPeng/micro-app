<template>
  <h1>{{ count }}</h1>
  <button @click="addCount">addCount</button>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
const addCount = () => {
  count.value++;
};
</script>
