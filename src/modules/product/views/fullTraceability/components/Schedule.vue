<template>
  <h2 style="color: #00bcd4" class="text-3xl">智能生产排程</h2>
  <a-card style="height: 100%">
    <template #title>
      <h3 class="text-2xl">排程参数设置</h3>
    </template>
    <a-flex vertical>
      <a-select v-model:value="formData.value" :size="'large'" style="width: 100%">
        <a-select-option v-for="option in options" :key="option" :value="option">
          <span class="text-lg">{{ getOptionsName(option) }}</span>
        </a-select-option>
      </a-select>
      <a-checkbox v-model:checked="formData.ignore" style="margin: 20px 0"><span
          class="text-lg">排除故障设备</span></a-checkbox>
      <a-button size="large" style="height: 55px" @click="generateSchedule(formData)"><span
          class="text-xl">一键生成排程计划</span></a-button>
    </a-flex>
  </a-card>
</template>
<script setup lang="ts">
import {
  getSchedule,
  type ScheduleFormData,
} from "@/modules/product/api/Schedule";
import type { ScheduleData } from "@/modules/product/types/Schedule";
import { message } from "ant-design-vue";
import { ref } from "vue";

const options = ref(["level", "deadline", "efficiency"]);

const formData = ref<ScheduleFormData>({
  value: "level",
  ignore: true,
});
const dataSource = ref<ScheduleData[]>([]);
const emits = defineEmits(["generate:schedule"]);
function getOptionsName(value: string) {
  switch (value) {
    case "level":
      return "等级优先";
    case "deadline":
      return "交期优先";
    case "efficiency":
      return "效率优先";
  }
}
const isLading = ref(false);
async function generateSchedule(formData: ScheduleFormData) {
  if (isLading.value) return message.warn("正在生成排程计划，请稍后...");
  isLading.value = true;

  message.loading({ content: "正在生成排程计划...", key: "schedule", duration: 0 });
  dataSource.value = await getSchedule(formData);
  emits("generate:schedule", dataSource.value);
  message.destroy("schedule");
  message.success({ content: "排程计划生成完成!" });
  isLading.value = false;

}
</script>
<style scoped></style>
