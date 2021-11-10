import Vue from "vue";
import Vuex from "vuex";
import { Fruit, FruitFetched } from "@/pages/fruits/fruit.type";
import { flatten } from "@/utils/tools";

Vue.use(Vuex);

const url = "http://localhost:3000";

export type State = {
  fruits: FruitFetched[];
  showDialog: boolean;
};

export default new Vuex.Store({
  state: {
    fruits: [],
    showDialog: false,
  },
  mutations: {
    GET_ALL_FRUITS(state: State, fruits: FruitFetched[]) {
      state.fruits = fruits;
    },
    SHOW_DIALOG(state: State, value: boolean) {
      state.showDialog = value;
    },
  },
  actions: {
    async getAllFruits({ commit }): Promise<void> {
      return fetch(`${url}/fruit`)
        .then((res: Response) => res.json())
        .then((data) => {
          commit("GET_ALL_FRUITS", flatten(data.data));
        });
    },
    async removeFruit({ dispatch }, fruitId: number): Promise<void> {
      return fetch(`${url}/fruit/${fruitId}`, {
        method: "DELETE",
      }).then(async () => {
        return dispatch("getAllFruits");
      });
    },
    async createFruit({ dispatch }, fruit: Fruit): Promise<void> {
      return fetch(`${url}/fruit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fruit),
      }).then(async () => {
        return dispatch("getAllFruits");
      });
    },
    toggleDialog({ commit }, value: boolean): void {
      commit("SHOW_DIALOG", value);
    },
  },
  getters: {},
  modules: {},
});
