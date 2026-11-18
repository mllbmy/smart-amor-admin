<script setup lang="ts">
import { useCountUpList } from "@/utils/useCountUp";

// 数字进入页面时从 0 滚动到目标值，配合卡片悬停微交互
const itemsData = [
    { value: 268, suffix: "+", content: "微米级非晶成分" },
    { value: 540, suffix: "+", content: "优化成分数据" },
    { value: 30, suffix: "%", content: "材料筛选周期短" },
    { value: 40, suffix: "%", content: "工艺调试实验减少" },
]

const displays = useCountUpList(
    itemsData.map((item) => ({ value: item.value, suffix: item.suffix }))
)
</script>
<template>
    <a-row :gutter="16" class="anim-stagger">
        <a-col :span="6" v-for="(item, index) in itemsData" :key="item.content">
            <a-card :bordered="false" class="text-center border border-[#00bcd4] stat-card" size="small">
                <h1 style="color: #00bcd4;" class="text-4xl stat-num">{{ displays[index] }}</h1>
                <p style="color: #5f7c8a;" class="text-base">{{ item.content }}</p>
            </a-card>
        </a-col>
    </a-row>
</template>

<style scoped>
h1,
p {
    margin: 0;
}
</style>