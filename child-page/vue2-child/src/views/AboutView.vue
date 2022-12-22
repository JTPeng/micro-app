<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>{{ count }}</h3>
    <button @click="addCount">addCount</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addCount() {
      this.count++;
    },
  },
};
</script>
