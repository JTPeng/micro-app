import { defineStore } from "pinia";

export const useMenuList = defineStore("menuList", {
  state: () => {
    return {
      counter: 0,
    };
  },
});
