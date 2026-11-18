<template>
    <div id="charts" :style="props.chartStyle" ref="charts"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

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
        default: {}
    },
});
onMounted(() => {
    import("echarts").then((echarts) => {
        const myChart = echarts.init(charts.value, null, {
            renderer: 'canvas'                                                                                                                                               
        });
        myChart.setOption(props.option);
        let observer = new ResizeObserver(function () {
            setTimeout(() => {
                myChart.resize();
            }, 800);
        });
        observer.observe(charts.value);
    });

});
</script>
<style scoped></style>
