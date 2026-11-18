<template>
    <BaseCharts :option="option" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BaseCharts from './BaseCharts.vue';
const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
})
const data = [
    { value: 75, name: '正常', itemStyle: { color: '#00E676' } },   // Green
    { value: 12, name: '停机', itemStyle: { color: '#FF3D00' } },   // Red
    { value: 7, name: '未开机', itemStyle: { color: '#FFC107' } }, // Grey
];
const option = ref({
    title: {
        text: '75%',
        left: '20%', // Manually positioned to align with the center of the pie (which is left-shifted)
        top: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 26,
            fontWeight: 'bold'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
    },

    // The Legend on the right
    legend: {
        orient: 'vertical',
        right: '0%',
        top: 'center',
        itemGap: 20, // Spacing between items
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
            color: '#fff',
            fontSize: 16,
            padding: [0, 0, 0, 10] // Add some padding between marker and text
        },
        // Custom formatter to align name and value like the image: "Name  Value%"
        formatter: function (name) {
            const item = data.find(p => p.name === name);
            return `${name}   ${item.value}%`;
        }
    },

    series: [
        {
            name: 'Status',
            type: 'pie',
            radius: ['55%', '70%'], // Donut shape
            center: ['30%', '50%'], // Shift chart to the left to make room for legend
            avoidLabelOverlap: false,

            // Hide label lines and labels on the chart itself
            label: {
                show: false,
            },
            labelLine: {
                show: false
            },

            data: data
        }
    ]
})
</script>
<style scoped></style>