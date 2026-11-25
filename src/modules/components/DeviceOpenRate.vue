<template>
  <BaseCharts :option="option" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import BaseCharts from './BaseCharts.vue';
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
  deviceOpenRateData: {
    type: Object,
    default: {},
  },
});
const colors = [
  [0.25, "#FF6E76"], // Reddish
  [0.5, "#FDDD60"], // Yellowish
  [0.75, "#58D9F9"], // Cyan/Blue
  [1, "#7CFFB2"], // Greenish
];
const dataValue = computed(() => {
  const { deviceOpenRateData } = props;
  const total = Number(deviceOpenRateData.total) || 0;
  const opened = Number(deviceOpenRateData.opened) || 0;
  if (!total) return 0; // 数据未就绪时避免 NaN
  return Math.max(0, Math.min(100, Math.round((opened / total) * 100)));
});
// option 改为 computed：设备数据异步返回后仪表盘数值会同步刷新
const option = computed(() => ({
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 4, // 0, 25, 50, 75, 100
      radius: "100%",
      center: ["50%", "80%"], // Lower the center to fit semi-circle better

      // The colorful arc line
      axisLine: {
        lineStyle: {
          width: 3,
          color: colors,
        },
      },

      // Small tick marks (minor)
      axisTick: {
        length: 6,
        lineStyle: {
          width: 1,
        },
      },

      // Large tick marks (major - at 25, 50, etc.)
      splitLine: {
        length: 12,
        lineStyle: {
          width: 2,
        },
      },

      // The numbers (0%, 25%...)
      axisLabel: {
        color: "#ccc",
        fontSize: 12,
        distance: 10,
        formatter: function (value) {
          return value + "%";
        },
      },
      pointer: {
        icon: "path://M0,0 L-6,10 L6,10 Z",
        length: "15%",
        width: 10,
        offsetCenter: [0, "-40%"],
        itemStyle: {
          color: "#00D2FF",
        },
      },

      detail: {
        valueAnimation: true,
        formatter: "{value}%",
        color: "#ccc",
        fontSize: 24,
        fontWeight: "normal",
        offsetCenter: [0, "0%"], // Position below the center
      },

      // The "开机率" Title text
      title: {
        offsetCenter: [0, "-20%"], // Position slightly above the value
        color: "#95CFD5", // Light cyan/white text
        fontSize: 18,
      },

      data: [
        {
          value: dataValue.value,
          name: "开机率",
        },
      ],
    },
  ],
}));

</script>
<style scoped></style>
