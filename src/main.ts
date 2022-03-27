import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

app.use(createHead()).use(createPinia());
app.use(router);

app.mount("#app");
