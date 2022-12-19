import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vue2/:page*",
    name: "Vue2",
    component: () => import(/* webpackChunkName: "vue2" */ "../views/Vue2.vue"),
  },
  {
    path: "/vue3/:page*",
    name: "Vue3",
    component: () => import(/* webpackChunkName: "vue3" */ "../views/Vue3.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
