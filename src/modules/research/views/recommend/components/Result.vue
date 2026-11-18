<template>
  <a-card v-if="props.data">
    <template #title>
      <div class="text-2xl">推荐结果</div>
    </template>
    <div class="text-center">
      <a-tag style="
          font-size: 24px;
          padding: 14px;
          border-radius: 20px;
          color: #ff9804;
          border-color: #ff9804;
        ">{{ props.data.recommendedResultName }}</a-tag>
    </div>
    <a-divider />
    <a-card>
      <div class="text-2xl mb-4 font-bold">详细信息</div>
      <a-table :columns="columns" :data-source="tableData" :pagination="false" :customHeaderRow="customHeaderRow"
        :customRow="customRow">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'value'">
            <span :style="{
              color: record.hightlight ? 'rgb(0, 188, 212)' : '#fff',
            }">{{ record.value }}</span>
          </template>
        </template>
        <template #summary v-if="props.data.suggestion">
          <div class="pt-5 w-full">
            <a-flex class="gap-2">
              <a-button type="primary" size="large" @click="detailHandle">查看详细性能报告</a-button>
              <a-button size="large" :class="hasCompareButton
                ? 'text-[#00bcd4] border-[#00bcd4]'
                : 'text-[#ff9804] border-[#ff9804]'
                " @click="addCompare">
                {{ hasCompareButton ? "移除对比" : "加入对比" }}
              </a-button>
            </a-flex>
          </div>
        </template>
      </a-table>
      <div class="ai-suggestion">
        <div class="suggestion-header">
          <i class="fas fa-lightbulb"></i>
          <div class="suggestion-title text-xl">AI优化建议</div>
        </div>
        <ul class="suggestion-list" v-html="props.data.suggestion"></ul>
      </div>
      <!-- <p class="text-center pt-6 text-[#999]">本AI功能提供的所有信息、建议或预测均基于当前输入数据和算法模型，仅供您参考，不构成任何专业意见或决策依据。</p> -->
    </a-card>
  </a-card>
  <a-modal v-model:open="detailModalVisible" title="详细性能报告" :width="800" @cancel="handleModalClose" :footer="null">
    <div id="performance-chart" style="width: 100%; height: 500px"></div>
  </a-modal>
</template>

<script setup lang="ts">
import { onUnmounted, nextTick, ref, watch } from "vue";
import type { SearchResult } from "@/modules/research/types/recommend/Search";
import { customHeaderRow, customRow } from "@/utils/table";
import * as echarts from "echarts";
import { message } from "ant-design-vue";
let chartInstance: echarts.ECharts | null = null;
const props = defineProps<{
  data: SearchResult | null;
}>();
const detailModalVisible = ref(false);
const hasCompareButton = ref(false);

const columns = [
  {
    title: "成分/性能",
    dataIndex: "property",
    key: "property",
  },
  {
    title: "数值",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "参考说明",
    dataIndex: "reference",
    key: "reference",
  },
];

const tableData = ref<SearchResult["details"]>([]);
watch(
  () => props.data,
  (newVal) => {
    if (!newVal) return;
    tableData.value = newVal?.details;
  }
);
function detailHandle() {
  detailModalVisible.value = true;

  nextTick(() => {
    // 销毁之前的实例（如果有）
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }

    // 获取容器
    const chartContainer = document.getElementById("performance-chart");
    if (!chartContainer) return;

    // 初始化ECharts
    chartInstance = echarts.init(chartContainer);

    // 处理数据
    const componentData = processComponentData();

    // 配置选项
    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        data: componentData.map((item) => item.name),
      },
      series: [
        {
          name: "成分分布",
          type: "pie",
          radius: ["50%", "80%"],
          roseType: "radius",
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "16",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: componentData,
        },
      ],
    };

    // 设置配置项
    chartInstance.setOption(option);

    // 处理窗口大小变化
    const resizeHandler = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    window.addEventListener("resize", resizeHandler);

    // 在模态框关闭时移除事件监听
    const originalOnClose = (window as any).__echartsResizeHandler__;
    if (originalOnClose) {
      window.removeEventListener("resize", originalOnClose);
    }
    (window as any).__echartsResizeHandler__ = resizeHandler;
    window.addEventListener("resize", resizeHandler);
  });
}
function processComponentData() {
  if (!props.data) return [];

  // 尝试提取成分数据
  const componentItems = props.data.details.filter(
    (item) =>
      item.property.includes("含量") ||
      item.property.includes("成分") ||
      item.property.includes("%")
  );

  // 如果没有找到特定成分数据，则使用所有数据
  if (componentItems.length === 0) {
    return props.data.details.map((item) => ({
      name: item.property,
      value: parseFloat(item.value.replace(/[^0-9.-]/g, "")) || 0,
    }));
  }

  // 处理成分数据
  return componentItems.map((item) => ({
    name: item.property,
    value: parseFloat(item.value.replace(/[^0-9.-]/g, "")) || 0,
  }));
}
// 模态框关闭处理
function handleModalClose() {
  // 销毁ECharts实例
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
}

function addCompare() {
  hasCompareButton.value = !hasCompareButton.value;
  message.info(hasCompareButton.value ? "已加入对比" : "已移除对比");
}

// 组件卸载时清理资源
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  window.removeEventListener(
    "resize",
    (window as any).__echartsResizeHandler__
  );
});
</script>

<style scoped>
.ai-suggestion {
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  background-color: #232f44cc;
  border-radius: 8px;
  border-left: 4px solid rgb(0, 188, 212);
}

.suggestion-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.suggestion-list {
  padding-left: 25px;
  font-size: 1.05rem;
}

:deep(.suggestion-list li) {
  margin-bottom: 10px;
  line-height: 1.5;
}

:deep(.highlight) {
  color: rgb(0, 188, 212);
  font-weight: 600;
}
</style>
