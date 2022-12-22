import { defineStore } from "pinia";

export const useMenuList = defineStore("menuList", {
  state: () => {
    return {
      counter: 0,
      flatMenuList: [],
    };
  },
  actions: {
    setFlatMenuList(list) {
      console.info("setFlatMenuList", list);
      this.flatMenuList = [...list];
    },
    setKeepAlive(name, bool) {
      console.info("执行了 setKeepAlive");
      const { flatMenuList } = this;
      const list = flatMenuList.map((item) => {
        if (name === item.path) {
          item.isKeepAlive = bool;
        }
        return {
          ...item,
        };
      });
      this.flatMenuList = [...list];
    },
  },
});
