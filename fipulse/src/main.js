import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import i18n from "@/plugins/i18n";
import "@fortawesome/fontawesome-free/css/all.css";

library.add(fas);

createApp(App)
  .use(router)
  .use(i18n)
  .use(Toast)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
