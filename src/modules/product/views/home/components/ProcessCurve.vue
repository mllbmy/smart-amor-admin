<template>
  <div id="process-curve-chart" class="w-full" style="height: 75vh"></div>
</template>
<script setup lang="ts">
import { getRandomNumber } from "@/utils/tools";
import * as echarts from "echarts";
import { onMounted, ref, watch } from "vue";

const prop = defineProps<{
  curProcessCurve: any;
}>();

onMounted(() => {
  const myChart = echarts.init(document.getElementById("process-curve-chart"));
  function updateChartsOption(value: string[]) {
    const batches = value; // 生产批次号
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];

    echarts.util.each(batches, function (batch: string) {
      // 温度
      const tempDatasetId = `dataset_temp_${batch}`;
      datasetWithFilters.push({
        id: tempDatasetId,
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "BatchID", "=": batch }, // 过滤当前批次
              { dimension: "TimePoint", gte: 0 }, // 时间从0开始
            ],
          },
        },
      });
      seriesList.push({
        type: "line",
        datasetId: tempDatasetId,
        showSymbol: false, // 隐藏数据点（更平滑）
        name: `${batch} - 温度`, // 系列名称（批次+参数）
        endLabel: {
          show: true,
          formatter: (params: any) => `${params.data[0]}: ${params.data[1]}℃`, // 标签显示批次+温度
        },
        labelLayout: { moveOverlap: "shiftY" }, // 标签重叠时上移
        emphasis: { focus: "series" }, //  hover时聚焦系列
        encode: {
          x: "TimePoint", // X轴：工艺时间
          y: "Temperature", // Y轴：温度
          label: ["BatchID", "Temperature"], // 标签维度
          tooltip: ["Temperature"], // 提示框显示温度
        },
        yAxisIndex: 0, // 绑定左侧Y轴（温度）
      });
      // 压力
      const pressureDatasetId = `dataset_pressure_${batch}`;
      datasetWithFilters.push({
        id: pressureDatasetId,
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "BatchID", "=": batch },
              { dimension: "TimePoint", gte: 0 },
            ],
          },
        },
      });
      seriesList.push({
        type: "line",
        datasetId: pressureDatasetId,
        showSymbol: false,
        name: `${batch} - 压力`,
        endLabel: {
          show: true,
          formatter: (params: any) => `${params.data[0]}: ${params.data[3]}MPa`, // 标签显示批次+压力
        },
        encode: {
          x: "TimePoint", // X轴：工艺时间
          y: "Pressure", // Y轴：压力
          label: ["BatchID", "Pressure"], // 标签维度
          tooltip: ["Pressure"], // 提示框显示压力
        },
        yAxisIndex: 1, // 绑定右侧Y轴（压力）
      });
    });
    const sourceData = Array.from({ length: 9 }, (_, i) => [
      batches[0],
      i,
      getRandomNumber(50, 60),
      Math.random() * (0.9 - 0.8) + 0.8,
      getRandomNumber(60, 70),
    ]);

    let option = {
      animationDuration: 3000,
      dataset: [
        {
          id: "dataset_raw",
          // 第一行是「维度声明」（ECharts通过名称匹配数据，无需依赖顺序）
          source: [
            ["BatchID", "TimePoint", "Temperature", "Pressure", "Yield"],
            ...sourceData,
          ],
        },
        ...datasetWithFilters,
      ],
      title: {
        text: "生产批次工艺参数（温度/压力）随时间变化",
        textStyle: { color: "#fff" },
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" }, // 十字准星指示
        order: "valueDesc",
      },
      legend: {
        data: batches.flatMap((batch) => [
          `${batch} - 温度`,
          `${batch} - 压力`,
        ]), // 图例显示所有系列
        textStyle: { color: "#ccc" },
        bottom: 0,
      },

      xAxis: {
        type: "category",
        name: "工艺时间（小时）",
        nameLocation: "middle",
        nameGap: 30,
      },
      yAxis: [
        {
          name: "温度（℃）",
          type: "value",
          position: "left",
          axisLine: { show: true, lineStyle: { color: "#ee6666" } }, // 左侧轴红色
          max: 100,
        },
        {
          name: "压力（MPa）",
          type: "value",
          position: "right",
          axisLine: { show: true, lineStyle: { color: "#73c0de" } }, // 右侧轴蓝色
          max: 1,
        },
      ],
      series: seriesList,
    };

    myChart.setOption(option);
  }
  updateChartsOption([prop.curProcessCurve.equipment]);
  watch(
    () => prop.curProcessCurve,
    (newValue) => {
      updateChartsOption([newValue.equipment]);
    }
  );
});
</script>
<style></style>
