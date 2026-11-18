<template>
  <a-card :bordered="false" style="height: 100%">
    <template #title>
      <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
        <p class="text-xl pl-2" style="border-left: 3px solid #ff4d4d;">报警信息中心</p>
        <span class="alert-badge" style="border-radius: 50%;">{{ renderData?.length }}</span>
      </div>
    </template>
    <div style="display: flex; flex-direction: column; gap: 15px">
      <a-flex align="center" :gap="'small'" v-for="(item, _index) in renderData" :key="item.id"
        class="device-status-card">
        <div class="device-status"></div>
        <div class="flex flex-col items-start">
          <p class="text-[#00bcd4] font-bold text-lg w-full">
            {{ item.id }}
            &nbsp;
            <span style="color: #5f7c8a">{{ item.msg }}</span>
          </p>
          <p class="text-base text-[#5f7c8a]">
            {{ formatTime(item.time) }}
          </p>

        </div>
      </a-flex>
    </div>
  </a-card>
</template>
<script setup lang="ts">
import type { WarnInfoRenderData } from "@/modules/product/types/DeviceInfo";
import { ref, watch } from "vue";

// 格式化时间戳为时:分格式
const formatTime = (timestamp: string | number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
const props = defineProps<{
  renderData: WarnInfoRenderData[] | undefined;
}>();

const renderData = ref<WarnInfoRenderData[]>();
watch(
  () => props.renderData,
  (newVal) => {
    renderData.value = newVal;
  },
  {
    deep: true,
  }
);
</script>
<style scoped>
.device-status-card {
  background: linear-gradient(90deg, rgba(255, 77, 77, 0.1) 0%, transparent 100%);
  padding: 15px 20px;
  border-radius: 10px;
  transition: all 0.4s;
  border-left: 4px solid #ff4d4d;
}

.device-status-card:hover {
  background-color: #2d3b55;
}
</style>
