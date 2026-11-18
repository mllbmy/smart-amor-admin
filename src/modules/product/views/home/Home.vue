<template>
  <a-layout class="layout-content">
    <Header :title="'微纳模芯生产线监控中心'" :subTitle="'让生产提效，质量保障！'" />
    <a-layout-content class="mx-4">
      <main class="px-6">
        <section class="mb-5">
          <Items />
        </section>
        <section class="pb-10">
          <a-row :gutter="[20, 20]">
            <a-col :xl="0" :xs="24" v-if="isIpad">
              <ProcessCharts :randerData="deviceInfo" />
            </a-col>
            <a-col :xl="4" :xs="12">
              <DeviceComponent :renderData="deviceStatusRenderData" />
            </a-col>
            <a-col :xl="15" v-if="!isIpad">
              <ProcessCharts :randerData="deviceInfo" />
            </a-col>
            <a-col :xl="5" :xs="12">
              <WarnInfo :renderData="warnInfoRenderData" />
            </a-col>
          </a-row>
        </section>
        <section>
          <Traceability />
        </section>
      </main>
    </a-layout-content>
    <a-layout-footer style="text-align: center" class="layout-footer">
      AMOR ©2025 Created by Ken
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import DeviceComponent from "./components/Device.vue";
import Items from "./components/Items.vue";
import ProcessCharts from "./components/ProcessCharts.vue";
import Traceability from "./components/Traceability.vue";
import WarnInfo from "./components/WarnInfo.vue";

import { getDeviceInfo } from "@/modules/product/api/DeviceInfo";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type {
  Device,
  DeviceInfo,
  WarnInfoRenderData,
} from "../../types/DeviceInfo";
import Header from "../components/Header.vue";
const deviceInfo = ref<DeviceInfo>();
const deviceStatusRenderData = ref<DeviceStatus[]>([]);
const warnInfoRenderData = ref<WarnInfoRenderData[]>([]);

// 常量定义
const STATUS_RULES = [
  { key: "temperature", error: 100, warning: 80 },
  { key: "pressure", error: 1.0, warning: 0.8 },
  { key: "vacuum", error: 1500, warning: 1200 },
] as const;

const KEY_NAME_MAP: Record<string, string> = {
  temperature: "温度",
  pressure: "压力",
  vacuum: "真空度",
};
// 设备状态类型
type DeviceStatus = {
  id: string;
  msg: string;
  status: "normal" | "warning" | "error";
};
function processDeviceData(devices: Device[]): DeviceStatus[] {
  return devices.map((device) => {
    const processedInfo = processDeviceStatus(device);
    return {
      id: device.id,
      ...getDeviceStatusMessage(processedInfo),
    };
  });
}
function processDeviceStatus(device: Device) {
  const statusInfo: Record<string, "normal" | "warning" | "error"> = {};

  // 初始化所有状态为 normal
  for (const key of Object.keys(device.info)) {
    statusInfo[key] = "normal";
  }

  // 应用状态规则
  for (const rule of STATUS_RULES) {
    const value = device.info[rule.key]?.value;
    if (value === undefined) continue;

    if (value > rule.error) {
      statusInfo[rule.key] = "error";
    } else if (value > rule.warning) {
      statusInfo[rule.key] = "warning";
    }
  }

  return statusInfo;
}
function getDeviceStatusMessage(
  statusInfo: Record<string, "normal" | "warning" | "error">
): { msg: string; status: "normal" | "warning" | "error" } {
  // 检查最高优先级状态
  let finalStatus: "normal" | "warning" | "error" = "normal";
  let problemKey = "";

  for (const [key, status] of Object.entries(statusInfo)) {
    if (status === "error") {
      // 遇到错误立即返回
      return {
        msg: `${KEY_NAME_MAP[key] || key}异常`,
        status: "error",
      };
    } else if (status === "warning") {
      finalStatus = "warning";
      problemKey = problemKey || key;
    }
  }

  if (finalStatus === "warning") {
    return {
      msg: `${KEY_NAME_MAP[problemKey] || problemKey}偏高`,
      status: "warning",
    };
  }

  return {
    msg: "设备运行正常",
    status: "normal",
  };
}
async function fetchDeviceInfo() {
  try {
    deviceInfo.value = await getDeviceInfo();
    deviceStatusRenderData.value = processDeviceData(deviceInfo.value.devices);
  } catch (error) {
    console.error("获取设备信息失败:", error);
  }
}

function getWarnInfoRenderData(): WarnInfoRenderData {
  const msg = ["冷却系统异常", " 真空度异常", "温度偏差 > 2℃", "压力波动异常"];
  const devices = deviceInfo.value?.devices;
  const randomDevice = devices?.[Math.floor(Math.random() * devices.length)];

  return {
    id: randomDevice?.id || "",
    time: deviceInfo.value?.time,
    msg: msg[Math.floor(Math.random() * msg.length)],
  } as WarnInfoRenderData;
}
const updatedInfoTimer = ref()
const isIpadComputed = () => {
  const { device, width } = detectDevice();
  return device == "mobile" && width <= 768
}
onMounted(async () => {
  await fetchDeviceInfo();
  warnInfoRenderData.value = Array.from(
    { length: Math.ceil(Math.random() * 10) },
    () => {
      return getWarnInfoRenderData();
    }
  );

  updatedInfoTimer.value = setInterval(async () => {
    await fetchDeviceInfo();
    if (warnInfoRenderData.value.length > 5) {
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.ceil(
          Math.random() * warnInfoRenderData.value.length
        );
        warnInfoRenderData.value.splice(randomIndex, 2);
      }
    }
    if (warnInfoRenderData.value.length < 6) {
      warnInfoRenderData.value.push(
        ...Array.from({ length: 1 }, () => {
          return getWarnInfoRenderData();
        })
      );
    }
  }, 3000);
  window.addEventListener('resize', isIpadComputed)
});


const isIpad = computed(isIpadComputed)

function detectDevice() {
  const ua = navigator.userAgent;
  const width = window.innerWidth;

  const res = {
    device: "",
    width
  }

  // 检测平板设备
  const isTablet = /(iPad|Android(?!.*Mobile)|Tablet)/i.test(ua) ||
    (width >= 768 && width <= 1024 && /Touch/.test(ua));

  // 检测手机设备
  const isMobile = /Mobi|Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (isTablet) return { ...res, device: "table" };
  if (isMobile) return { ...res, device: "mobile" };
  return { ...res, device: "desktop" };
}

onUnmounted(() => {
  clearInterval(updatedInfoTimer.value);
  window.removeEventListener('resize', isIpadComputed)
});
</script>
<style scoped></style>
