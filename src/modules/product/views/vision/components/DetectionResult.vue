<template>
    <a-card style="height: 100%;">
        <template #title>
            <h2 style="color: #00bcd4;" class="text-3xl">检测结果摘要面板</h2>
        </template>
        <div v-if="props.columData">
            <a-flex align="center" justify="center" vertical>
                <p class="w-full p-5   rounded-lg border-2  text-center text-xl font-bold"
                    :class="isSucceed ? 'text-[#34a853] bg-[#e6f7ff] border-[#34a853]' : 'text-[#ea4335] bg-[#ffebee] border-[#ea4335]'">
                    总体判定：{{ isSucceed ? "合格" : "不合格" }}</p>

            </a-flex>
            <a-flex align="center" justify="space-between" class="py-2.5 my-2.5 border-b border-[dadce0]">
                <span class="text-xl">检测时间：</span>
                <span class="text-xl">{{ props.columData.date }}</span>
            </a-flex>
            <a-flex align="center" justify="space-between" v-for="col in props.columData.columns"
                class="py-2.5 my-2.5 border-b border-[dadce0]">
                <span class="text-xl">{{ col.title }}：</span>
                <span :class="col.status" class="text-xl">{{ col.value }}</span>
            </a-flex>
            <p class="summary text-xl">指标未达标：{{ failCount }} 项</p>
        </div>
        <div v-else>
            <a-flex align="center" justify="center" vertical>
                <p
                    class="w-full p-5 text-[#34a853] bg-[#e6f7ff] rounded-lg border-2 border-[#34a853] text-center text-xl font-bold">
                    暂无数据</p>

            </a-flex>
        </div>
    </a-card>
</template>
<script setup lang="ts">
import type { DetectionResultData } from '@/modules/product/types/DetectionResult';
import { formatDateTime } from '@/utils/tools';
import { onMounted, ref, watch } from 'vue';
const props = defineProps<{
    columData?: DetectionResultData;
}>()
const columData = ref<DetectionResultData>({
    date: formatDateTime(new Date()),
    columns: [
        {
            title: "尺寸精度",
            value: "0.5%",
            status: "succeed"
        },
        {
            title: "表面材质",
            value: "0.008um",
            status: "succeed"
        }, {

            title: "焊接质量",
            value: "不完整",
            status: "fail"
        },
        {
            title: "涂层厚度",
            value: "不均匀",
            status: "fail"

        }
    ]
})
const failCount = ref(0);
const isSucceed = ref(true);
function getFailCount(columns: DetectionResultData['columns']) {
    return columns.filter(col => col.status === 'fail').length;
}
watch(() => props.columData, (newVal) => {
    if (!newVal) return;
    failCount.value = getFailCount(newVal.columns);
    isSucceed.value = failCount.value <= 2;
})
</script>
<style scoped>
.succeed {
    color: #34a853;
}

.fail {
    color: #ea4335;
}

.summary {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    text-align: center;
    background-color: #232f44cc;
    border-radius: 8px;
    border-left: 4px solid rgb(0, 188, 212);
    cursor: pointer;
}
</style>