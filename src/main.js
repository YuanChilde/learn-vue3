import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadAllPlugins } from "@/plugins";
import { AppConfig } from "@/config/app";
const app = createApp(App);
app.config.globalProperties = AppConfig;
app.provide("AppConfig", AppConfig);
loadAllPlugins(app);
app
    .use(store)
    .use(router)
    .mount("#app");
//# sourceMappingURL=main.js.map