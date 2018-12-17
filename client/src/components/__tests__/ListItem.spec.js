import Vue from "vue";
import ListItem from "../ListItem.vue";

describe("ListItem.vue", () => {
  it("displays name prop", () => {
    const Ctor = Vue.extend(ListItem);
    const vm = new Ctor().$mount();

    expect(vm.$el.textContent).toContain("");
  });
});
