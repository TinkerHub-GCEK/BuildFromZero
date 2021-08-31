import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import VueProgressBar from "@aacassandra/vue3-progressbar";

const options = {
  color: "rgb(0, 255, 191)",
};

createApp(App).use(VueProgressBar, options).use(store).mount("#app");
