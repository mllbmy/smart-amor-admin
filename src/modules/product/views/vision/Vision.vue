<template>
  <a-layout class="layout-content">
    <Header :title="'AI视觉质量检测工作台'" />
    <a-layout-content style="margin: 0 16px">
      <main class="px-6">
        <a-row :gutter="[16, 16]">
          <a-col :xl="12" :xs="24">
            <Detection @search:result="searchResultHandler" @markers:update="markersUpdateHandle"
              @markers:delete="markersDeleteHandle" @reset="detectionResetHandle" :locateDefect="locateDefectData"
              :deleteMarkerKey="deleteMarkerKey" />
          </a-col>
          <a-col :xl="12" :xs="24">
            <DetectionResult :columData="detectionResultColumData" />
          </a-col>
        </a-row>
        <section style="margin-top: 20px">
          <Report :reportData="reportData" :deleteData="deleteReportData" @locate:defect="locateDefectHandle"
            @marker:delete="(key: number) => {
              deleteMarkerKey = key;
            }" />

        </section>
      </main>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Detection, { type Marker } from "./components/Detection.vue";
import DetectionResult from "./components/DetectionResult.vue";
import Report from "./components/Report.vue";
import type { DetectionResultData } from "../../types/DetectionResult";
import { getRandomNumber, loadLocationData } from "@/utils/tools";
const detectionResultColumData = ref<DetectionResultData>();
const reportData = ref<ReportData>();
const deleteReportData = ref<number>();
const locateDefectData = ref<ReportData>();
const deleteMarkerKey = ref<number>();
function searchResultHandler(results: DetectionResultData) {
  detectionResultColumData.value = results;
  localStorage.setItem("detectionResultColumData", JSON.stringify(results));

}
function markersUpdateHandle(marker: Marker) {
  reportData.value = markersHandle(marker);

}
function markersDeleteHandle(marker: number) {
  deleteReportData.value = marker;

}
function locateDefectHandle(marker: any) {
  locateDefectData.value = marker;
}
function detectionResetHandle() {

  // detectionResultColumData.value = null;
}
onMounted(() => {
  loadLocationData("detectionResultColumData", detectionResultColumData);
});
function markersHandle(marker: Marker): ReportData {
  const types = [
    "刀纹",
    "气孔",
    "裂纹",
    "毛刺",
    "划痕",
    "凹陷",
    "焊渣",
    "氧化斑",
    "材料夹杂",
    "变形",
  ];
  const levels = ["warning", "danger"];
  if (marker?.custom) {
    return {
      key: marker.key,
      type: "未知",
      level: "未知",
      position: {
        x: marker.x,
        y: marker.y,
      },
    };
  } else {
    return {
      key: marker.key,
      type: types[getRandomNumber(0, types.length - 1)] as string,
      level: levels[getRandomNumber(0, levels.length - 1)] as string,
      position: {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
      },
    };
  }
}
</script>
<style scoped></style>
