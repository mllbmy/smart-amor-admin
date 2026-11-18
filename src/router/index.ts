import { createMemoryHistory, createRouter } from "vue-router";

import PageHome from "@/modules/Home.vue";
import ResearchHome from "@/modules/research/views/home/Home.vue";
import ProductHome from "@/modules/product/views/home/Home.vue";
import Recommend from "@/modules/research/views/recommend/Recommend.vue";
import Optimization from "@/modules/research/views/optimize/Optimize.vue";
import Vision from "@/modules/product/views/vision/Vision.vue";
import FullTraceability from "@/modules/product/views/fullTraceability/FullTraceability.vue";

const routes = [
  { path: "/", component: PageHome },
  { path: "/research", component: ResearchHome },
  { path: "/recommend", component: Recommend },
  { path: "/optimize", component: Optimization },
  { path: "/product/home", component: ProductHome },
  { path: "/product/vision", component: Vision },
  { path: "/product/fullTraceability", component: FullTraceability },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
