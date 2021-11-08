<template>
  <Listing :data="getFruits" @deleteItem="deleteItem" />
</template>

<script lang="ts">
import Vue from "vue";
import Listing from "@/components/Listing.vue";
import { flatten } from "@/utils/tools";

export default Vue.extend({
  name: "FruitList",
  components: {
    Listing,
  },
  mounted() {
    this.$store.dispatch("getAllFruits");
  },
  computed: {
    getFruits() {
      return flatten(this.$store.getters.allFruits.data);
    },
  },
  methods: {
    deleteItem(itemId: number) {
      this.$store.dispatch("removeFruit", itemId);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
