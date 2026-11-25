<template>
    <div id="charts" :style="props.chartStyle" ref="charts"></div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const charts = ref(null);
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
    option: {
        type: Object,
        default: () => ({})
    },
});

// 保留实例，便于在 option 变化时重绘（原先只在挂载时 setOption 一次，
// 异步数据返回后图表数值不会更新）
let myChart: any = null;
let observer: ResizeObserver | null = null;

onMounted(() => {
    import("echarts").then((echarts) => {
        if (!charts.value) return;
        myChart = echarts.init(charts.value, null, { renderer: "canvas" });
        myChart.setOption(props.option);
        observer = new ResizeObserver(() => {
            setTimeout(() => myChart && myChart.resize(), 800);
        });
        observer.observe(charts.value);
    });
});

watch(
    () => props.option,
    (val) => {
        if (myChart && val) myChart.setOption(val, true);
    },
    { deep: true }
);

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
    if (myChart) myChart.dispose();
    myChart = null;
});
</script>
<style scoped></style>
