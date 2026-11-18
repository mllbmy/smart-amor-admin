<template>
    <div class="flex items-start gap-4" style="font-family: 'Courier New', monospace; ">
        <span class="text-xl">{{ currentTime }}</span>
        <span class="alert-badge lg:block md:hidden w-full">{{ countWarning }}条新报警</span>
    </div>
</template>
<script lang="ts" setup>
import { formatDateTime } from '@/utils/tools';
import { onMounted, ref } from 'vue';
const currentTime = ref<string>("");
const countWarning = ref<number>(Math.floor(Math.random() * 20));
// 更新时间函数
const updateTime = () => {
    currentTime.value = formatDateTime(new Date());
};

onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);
});
</script>
<style scoped></style>