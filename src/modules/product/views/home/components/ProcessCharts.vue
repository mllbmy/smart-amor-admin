<template>
  <a-card :bordered="false" style="height: 100%">
    <template #title>
      <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
        <p class="text-xl">设备状态图表</p>
        <ul class="tabs">
          <li v-for="tab in tabs" @click="tabsHandle(tab.key)" :class="tab.key === curOptionsKeyName ? 'active' : ''">
            {{ tab?.name }}
          </li>
        </ul>
      </div>
    </template>
    <div style="width: 100%; height: 70vh" id="charts"></div>
  </a-card>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, watch } from "vue";

// const props = defineProps<{
//   randerData: DeviceInfo | undefined;
// }>();

// const deviceData = computed(() => props.randerData);
const tabs = ref([
  {
    name: "温度曲线",
    key: "temperature",
  },
  {
    name: "压力曲线",
    key: "pressure",
  },
  {
    name: "真空曲线",
    key: "vacuum",
  },
]);
let chartsInstance: echarts.ECharts | null = null;

const chartsOptions = ref<any>(null);
const curOptionsKeyName = ref<string>("temperature");
function tabsHandle(key: string) {
  curOptionsKeyName.value = key;
}
function updateChartsOption(keyName: string) {
  let options = {
    title: {
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
      top: 30,
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      data: Array.from({ length: 19 }, (_v, k) => {
        return `${(k + 1) * 3}分钟前`;
      }),
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
    series: [],
  };
  switch (keyName) {
    case "temperature":
      chartsOptions.value = {
        ...options,
        tooltip: {
          ...options.tooltip,
          formatter: function (params: any) {
            return `时间: ${params[0].name}<br/>温度: ${params[0].value}°C`;
          },
        },
        legend: {
          ...options.legend,
          data: ["温度(°C)"],
        },
        xAxis: {
          ...options.xAxis,
        },
        yAxis: {
          ...options.yAxis,
          min: 0,
          max: 120,
          name: "温度(°C)",
        },
        series: [
          {
            name: "温度(°C)",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,165,0,0.8)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,165,0,0.1)",
                  },
                ],
              },
            },
            lineStyle: {
              color: "orange",
              width: 2,
            },
            itemStyle: {
              color: "orange",
            },
            data: Array.from({ length: 19 }, (_v, _k) => {
              return Math.floor(Math.random() * (60 - 50 + 1)) + 50;
            }),
          },
        ],
      };
      break;
    case "pressure":
      chartsOptions.value = {
        ...options,
        tooltip: {
          ...options.tooltip,
          formatter: function (params: any) {
            return `时间: ${params[0].name}<br/>压力: ${params[0].value}(MPa)`;
          },
        },
        legend: {
          ...options.legend,
          data: ["压力(MPa)"],
        },
        xAxis: {
          ...options.xAxis,
        },
        yAxis: {
          ...options.yAxis,
          min: 0,
          max: 2,
          name: "压力(MPa)",
        },
        series: [
          {
            name: "压力(MPa)",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(135,206,235,0.8)",
                  },
                  {
                    offset: 1,
                    color: "rgba(135,206,235,0.1)",
                  },
                ],
              },
            },
            lineStyle: {
              color: "skyblue",
              width: 2,
            },
            itemStyle: {
              color: "skyblue",
            },
            data: Array.from({ length: 19 }, () => {
              return ((Math.random() * (1.5 - 1 + 0.1)) + 1).toFixed(2);
            }),
          },
        ],
      };
      break;
    case "vacuum":
      chartsOptions.value = {
        ...options,
        tooltip: {
          ...options.tooltip,
          formatter: function (params: any) {
            return `时间: ${params[0].name}<br/>帕: ${params[0].value}(Pa)`;
          },
        },
        legend: {
          ...options.legend,
          data: ["真空度(Pa)"],
        },
        xAxis: {
          ...options.xAxis,
        },
        yAxis: {
          ...options.yAxis,
          min: 250,
          max: 2500,
          name: "真空度(Pa)",
        },
        series: [
          {
            name: "真空度(Pa)",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,250,154,0.8)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,250,154,0.1)",
                  },
                ],
              },
            },
            lineStyle: {
              color: "rgb(0,250,154)",
              width: 2,
            },
            itemStyle: {
              color: "rgb(0,250,154)",
            },
            data: Array.from({ length: 19 }, () => {
              return Math.floor(Math.random() * (1500 - 2000 + 1)) + 1500;
            }),
          },
        ],
      };
      break;
  }
  chartsInstance?.setOption(chartsOptions.value);
}

const resizeObserver = ref<ResizeObserver | null>(null);

onMounted(() => {
  const chartsDom = document.getElementById("charts") as HTMLElement;
  chartsInstance = echarts.init(chartsDom);
  updateChartsOption(curOptionsKeyName.value);

  // 使用ResizeObserver替代window.resize事件，更精确地监听容器大小变化
  resizeObserver.value = new ResizeObserver(() => {
    if (chartsInstance) {
      chartsInstance.resize();
    }
  });

  if (chartsDom) {
    resizeObserver.value.observe(chartsDom);
  }
});

onUnmounted(() => {
  if (chartsInstance) {
    chartsInstance.dispose();
    chartsInstance = null;
  }
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
});

watch(curOptionsKeyName, (newValue) => {
  updateChartsOption(newValue);
});
</script>
<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  list-style: none;
  margin: 0;
}

.tabs li {
  cursor: pointer;
  border-bottom: 2px solid transparent;
  padding-bottom: 5px;
}

.tabs li.active {
  color: #00bcd4;
  border-color: #00bcd4;
}
</style>
