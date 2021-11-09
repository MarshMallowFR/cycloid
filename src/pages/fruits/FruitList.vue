<template>
  <div>
    <Dialog />
    <Listing :data="getFruits" @deleteItem="deleteItem" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Listing from "@/components/Listing.vue";
import Dialog from "@/components/Dialog.vue";
import { flatten } from "@/utils/tools";

export default Vue.extend({
  name: "FruitList",
  components: {
    Dialog,
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
