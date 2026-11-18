<template>
  <div>
    <a-card :bordered="false" class="full-height-card">
      <template #title>
        <p class="text-xl pl-2" style="border-left: 3px solid #00bcd4;">设备状态面板</p>
      </template>
      <div class="device-list">
        <a-flex v-for="item in renderData" :key="item.id" align="center" gap="small" class="device-status-card">
          <div class="device-status" :class="item.status"></div>
          <div class="device-info">
            <p class="device-id text-lg">{{ item.id }}</p>
            <span class="device-msg text-base">{{ item.msg }}</span>
          </div>
        </a-flex>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  renderData: DeviceStatus[] | undefined;
}>();
const renderData = ref<DeviceStatus[]>();
// 设备状态类型
type DeviceStatus = {
  id: string;
  msg: string;
  status: "normal" | "warning" | "error";
};

watch(
  () => props.renderData,
  (newVal) => {
    renderData.value = newVal;
  }
);
</script>

<style scoped>
.full-height-card {
  height: 100%;
}

.device-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.device-status-card {
  background-color: #2a3344;
  padding: 15px 20px;
  border-radius: 10px;
  transition: all 0.4s;
}

.device-status-card:hover {
  background-color: #2d3b55;
  cursor: pointer;
}

.device-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.device-id {
  font-weight: bold;
  color: #00bcd4;
}

.device-msg {
  color: #5f7c8a;
}

.device-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
}

.device-status.warning {
  background-color: #ffc107;
}

.device-status.error {
  background-color: #f44336;
  animation: blink 1.5s infinite;
}

.device-status.normal {
  background-color: #4caf50;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}
</style>
