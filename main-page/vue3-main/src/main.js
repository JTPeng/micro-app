import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import { createPinia } from "pinia";
import microApp from "@micro-zoe/micro-app";

import "element-plus/dist/index.css";
microApp.start();
createApp(App).use(router).use(createPinia()).use(ElementPlus).mount("#app");
