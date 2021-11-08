<template>
  <div id="app">
    <FruitList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FruitList from "@/pages/fruits/FruitList.vue";

export default Vue.extend({
  name: "App",
  components: {
    FruitList,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
