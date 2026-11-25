<template>
    <BaseCharts :option="option" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import BaseCharts from './BaseCharts.vue';

interface ProportionItem {
    name: string;
    value: number;
    color?: string;
}

const props = defineProps({
    // 由父组件传入各状态设备数量，例如 [{ name: '正常', value: 6, color: '#10b981' }]
    data: {
        type: Array as () => ProportionItem[],
        default: () => [],
    },
});

const items = computed<ProportionItem[]>(() => (Array.isArray(props.data) ? props.data : []));
const totalValue = computed(() => items.value.reduce((sum, d) => sum + (Number(d.value) || 0), 0));

const seriesData = computed(() =>
    items.value.map((d) => ({
        name: d.name,
        value: Number(d.value) || 0,
        itemStyle: { color: d.color || '#58D9F9' },
    }))
);

const percentOf = (name: string) => {
    const item = seriesData.value.find((d) => d.name === name);
    if (!item || !totalValue.value) return 0;
    return Math.round((item.value / totalValue.value) * 100);
};

const option = computed(() => ({
    title: {
        // 圆环中心展示"正常"占比
        text: `${percentOf('正常')}%`,
        left: '30%',
        top: 'center',
        textAlign: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 26,
            fontWeight: 'bold',
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} 台',
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        top: 'center',
        itemGap: 20,
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
            color: '#fff',
            fontSize: 16,
            padding: [0, 0, 0, 10],
        },
        formatter: (name: string) => `${name}   ${percentOf(name)}%`,
    },
    series: [
        {
            name: '设备状态',
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: { show: false },
            labelLine: { show: false },
            data: seriesData.value,
        },
    ],
}));
</script>
<style scoped></style>