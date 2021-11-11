<template>
  <v-app app-data="true">
    <v-main>
      <FruitList />
    </v-main>
  </v-app>
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
