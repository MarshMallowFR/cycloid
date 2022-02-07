<template>
  <div>
    <Dialog
      :readOnly="readOnly"
      :selectedItem="selectedItem"
      :requiredFields="requiredFields"
      @createItem="createFruit"
      @toggleReadOnly="toggleReadOnly"
    />
    <Listing
      :data="fruits"
      @deleteItem="deleteItem"
      @toggleReadOnly="toggleReadOnly"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import Listing from "@/components/Listing.vue";
import Dialog from "@/components/Dialog.vue";
import { FruitEdit } from "@/pages/fruits/fruit.type";

export default Vue.extend({
  name: "FruitList",
  components: {
    Dialog,
    Listing,
  },
  data: () => {
    return {
      readOnly: false,
      selectedItem: {},
      requiredFields: {
        name: "name",
        image: "image",
        price: "price",
        color: "color",
        description: "description",
        taste: "taste",
        expires: "expires",
      },
    };
  },
  mounted() {
    this.$store.dispatch("getAllFruits");
  },
  computed: mapState(["fruits"]),
  methods: {
    deleteItem(itemId: number) {
      this.$store.dispatch("removeFruit", itemId);
    },
    createFruit(fruit: FruitEdit) {
      this.$store.dispatch("createFruit", {
        ...fruit,
        isFruit: true,
        color: fruit.color.hex,
      });
      this.selectedItem = {};
    },
    toggleReadOnly(value: boolean, fruit: FruitEdit) {
      this.readOnly = value;
      this.selectedItem = fruit || {};
    },
  },
});
</script>
