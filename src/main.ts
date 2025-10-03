import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter } from "@kitbag/router";
import { VueQueryPlugin as query } from "@tanstack/vue-query";
import { RoutesConfiguration } from "@/constants/routes.ts";
import App from "@/App.vue";
import NotFound from "@/pages/NotFound.vue";
// Import UnoCSS essentials
import "virtual:uno.css";
// Reset all CSS styles in a Tailwind style
import "@unocss/reset/tailwind.css";
import "@/globals.css";

const app = createApp(App);
const pinia = createPinia();
const router = createRouter(RoutesConfiguration, {
  "rejections": {
    "NotFound": NotFound,
  },
});

app.use(pinia);
app.use(router);
app.use(query);
app.mount("#app");