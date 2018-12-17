import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import ListItem from "@/components/ListItem";

describe("ListItem.vue", () => {
  it("displays default name prop", () => {
    const Ctor = Vue.extend(ListItem);
    const vm = new Ctor().$mount();

    expect(vm.$el.textContent).toContain("");
  });

  it("displays given name prop", () => {
    const wrapper = shallowMount(ListItem, {
      propsData: {
        name: "Milk"
      }
    });
    expect(wrapper.find("#item-name").text()).toBe("Milk");
  });

  it("emits remove event on button click", () => {
    const wrapper = shallowMount(ListItem);
    wrapper.find("#remove-button").trigger("click");
    expect(wrapper.emitted().remove).toBeTruthy();
  });
});
