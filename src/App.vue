<script lang="ts" setup>
const ASSET_BASE = import.meta.env.BASE_URL;
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  QuestionOutlined
} from "@ant-design/icons-vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import themeJson from "@/assets/theme.json";
import { onMounted, onUnmounted, ref, watch } from "vue";

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["/"]);
const customTheme = themeJson;
onMounted(() => {
  collapsed.value = true;
})

// 左侧菜单高亮跟随当前路由（原来固定为 "/"）
const route = useRoute();
const router = useRouter();
watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path];
  },
  { immediate: true }
);

// 顶部路由进度条：切页时即时可见的反馈
const progress = ref(0);
const progressActive = ref(false);
const progressFinishing = ref(false);
let progressTimer: number | undefined;

router.beforeEach(() => {
  window.clearTimeout(progressTimer);
  progressFinishing.value = false;
  progressActive.value = true;
  progress.value = 18;
  progressTimer = window.setTimeout(() => {
    progress.value = 72;
  }, 160);
});

router.afterEach(() => {
  window.clearTimeout(progressTimer);
  progress.value = 100;
  progressFinishing.value = true;
  progressTimer = window.setTimeout(() => {
    progressActive.value = false;
    progressFinishing.value = false;
    progress.value = 0;
  }, 340);
});

onUnmounted(() => {
  window.clearTimeout(progressTimer);
});
</script>

<template>
  <a-config-provider :theme="customTheme">
    <div
      class="route-progress"
      :class="{ 'is-active': progressActive, 'is-finishing': progressFinishing }"
      :style="{ width: progress + '%' }"
    ></div>
    <a-layout class="app-container">
      <a-layout-sider v-model:collapsed="collapsed" collapsible breakpoint="lg" collapsed-width="0"
        class="layout-sider">
        <div class="flex items-center m-4">
          <RouterLink to="/" style="margin: auto">
            <img id="logo" :src="ASSET_BASE + 'logo.jpg'" class="w-16 h-16 bg-blue-600 mx-auto rounded-lg" />
          </RouterLink>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="layout-sider-menu h-screen">
          <a-menu-item key="/">
            <RouterLink to="/">
              <HomeOutlined />
              <span>首页</span>
            </RouterLink>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>研发端</span>
              </span>
            </template>
            <a-menu-item key="/research">
              <RouterLink to="/research">
                <pie-chart-outlined />
                <span>非晶合金材料数据库</span>
              </RouterLink>
            </a-menu-item>
            <a-menu-item key="/recommend">
              <RouterLink to="/recommend">
                <QuestionOutlined />
                <span>材料智能推荐算法</span>
              </RouterLink>
            </a-menu-item>
            <a-menu-item key="/optimize">
              <RouterLink to="/optimize">
                <desktop-outlined />
                <span>热耦合成型工艺优化引擎</span>
              </RouterLink>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <team-outlined />
                <span>生产端</span>
              </span>
            </template>
            <a-menu-item key="/product/home">
              <RouterLink to="/product/home">
                <desktop-outlined />
                <span>设备互联与实时监控</span>
              </RouterLink>
            </a-menu-item>
            <a-menu-item key="/product/vision">
              <RouterLink to="/product/vision">
                <desktop-outlined />
                <span>AI 视觉质量检测</span>
              </RouterLink>
            </a-menu-item>
            <a-menu-item key="/product/fullTraceability">
              <RouterLink to="/product/fullTraceability">
                <desktop-outlined />
                <span>AI 生产排程与溯源</span>
              </RouterLink>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <RouterView v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </a-layout>
  </a-config-provider>
</template>

<style scoped></style>
