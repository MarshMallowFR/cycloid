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
      <button class="primary edit">Edit</button>
      <button class="primary ghost" @click="deleteItem(item.id)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Card",
  props: {
    item: {
      id: Number,
      name: String,
      description: String,
      image: String,
      price: String,
      color: String,
    },
  },
  methods: {
    deleteItem(itemId: number) {
      console.log(itemId);
      this.$emit("deleteItem", itemId);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  button.primary {
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #231e39;
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
    &.ghost {
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
