<template>
  <ul class="list">
    <li v-for="item of data" :key="item.id">
      <Card :item="item" v-on="$listeners" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";

export default Vue.extend({
  name: "Listing",
  components: {
    Card,
  },
  props: {
    data: Array,
  },
});
</script>

<style scoped lang="scss">
ul.list {
  width: 75%;
  margin: auto;
  padding: 0;
}

li {
  list-style: none;
  width: 100%;
  margin: 32px auto;
  display: flex;
  justify-content: center;
}
</style>
