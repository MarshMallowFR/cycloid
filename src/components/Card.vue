<template>
  <div
    class="card"
    :style="{
      backgroundColor: item.color,
    }"
  >
    <img class="card-img" :src="item.image" alt="fruit" />
    <h3 class="card-details-name">{{ item.name }}</h3>
    <p class="card-details-description">{{ item.description }}</p>
    <div class="buttons">
      <button
        class="edit"
        :style="{ color: item.color }"
        @click="toggleDialog(true)"
      >
        Details
      </button>
      <button class="delete" @click="deleteItem(item.id)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Card",
  props: {
    item: Object,
  },
  methods: {
    deleteItem(itemId: number): void {
      this.$emit("deleteItem", itemId);
    },
    toggleDialog(value: boolean): void {
      this.$store.dispatch("toggleDialog", value);
      this.$emit("toggleReadOnly", value, this.item);
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #fff;
  font-weight: bold;
  padding: 32px;
  position: relative;
  width: 350px;
  max-width: 100%;
  text-align: center;

  &-img {
    border: 3px solid #fff;
    border-radius: 50%;
    padding: 7px;
    width: 100px;
    height: 100px;
  }
  button {
    width: 100px;
  }

  .edit,
  .delete {
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    padding: 10px 25px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
    &.edit {
      margin-right: 4px;
    }
    &.delete {
      background-color: transparent;
      color: #fff;
      margin-left: 4px;
    }
  }

  &-details {
    margin: 10px 0;
    padding: 2px 16px;
    &-name {
      text-transform: uppercase;
    }
    &-description {
      font-size: 12px;
      line-height: 21px;
    }
  }
}
</style>
