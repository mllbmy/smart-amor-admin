import { createApp } from "vue";
import router from "./router";
import Antd, { message } from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import "@/assets/common.css";
import "@/assets/motion.css";

// 全局提示下移，避免居中顶部时遮挡页面主标题
message.config({ top: "84px", maxCount: 3 });

const app = createApp(App);

app.use(router).use(Antd).mount("#app");
