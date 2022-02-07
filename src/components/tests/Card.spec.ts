import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import { State } from "@/store/index";
import Card from "@/components/Card.vue";
import { fakeFruit } from "@/utils/tests/fruits.fixtures";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Card.vue", () => {
  let actions: {
    toggleDialog: () => void;
  };
  let store: Store<State>;

  beforeEach(() => {
    actions = {
      toggleDialog: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('trigger toggleDialog & toggleReadOnly when click on details view"', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        item: fakeFruit,
      },
    });
    const button = wrapper.find(".edit");
    button.trigger("click");
    expect(actions.toggleDialog).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().toggleReadOnly).toEqual([[true, fakeFruit]]);
  });
  it('trigger deleteItem whith correct fruitId when click on delete button"', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        item: fakeFruit,
      },
    });
    const button = wrapper.find(".delete");
    button.trigger("click");
    expect(wrapper.emitted().deleteItem).toEqual([[3]]);
  });
});
