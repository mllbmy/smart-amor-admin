<template>
  <div class="flex flex-col w-full">
    <header class="layout-header leading-normal">
      <div class="text-center py-4 relative page-header flex justify-between items-start px-6"
        style="background-size: 100% 100%">
        <div class="flex-1">
          <div class="school-brand">
            <div class="school-name">深圳信息职业技术大学</div>
            <div class="school-name-en">SHENZHEN UNIVERSITY OF INFORMATION TECHNOLOGY</div>
            <div class="school-honors">
              <span>国家示范性软件职业技术学院</span>
              <span>国家优质高职院校</span>
              <span>国家示范(骨干)高职院校建设项目验收优秀单位</span>
              <span>国家第一轮“双高计划”学校绩效评价“优”等单位</span>
            </div>
          </div>
        </div>
        <div class="flex-2">
          <h1 class="text-4xl">精益求“晶”</h1>
          <p class="text-lg text-[#00bcd4]">
            ——基于AI大模型的非晶合金材料与工艺智能优化系统——
          </p>
        </div>
        <ProductError class="flex-1" />
      </div>
    </header>
    <section class="body px-6">
      <a-row :gutter="[14, 14]" class="py-4">
        <a-col :xl="4" :xs="8">
          <div class="home-card">
            <h1 class="text-lg text-[#00bcd4] text-center" style="font-weight: bold">
              当日完成率
            </h1>
            <CompleteChart />
          </div>
        </a-col>
        <a-col :xl="9" :xs="16">
          <div class="home-card">
            <h1 class="text-lg text-[#00bcd4]" style="font-weight: bold">
              计划甘特图
            </h1>
            <Visualized :data-source="scheduleData.slice(0, 5)" :styleOption="visualizedStyleOption" />
          </div>
        </a-col>
        <a-col :xl="11" :xs="24">
          <div class="home-card">
            <h1 class="text-lg text-[#00bcd4]" style="font-weight: bold">
              设备运行状态
            </h1>
            <a-row>
              <a-col :span="24">
                <Items :device-open-rate-data="deviceOpenRateData" />
              </a-col>
            </a-row>
            <a-row class="h-3/5 w-full">
              <a-col :span="12">
                <DeviceProportion />
              </a-col>
              <a-col :span="12">
                <DeviceOpenRate :device-open-rate-data="deviceOpenRateData" />
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="[14, 14]">
        <a-col :xl="8" :xs="24">
          <div class="home-card">
            <a-card>
              <template #title>
                <h1 class="text-lg text-[#00bcd4]" style="font-weight: bold">
                  实时监测
                </h1>
              </template>
              <div class="flex flex-col justify-center gap-4">
                <video :src="ASSET_BASE + 'mold_core.mp4'" autoplay loop muted style="" id="videoSource"
                  ref="videoSource"></video>
                <div class="flex items-center justify-center gap-4">
                  <a-button size="large" @click="reLoadVideo">刷新</a-button>
                  <!-- <a-button class="restart" size="large" @click="onNext">下一处</a-button> -->
                </div>
              </div>
            </a-card>
          </div>
        </a-col>
        <a-col :xl="8" :xs="16">
          <div class="home-card flex flex-col relative overflow-hidden">
            <!-- 标题栏：增加了分析状态角标 -->
            <div class="flex justify-between items-center mb-3">
              <h1 class="text-lg text-[#00bcd4] m-0" style="font-weight: bold">
                AI建议
              </h1>
              <span
                class="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700/50 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                  <path d="M12 2a10 10 0 0 1 10 10"></path>
                  <path d="M12 12l9.5-2.5"></path>
                </svg>
                分析完成
              </span>
            </div>

            <!-- AI 建议列表容器 -->
            <div class="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              <div v-for="(item, index) in aiSuggestions" :key="index"
                class="border rounded p-3 cursor-pointer transition-colors relative" :class="item.styleClass">
                <!-- 卡片头部 -->
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-bold text-sm flex items-center gap-2" :class="item.titleColor">
                    <!-- 动态图标 -->
                    <component :is="item.icon" class="w-4 h-4" />
                    {{ item.title }}
                  </h4>
                  <span class="text-[10px] opacity-70" :class="item.titleColor">{{ item.time }}</span>
                </div>

                <!-- 内容描述 -->
                <p class="text-slate-300 text-xs leading-relaxed mb-2">
                  {{ item.content }}
                </p>

                <!-- 扩展区域：建议方案或按钮 -->
                <div v-if="item.suggestions" class="p-2 bg-black/20 rounded border border-white/5">
                  <p class="text-[#00bcd4] text-xs font-semibold mb-1">
                    AI 建议方案:
                  </p>
                  <ul class="list-disc list-inside text-slate-400 text-xs">
                    <li v-for="(sug, sIndex) in item.suggestions" :key="sIndex">
                      {{ sug }}
                    </li>
                  </ul>
                </div>

                <div v-if="item.buttons" class="flex gap-2 mt-2">
                  <button v-for="(btn, bIndex) in item.buttons" :key="bIndex"
                    class="text-xs px-2 py-1 rounded border transition-colors" :class="bIndex === 0
                      ? 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border-blue-500/30'
                      : 'bg-transparent hover:bg-slate-700/50 text-slate-400 border-slate-600'
                      " @click="message.warning('功能开发中...')">
                    {{ btn }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 背景光效装饰 -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-[#00bcd4]/10 blur-2xl rounded-full pointer-events-none">
            </div>
          </div>
        </a-col>
        <a-col :xl="8" :xs="8">
          <div class="home-card">
            <DeviceComponent :renderData="deviceStatusRenderData" />
          </div>
        </a-col>
      </a-row>
    </section>
  </div>
</template>
<script setup lang="ts">
const ASSET_BASE = import.meta.env.BASE_URL;
import ProductError from "@/modules/product/views/components/ProductError.vue";
import Visualized from "@/modules/product/views/fullTraceability/components/Visualized.vue";
import type { ScheduleData } from "./product/types/Schedule";
import { computed, h, onMounted, ref } from "vue";
import { loadLocationData } from "@/utils/tools";
import CompleteChart from "@/modules/components/CompleteChart.vue";
import DeviceOpenRate from "@/modules/components/DeviceOpenRate.vue";
import Items from "@/modules/components/Items.vue";
import DeviceProportion from "@/modules/components/DeviceProportion.vue";
import DeviceComponent from "@/modules/product/views/home/components/Device.vue";
import { getDeviceInfo } from "./product/api/DeviceInfo";
import { getFakeData as getDefaultSchedule } from "./product/api/Schedule";
import type { Device } from "./product/types/DeviceInfo";
import { message } from "ant-design-vue";

const scheduleData = ref<ScheduleData[]>(getDefaultSchedule());
const visualizedStyleOption = ref({
  size: "small",
  bgColor: "#18233711",
  customHeaderRow: null,
  customRow: null,
  pageSize: false,
});

const total = ref(36);
const errorTotal = ref(4);
const opened = ref(30);

const deviceOpenRateData = computed(() => ({
  total: total.value,
  errorTotal: errorTotal.value,
  opened: opened.value,
  data: [
    {
      name: "设备数量",
      value: total.value,
      color: "#ccc",
    },
    {
      name: "正常",
      value: total.value - errorTotal.value,
      color: "#10b981ee",
    },
    {
      name: "停机",
      value: errorTotal.value,
      color: "#ea4335ee",
    },
    {
      name: "未开机",
      value: total.value - opened.value - errorTotal.value,
      color: "#fcda56ee",
    },
  ],
}));

const deviceInfo = ref();
type DeviceStatus = {
  id: string;
  msg: string;
  status: "normal" | "warning" | "error";
};

const deviceStatusRenderData = ref<DeviceStatus[]>([]);
function processDeviceData(devices: Device[]): DeviceStatus[] {
  return devices.map((device) => {
    const processedInfo = processDeviceStatus(device);
    return {
      id: device.id,
      ...getDeviceStatusMessage(processedInfo),
    };
  });
}
const KEY_NAME_MAP: Record<string, string> = {
  temperature: "温度",
  pressure: "压力",
  vacuum: "真空度",
};
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
const STATUS_RULES = [
  { key: "temperature", error: 100, warning: 80 },
  { key: "pressure", error: 1.0, warning: 0.8 },
  { key: "vacuum", error: 1500, warning: 1200 },
] as const;

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
async function fetchDeviceInfo() {
  try {
    deviceInfo.value = await getDeviceInfo();
    deviceStatusRenderData.value = processDeviceData(
      deviceInfo.value.devices
    ).slice(0, 3);
  } catch (error) {
    console.error("获取设备信息失败:", error);
  }
}
const onPrevnt = () => { };
const onNext = () => { };

const reLoadVideo = () => { };
const IconAlert = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    [
      h("path", {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
      }),
      h("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
      h("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" }),
    ]
  );
const IconZap = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    [h("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })]
  );
const IconTool = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    [
      h("path", {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      }),
    ]
  );

const aiSuggestions = ref([
  {
    title: "异常预警: TM-YJ-02",
    time: "刚刚",
    content: "监测到主轴温度持续处于85°C高位，超过阈值(80°C)。",
    suggestions: ["检查冷却液循环泵压力", "暂停作业10分钟进行被动散热"],
    styleClass:
      "bg-red-950/20 border-red-500/30 hover:bg-red-950/40 ai-alert-card",
    titleColor: "text-red-400",
    icon: IconAlert,
  },
  {
    title: "效能优化",
    time: "10分钟前",
    content: '检测到 2 台设备处于"未开机"状态，但 TM-04 负载已达 95%。',
    buttons: ["一键均衡负载", "查看详情"],
    styleClass: "bg-blue-950/20 border-blue-500/30 hover:bg-blue-950/40",
    titleColor: "text-blue-400",
    icon: IconZap,
  },
  {
    title: "维保提醒",
    time: "1小时前",
    content:
      "TM-01 累计运行时长即将达到 200 小时保养周期。建议在周五停机时段安排刀具检查。",
    styleClass:
      "bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/40",
    titleColor: "text-emerald-400",
    icon: IconTool,
  },
]);
onMounted(() => {
  loadLocationData("scheduleData", scheduleData);
  fetchDeviceInfo();
});
</script>
<style scoped>
.home-card {
  height: 100%;
  border: 1px solid #00bcd4aa;
  padding: 10px 16px;
}

/* 新增：自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 新增：报警卡片呼吸动画 */
.ai-alert-card {
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0% {
    border-color: rgba(239, 68, 68, 0.3);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.1);
  }

  50% {
    border-color: rgba(239, 68, 68, 0.8);
    box-shadow: 0 0 8px 0 rgba(239, 68, 68, 0.2);
  }

  100% {
    border-color: rgba(239, 68, 68, 0.3);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.1);
  }
}

.body h1 {
  border-left: 3px solid #00bcd4;
  padding-left: 10px;
}

.body h1+*:not(span) {
  padding-top: 15px;
}

/* 左上角学校信息（原校徽图片改为文字，徽标图形已去掉） */
.school-brand {
  display: block;
  width: fit-content;
  margin-top: 2px;
  padding-left: 12px;
  border-left: 3px solid #00bcd4;
  line-height: 1.25;
  text-align: left;
  user-select: none;
}

.school-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 188, 212, 0.5), 0 0 20px rgba(0, 188, 212, 0.22);
}

.school-name-en {
  margin-top: 2px;
  font-size: 8px;
  letter-spacing: 0.3px;
  color: #8fdcea;
}

.school-honors {
  display: flex;
  flex-direction: column;
  margin-top: 3px;
}

.school-honors span {
  font-size: 8.5px;
  line-height: 1.32;
  color: #d7eef7;
  white-space: nowrap;
  text-shadow: 0 0 4px rgba(0, 18, 32, 0.85);
}
</style>
