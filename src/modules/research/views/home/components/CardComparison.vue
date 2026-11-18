<template>
  <div class="comparison-panel" v-if="cards_data?.length">
    <div class="panel-header">
      <h3 style="margin: 0" class="text-2xl">对比内容 ({{ props.cards_data.length }}/2)</h3>
    </div>
    <div class="comparison-content">
      <div v-for="item in props.cards_data" :key="item.id" class="comparison-item">
        <p class="text-xl">{{ item.name }}</p>
      </div>
      <div class="flex justify-between">
        <a-button style="background-color: rgb(255, 152, 0); color: #fff;border: none;" size="large"
          @click="cancelComparison" :disabled="props.cards_data.length < 2">
          取消对比
        </a-button>
        <a-button type="primary" size="large" class="start-comparison-btn" @click="startComparison"
          :disabled="props.cards_data.length < 2">
          开始对比
        </a-button>
      </div>
    </div>
    <!-- 对比模态框 -->
    <a-modal v-model:open="open" :title="modelTitle(props.cards_data)" @ok="handleOk" @cancel="cancelHandle" :width="''"
      ok-text="确认" cancel-text="取消">
      <a-table :dataSource="performanceMetrics" :columns="columns" bordered :customHeaderRow="customHeaderRow"
        :customRow="customRow" :pagination="false" />
      <div style="display: flex; justify-content: end">
        <a-button @click="generateReport" size="large" style="margin-top: 20px;">生成报表</a-button>
      </div>
      <div id="mainCharts" style="width: 80vw; height: 600px; margin: auto" ref="mainCharts" v-if="generateReportFlag">
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type {
  MaterialData,
  MaterialProperty,
} from "@/modules/research/types/home/MaterialDataBase";
import type { ComparisonRow } from "@/modules/research/types/home/CardComparison";
import * as echarts from "echarts";
import { message } from "ant-design-vue";
import { customHeaderRow, customRow } from "@/utils/table";

const props = defineProps<{
  cards_data: MaterialData[];
}>();
const emits = defineEmits(["cancelComparison"]);

const open = ref<boolean>(false);

const startComparison = () => {
  open.value = true;
};

// 定义新的数据结构
const metrics = ref<(keyof MaterialProperty)[]>(["strength", "hardness"]);
// 键名映射
type KeyNameMap = {
  [key in keyof MaterialProperty]?: string;
};
const KEY_NAMES: KeyNameMap = {
  strength: "强度",
  hardness: "硬度",
  // corrosion_resistance: "耐腐蚀性",
};
// 表格列定义
const columns = ref([
  {
    title: "性能指标",
    dataIndex: "property",
    key: "property",
  },
  {
    title: () => {
      return props.cards_data[0]?.name;
    }, // 将动态更新为实际材料名称
    dataIndex: "material1",
    key: "material1",
    customCell: customCellRenderHandler,
  },
  {
    title: () => {
      return props.cards_data[1]?.name;
    }, // 将动态更新为实际材料名称
    dataIndex: "material2",
    key: "material2",
    customCell: customCellRenderHandler,
  },
  {
    title: "差异",
    dataIndex: "difference",
    key: "difference",
    sorter: {
      compare: (a: ComparisonRow, b: ComparisonRow) => {
        return a.difference - b.difference;
      },
    },
    customRender: ({ text: diff }: { text: number }) => {
      const num = Number(diff);
      const formattedValue = isNaN(num)
        ? "N/A"
        : `${num >= 0 ? "+" : ""}${num.toFixed(1)}%`;
      return formattedValue;
    },
    customCell: (record: any) => {
      const diff = record.difference;
      let color = "";
      if (diff > 0) {
        color = "#52c41a";
      } else if (diff < 0) {
        color = "#ff4d4f";
      } else {
        color = "#ffffff";
      }
      return {
        style: {
          color: color,
          fontWeight: diff !== 0 ? "500" : "normal",
        },
      };
    },
  },
]);
// 性能指标对比数据
const performanceMetrics = ref<ComparisonRow[]>([]);
const handleOk = () => {
  open.value = false;
  generateReportFlag.value = false;
};
const cancelHandle = () => {
  generateReportFlag.value = false;
};

function cancelComparison() {
  emits('cancelComparison')
}
// 模态框标题
function modelTitle(data: MaterialData[]) {
  const title = data.map((item) => {
    return `${item.name}`;
  });
  return title.join(" VS ");
}

// 更新性能指标对比数据
function updateMetrics(newValue: MaterialData[]) {
  if (newValue.length >= 2) {
    const materials = newValue;
    performanceMetrics.value = metrics.value.map((metric) => {
      const values = materials.map((material) => material.properties[metric]);
      const [value1, value2] = values as [number, number];
      return {
        property: KEY_NAMES[metric] || metric,
        ...Object.fromEntries(
          materials.map((m, i) => ["material" + (i + 1), m.properties[metric]])
        ),
        difference: calculateDifference(value1, value2),
      };
    }) as ComparisonRow[];
  }
}

// 计算差异百分比
function calculateDifference(value1: number, value2: number): number {
  const diff = ((value1 - value2) / value2) * 100;

  return diff;
}

function customCellRenderHandler(_record: any, rowIndex: any, _column: any) {
  return {
    style: {
      color: rowIndex ? "rgb(255, 152, 0)" : "rgb(76, 175, 80)",
    },
  };
}
const generateReportFlag = ref<boolean>(false);
function generateReport() {
  if (generateReportFlag.value) return;
  generateReportFlag.value = true;
  message.loading("正在生成报表，请稍后...", 1).then(() => {
    const mainCharts = document.getElementById("mainCharts");
    const chartsSeries = props.cards_data.map((item) => {
      return {
        name: item.name,
        type: "bar",
        data: [item.properties.strength, item.properties.hardness],
      };
    });
    const chartsNames = chartsSeries.map((item) => item.name);

    if (mainCharts) {
      const chart = echarts.init(mainCharts);
      const option = {
        title: {
          left: "center",
          textStyle: {
            color: "#00bcd4",
          },
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: "#00bcd4",
          },
        },
        legend: {
          data: chartsNames,
          textStyle: {
            color: "#00bcd4",
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false, title: "数据视图" },
            restore: { show: true, title: "还原" },
            saveAsImage: { show: true, title: "保存为图片" },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: performanceMetrics.value.map((item) => item.property),
            axisLabel: {
              color: "#00bcd4",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axis: "left",
            axisLabel: {
              color: "#00bcd4",
            },
          },
        ],
        series: chartsSeries.map((series, index) => ({
          ...series,
          itemStyle: {
            color: index % 2 === 0 ? "rgb(76, 175, 80)" : "rgb(255, 152, 0)",
          },
        })),
      };
      chart.setOption(option);
    }
    message.success("报表生成成功！");
  });
}
watch(
  () => props.cards_data,
  (newValue) => {
    updateMetrics(newValue);
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
.comparison-panel {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 280px;
  background-color: #1a1e2e;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 16px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.start-comparison-btn {
  background-color: #1890ff;
  border: none;
}

.comparison-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comparison-item {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s ease;
}

.comparison-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
