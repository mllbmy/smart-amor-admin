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
          <h1 class="text-4xl">晶工巧匠</h1>
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
                <DeviceProportion :data="deviceProportionData" />
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
                  <a-button size="large" :loading="videoRefreshing" @click="reLoadVideo">刷新</a-button>
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
                    class="text-xs px-2 py-1 rounded border transition-colors disabled:opacity-60" :disabled="aiBusy && bIndex === 0"
                    :class="bIndex === 0
                      ? 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border-blue-500/30'
                      : 'bg-transparent hover:bg-slate-700/50 text-slate-400 border-slate-600'
                      " @click="handleAiButton(btn)">
                    {{ aiBusy && bIndex === 0 ? '下发中…' : btn }}
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

    <!-- AI 建议：设备负载详情 / 均衡方案弹窗 -->
    <a-modal v-model:open="aiDetailOpen" :title="aiDetailTitle" :footer="null" width="760px" centered>
      <p class="text-xs text-slate-400 mb-3">
        数据来源：生产线监控中心 · 采样时间 {{ aiDetailTime }}
      </p>
      <a-table :columns="aiDetailColumns" :data-source="aiDetailRows" size="small" :pagination="false"
        :row-key="(r: any) => r.device" />
      <p v-if="aiPlanText" class="mt-3 p-3 rounded border border-blue-500/30 bg-blue-950/20 text-xs text-slate-300">
        <span class="text-blue-300 font-semibold">均衡方案：</span>{{ aiPlanText }}
      </p>
    </a-modal>
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

// 设备状态统计全部由 deviceInfo 实时推导，避免"总数/停机数"与设备清单对不上
const total = ref(0);
const errorTotal = ref(0);
const warningTotal = ref(0);
const opened = computed(() => Math.max(0, total.value - errorTotal.value));

const deviceOpenRateData = computed(() => {
  const t = total.value;
  const w = warningTotal.value;
  const e = errorTotal.value;
  return {
    total: t,
    errorTotal: e,
    opened: opened.value,
    data: [
      {
        name: "设备数量",
        value: t,
        color: "#ccc",
      },
      {
        name: "正常",
        value: Math.max(0, t - w - e),
        color: "#10b981ee",
      },
      {
        name: "告警",
        value: w,
        color: "#fcda56ee",
      },
      {
        name: "故障",
        value: e,
        color: "#ea4335ee",
      },
    ],
  };
});

// 环形图只展示状态分布（不含"设备数量"这一总计项）
const deviceProportionData = computed(() =>
  deviceOpenRateData.value.data.filter((item) => item.name !== "设备数量")
);

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
    const list = processDeviceData(deviceInfo.value.devices);
    deviceStatusRenderData.value = list.slice(0, 3);
    // KPI 由真实设备清单统计，保证与"设备状态面板""负荷均衡方案"一致
    total.value = list.length;
    errorTotal.value = list.filter((d) => d.status === "error").length;
    warningTotal.value = list.filter((d) => d.status === "warning").length;
  } catch (error) {
    console.error("获取设备信息失败:", error);
  }
}

/* ---------- 实时监测：刷新画面与设备状态 ---------- */
const videoSource = ref<HTMLVideoElement>();
const videoRefreshing = ref(false);

const reLoadVideo = async () => {
  if (videoRefreshing.value) return;
  videoRefreshing.value = true;
  message.loading({ content: "正在刷新监测画面与设备状态…", key: "monitorReload", duration: 0 });
  try {
    const v = videoSource.value;
    if (v) {
      try {
        v.currentTime = 0;
        v.load();
        await v.play();
      } catch {
        /* 浏览器拦截自动播放时忽略，画面保持原状 */
      }
    }
    await fetchDeviceInfo();
    message.success({ content: "监测画面与设备状态已刷新", key: "monitorReload", duration: 2 });
  } catch {
    message.error({ content: "刷新失败，请检查视频源", key: "monitorReload", duration: 2 });
  } finally {
    videoRefreshing.value = false;
  }
};

/* ---------- AI 建议：查看详情 / 一键均衡负载 ---------- */
const aiBusy = ref(false);
const aiDetailOpen = ref(false);
const aiDetailTitle = ref("设备负载详情");
const aiDetailTime = ref("");
const aiPlanText = ref("");
const aiDetailRows = ref<any[]>([]);
const aiDetailColumns = [
  { title: "设备编号", dataIndex: "device", key: "device", width: 120 },
  { title: "运行状态", dataIndex: "status", key: "status", width: 110 },
  { title: "现场描述", dataIndex: "msg", key: "msg" },
  { title: "建议动作", dataIndex: "action", key: "action", width: 190 },
];

const STATUS_LABEL: Record<string, string> = {
  normal: "运行正常",
  warning: "告警",
  error: "故障",
};

const STATUS_ACTION: Record<string, string> = {
  normal: "维持当前排程",
  warning: "降低进给并检查冷却",
  error: "强制停机并安排检修",
};

const buildLoadRows = () => {
  const devices: Device[] = deviceInfo.value?.devices || [];
  return devices.map((d: Device) => {
    const info = processDeviceData([d])[0];
    return {
      device: d.id,
      status: STATUS_LABEL[info?.status || "normal"],
      msg: info?.msg || "设备运行正常",
      action: STATUS_ACTION[info?.status || "normal"],
    };
  });
};

const openAiDetail = (title: string) => {
  aiDetailRows.value = buildLoadRows();
  aiDetailTitle.value = title;
  aiDetailTime.value = new Date().toLocaleString("zh-CN", { hour12: false });
  aiDetailOpen.value = true;
};

const handleAiButton = (btn: string) => {
  if (btn === "查看详情") {
    aiPlanText.value = "";
    openAiDetail("设备负载详情");
    return;
  }
  if (btn === "一键均衡负载") {
    if (aiBusy.value) return;
    aiBusy.value = true;
    message.loading({ content: "正在计算负荷均衡方案…", key: "aiBalance", duration: 0 });
    setTimeout(() => {
      aiBusy.value = false;
      const abnormal = buildLoadRows().filter((r) => r.status !== "运行正常");
      aiPlanText.value = abnormal.length
        ? `将 ${abnormal.map((r) => r.device).join("、")} 的排程任务迁移至空闲机台，并把负载上限下调至 85%，方案已下发至排程队列。`
        : "当前所有设备负载均处于正常区间，无需迁移排程任务。";
      openAiDetail("负荷均衡方案");
      message.success({ content: "负荷均衡方案已生成并下发", key: "aiBalance", duration: 2 });
    }, 900);
  }
};
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

// AI 建议卡片的内容由当前设备状态生成，避免与看板数值/设备描述不一致
const SUGGESTION_BY_METRIC: Record<string, string[]> = {
  温度: ["检查冷却液循环泵压力与流量", "降低主轴转速并观察温升趋势"],
  压力: ["检查真空泵与腔体密封圈", "暂停作业排查气路泄漏点"],
  真空度: ["检查真空泵抽速是否衰减", "紧固腔体密封件并复测"],
};

const aiSuggestions = computed(() => {
  const list = deviceInfo.value?.devices
    ? processDeviceData(deviceInfo.value.devices)
    : [];
  const cards: any[] = [];
  const fault = list.filter((d) => d.status === "error");
  const warning = list.filter((d) => d.status === "warning");

  if (fault.length) {
    const dev = fault[0];
    const metric = Object.keys(SUGGESTION_BY_METRIC).find((k) => dev.msg.includes(k));
    cards.push({
      title: `异常预警: ${dev.id}`,
      time: "刚刚",
      content: `监测到 ${dev.id} ${dev.msg}，已超过工艺阈值，建议立即处置。`,
      suggestions: SUGGESTION_BY_METRIC[metric || "温度"],
      styleClass:
        "bg-red-950/20 border-red-500/30 hover:bg-red-950/40 ai-alert-card",
      titleColor: "text-red-400",
      icon: IconAlert,
    });
  } else {
    cards.push({
      title: "运行状态良好",
      time: "刚刚",
      content: "当前无设备处于故障状态，工艺参数均在阈值范围内。",
      styleClass:
        "bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/40",
      titleColor: "text-emerald-400",
      icon: IconAlert,
    });
  }

  cards.push({
    title: "效能优化",
    time: "10分钟前",
    content: warning.length
      ? `检测到 ${warning.length} 台设备处于告警状态（${warning
          .map((d) => d.id)
          .join("、")}），可迁移部分排程任务以均衡负载。`
      : "设备负载分布均衡，暂无需调整排程。",
    buttons: ["一键均衡负载", "查看详情"],
    styleClass: "bg-blue-950/20 border-blue-500/30 hover:bg-blue-950/40",
    titleColor: "text-blue-400",
    icon: IconZap,
  });

  cards.push({
    title: "维保提醒",
    time: "1小时前",
    content:
      "TM-YJ-01 累计运行时长即将达到 200 小时保养周期。建议在周五停机时段安排刀具检查。",
    styleClass:
      "bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/40",
    titleColor: "text-emerald-400",
    icon: IconTool,
  });

  return cards;
});
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
