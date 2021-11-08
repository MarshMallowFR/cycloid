import Vue from "vue";
import Vuex from "vuex";
import { Fruit } from "@/pages/fruits/fruit.type";
import { getAllFruits } from "@/pages/fruits/fruitApi";

Vue.use(Vuex);

const url = "http://localhost:3000";

type State = {
  fruits: any;
};

export default new Vuex.Store({
  state: {
    fruits: [],
  },
  mutations: {
    GET_ALL_FRUITS(state: State, fruits: any) {
      // console.log({ fruits });
      state.fruits = fruits;
    },
  },
  actions: {
    async getAllFruits({ commit }): Promise<void> {
      return fetch(`${url}/fruit`)
        .then((res: Response) => res.json())
        .then((data) => {
          commit("GET_ALL_FRUITS", data);
        });
    },
    getFruit({ commit }, fruitId: number): void {
      fetch(`${url}/fruit/${fruitId}`).then((res: Response) =>
        commit("GET_FRUIT", res.json())
      );
    },
    async removeFruit({ commit }, fruitId: number): Promise<void> {
      await fetch(`${url}/fruit/${fruitId}`, {
        method: "DELETE",
      }).then(async () => {
        return getAllFruits();
      });
    },
    createFruit({ commit }, fruit: Fruit): void {
      fetch(`${url}/fruit`, {
        method: "POST",
        body: JSON.stringify(fruit),
      }).then((res: Response) => res.json());
    },
  },
  getters: {
    allFruits(state) {
      return state.fruits;
    },
  },
  modules: {},
});
