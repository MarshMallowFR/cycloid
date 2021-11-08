<template>
  <ul>
    <li v-for="fruit of getFruits" :key="fruit.id">{{ fruit.name }}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { flatten } from "@/utils/tools";

export default Vue.extend({
  name: "FruitList",
  mounted() {
    this.$store.dispatch("getAllFruits");
  },
  computed: {
    getFruits() {
      return flatten(this.$store.getters.allFruits.data);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
