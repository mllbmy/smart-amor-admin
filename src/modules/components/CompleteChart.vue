<template>
  <BaseCharts :option="option" />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import BaseCharts from "./BaseCharts.vue";
import * as echarts from "echarts";

const props = defineProps({
  chartStyle: {
    type: Object,
    default: () => {
      return {
        width: "100%",
        height: "100%",
      };
    },
  },
});
const target = ref(2000);
const current = ref(888);
const unFinished = computed(() => {
  return target.value - current.value;
});
const dailyCompletionRate = 44.4;
const consecutiveRate = 100;
// 定义主题颜色
const CYAN_COLOR = "#00FFFF"; // 主激活色：青色
const DARK_BG_COLOR = "#122c4d"; // 剩余部分的颜色
const option = ref({
  // 使用 graphic 组件来在中心绘制百分比文本和副标题
  graphic: {
    elements: [
      // 主百分比文本：44.4%
      {
        type: "text",
        left: "center",
        top: "45%",
        style: {
          text: `${dailyCompletionRate.toFixed(1)}%`,
          fill: CYAN_COLOR, // 文本颜色
          fontSize: 36,
          fontWeight: "bold",
          textAlign: "center",
        },
      },
      {
        type: "text",
        left: "center",
        top: "55%",
        style: {
          text: `总计划: ${consecutiveRate}%`,
          fill: "#999999", // 文本颜色
          fontSize: 14,
          textAlign: "center",
        },
      },
      // 模拟内圈的深色六边形背景 (可选，使用一个圆环替代)
      {
        type: "circle",
        left: "center",
        top: "center",
        shape: {
          cx: 0,
          cy: 0,
          r: 80, // 半径
        },
        style: {
          fill: "#00000060", // 黑色半透明填充
          stroke: "#00FFFF10", // 浅色边框
          lineWidth: 2,
        },
        // 使圆心与饼图中心对齐
        x: 50,
        y: 50,
        z: -1, // 确保在饼图之下
      },
    ],
  },

  series: [
    // 环形进度条
    {
      name: "完成进度",
      type: "pie",
      radius: ["65%", "85%"], // 设置内外半径，形成环形
      center: ["50%", "50%"], // 居中
      startAngle: 90, // 从顶部开始
      silent: true, // 禁用交互，使其更像静态仪表盘

      data: [
        {
          value: dailyCompletionRate,
          name: "完成",
          itemStyle: {
            // 进度部分的样式：青色渐变和阴影
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00FFFF" }, // 亮青
              { offset: 1, color: "#0088ff" }, // 亮蓝
            ]),
            shadowBlur: 10,
            shadowColor: "rgba(0, 255, 255, 0.7)", // 发光效果
          },
        },
        {
          value: 100 - dailyCompletionRate,
          name: "未完成",
          itemStyle: {
            // 剩余部分的样式：深色
            color: DARK_BG_COLOR,
            borderWidth: 0,
          },
        },
      ],

      // 禁用标签和指示线
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
    },
  ],
});
</script>
<style scoped></style>
