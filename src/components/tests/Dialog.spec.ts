import Vue from "vue";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import Vuetify from "vuetify";
import { State } from "@/store/index";
import Dialog from "@/components/Dialog.vue";
import { fakeFruitsFlatten } from "@/utils/tests/fruits.fixtures";
// To mock HTMLCanvasElement.prototype.getContext
import "jest-canvas-mock";

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("Dialog.vue", () => {
  let actions: {
    toggleDialog: () => void;
  };
  let store: Store<State>;
  let state: State;
  let vuetify: Vuetify;

  beforeEach(() => {
    // Avoid Vuetify warning in console
    const app = document.createElement("div");
    app.setAttribute("data-app", "true");
    document.body.appendChild(app);

    vuetify = new Vuetify();
    actions = {
      toggleDialog: jest.fn(),
    };
    state = {
      showDialog: false,
      fruits: fakeFruitsFlatten,
    };
    store = new Vuex.Store({
      actions,
      state,
    });
  });

  it('trigger dialog when click on Add Fruit button"', () => {
    const wrapper = mount(Dialog, {
      store,
      localVue,
      vuetify,
      propsData: {
        readOnly: false,
        selectedItem: {},
        requiredFields: {},
      },
    });
    const button = wrapper.find(".add-btn");
    button.trigger("click");
    expect(actions.toggleDialog).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().toggleReadOnly).toEqual([[false, {}]]);
  });
  it("trigger save button successfully", async () => {
    const wrapper = shallowMount(Dialog, {
      store,
      localVue,
      vuetify,
      propsData: {
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
      },
    });

    const newItem = {
      name: "test name",
      image:
        "https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg",
      price: "649.00",
      color: "#7a6375",
      description: "test description",
      taste: "Sleek",
      expires: "2022-09-14T03:39:44.215Z",
    };

    await wrapper.setData({
      item: newItem,
    });
    const button = wrapper.find('[data-test="save-btn"]');
    button.vm.$emit("click");
    expect(wrapper.emitted().createItem).toEqual([[newItem]]);
    expect(actions.toggleDialog).toHaveBeenCalledTimes(1);
  });
  it("trigger save button with missing data", async () => {
    const wrapper = mount(Dialog, {
      store,
      localVue,
      vuetify,
      propsData: {
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
      },
    });
    wrapper.find(".add-btn").trigger("click");
    await Vue.nextTick();
    const button = wrapper.find('[data-test="save-btn"]');
    button.vm.$emit("click");
    await Vue.nextTick();
    const alert = wrapper.find('[data-test="alert"]');
    expect(alert.text()).toBe("Some informations are missing");
  });
});
