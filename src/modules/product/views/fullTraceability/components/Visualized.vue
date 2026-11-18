<template>
  <a-table :columns="columns" :data-source="props.dataSource" :pagination="getPagtion()"
    :customHeaderRow="props.styleOption ? props.styleOption.customHeaderRow : customHeaderRow"
    :customRow="props.styleOption ? props.styleOption.customRow : customRow" :style="{
      backgroundColor: props.styleOption?.bgColor
    }" :scroll="{ x: 'max-content' }">
    <template #bodyCell="{ column, value }">
      <template v-if="column.key !== 'device'">
        <a-button :size="props.styleOption ? props.styleOption.size : 'large'" v-if="value" :style="{
          color: value.color,
          borderColor: value.color,
        }" @click="value.handle">{{ value.key }}</a-button>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import type { ScheduleData } from "@/modules/product/types/Schedule";
import { customHeaderRow, customRow } from "@/utils/table";
import { ref, watch } from "vue";
const handle = () => { };
const props = defineProps<{
  dataSource: ScheduleData[];
  styleOption?: {
    size: string,
    bgColor: string,
    customHeaderRow: Function | null,
    customRow: Function | null,
    pageSize?: number | boolean
  };
}>();
const columns = ref([
  {
    title: "设备",
    dataIndex: "device",
    key: "device",
  },
  {
    title: "周一",
    dataIndex: "Monday",
    key: "Monday",
  },
  {
    title: "周二",
    dataIndex: "Tuesday",
    key: "Tuesday",
  },
  {
    title: "周三",
    dataIndex: "Wednesday",
    key: "Wednesday",
  },
  {
    title: "周四",
    dataIndex: "Thursday",
    key: "Thursday",
  },
  {
    title: "周五",
    dataIndex: "Friday",
    key: "Friday",
  },
]);
watch(
  () => props.dataSource,
  (newVal: ScheduleData[]) => {
    if (newVal) {
    }
  }
);
// const dataSource = ref([
//   {
//     key: "1",
//     device: "TM-01",
//     level: 1,
//     deadline: "2026-09-01",
//     efficiency: 0.8,
//     Monday: null,
//     Tuesday: null,
//     Wednesday: null,
//     Thursday: null,
//     Friday: null,
//   },
// ]);
const ORDER = [
  { key: "紧急", color: "#ea473a", handle: handle },
  { key: "故障", color: "#8d9094", handle: handle },
  { key: "XM", color: "#4285f4", handle: handle },
  { key: "BYD", color: "#34a853", handle: handle },
  { key: "HW", color: "#fbbc05", handle: handle },
] as const;
// function getOrder(orderName: string) {
//   for (const order of ORDER) {
//     console.log(order);
//   }
// }
const getPagtion = () => {
  const styleOption = props.styleOption;
  if (!styleOption) return { pageSize: 5 };
  return styleOption.pageSize === false ? false : {
    pageSize: styleOption.pageSize
  }
}
</script>
<style scoped>
.ing {
  color: #fbbc05;
}

.danger {
  color: #ea4335;
}

</style>
