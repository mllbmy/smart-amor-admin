<template>
  <a-layout class="layout-content">
    <Header :title="'智能生产排程与全流程溯源系统'" />
    <a-layout-content style="margin: 0 16px">
      <main class="px-6">
        <a-row :gutter="[16, 16]">
          <a-col :xl="14" :xs="24">
            <a-flex vertical gap="20">
              <Schedule @generate:schedule="generateSchedule" />
              <a-card style="height: 100%;">
                <template #title>
                  <h2 style="color: #00bcd4" class="text-xl">
                    计划可视化 (甘特图)</h2>
                </template>
                <Visualized :dataSource="scheduleData" />
              </a-card>
            </a-flex>
          </a-col>
          <a-col :xl="10" :xs="24">
            <a-flex vertical gap="20">
              <QRCode />
            </a-flex>
          </a-col>
        </a-row>
      </main>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Schedule from "./components/Schedule.vue";
import Visualized from "./components/Visualized.vue";
import QRCode from "./components/QRCode.vue";
import type { ScheduleData } from "../../types/Schedule";
import { loadLocationData } from "@/utils/tools";
const scheduleData = ref<ScheduleData[]>([]);
function generateSchedule(data: ScheduleData[]) {
  scheduleData.value = data;
  localStorage.setItem("scheduleData", JSON.stringify(data));
}
onMounted(() => {
  loadLocationData("scheduleData", scheduleData);
});
</script>
<style scoped></style>
