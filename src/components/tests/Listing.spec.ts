import { shallowMount } from "@vue/test-utils";
import Listing from "@/components/Listing.vue";
import { fakeFruitsFlatten } from "@/utils/tests/fruits.fixtures";

describe("Listing.vue", () => {
  it('trigger toggleDialog & toggleReadOnly when click on details view"', () => {
    const wrapper = shallowMount(Listing, {
      propsData: {
        data: fakeFruitsFlatten,
      },
    });
    expect(wrapper.findAll(".list-card").length).toBe(6);
  });
});
