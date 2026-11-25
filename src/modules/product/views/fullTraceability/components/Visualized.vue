<template>
  <a-table :columns="columns" :data-source="props.dataSource" :pagination="getPagtion()"
    :customHeaderRow="props.styleOption ? props.styleOption.customHeaderRow : customHeaderRow"
    :customRow="props.styleOption ? props.styleOption.customRow : customRow" :style="{
      backgroundColor: props.styleOption?.bgColor
    }" :scroll="{ x: 'max-content' }">
    <template #bodyCell="{ column, value, record }">
      <template v-if="column.key !== 'device'">
        <a-button :size="props.styleOption ? props.styleOption.size : 'large'" v-if="value" :style="{
          color: value.color,
          borderColor: value.color,
        }" @click="handleCell(value, column, record)">{{ value.key }}</a-button>
      </template>
    </template>
  </a-table>

  <a-modal v-model:open="cellDetailOpen" title="排程节点详情" :footer="null" width="520px" centered>
    <div v-if="cellDetail" class="text-sm leading-7">
      <p><span class="text-slate-400 w-20 inline-block">设备：</span>{{ cellDetail.device }}</p>
      <p><span class="text-slate-400 w-20 inline-block">日期：</span>{{ cellDetail.day }}</p>
      <p>
        <span class="text-slate-400 w-20 inline-block">状态：</span>
        <a-tag :color="cellDetail.color">{{ cellDetail.key }}</a-tag>
      </p>
      <p class="mt-2 p-3 rounded bg-slate-50 text-slate-600">{{ cellDetail.desc }}</p>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import type { ScheduleData } from "@/modules/product/types/Schedule";
import { customHeaderRow, customRow } from "@/utils/table";
import { ref, watch } from "vue";
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
  { key: "紧急", color: "#ea473a" },
  { key: "故障", color: "#8d9094" },
  { key: "XM", color: "#4285f4" },
  { key: "BYD", color: "#34a853" },
  { key: "HW", color: "#fbbc05" },
] as const;

/* 点击排程格子：弹出该节点的说明，避免"点了没反应" */
const CELL_DESC: Record<string, string> = {
  紧急: "该时段被标记为紧急插单，需优先保障机台与人力，其余任务顺延。",
  故障: "设备在该时段处于故障状态，排程已暂停并转由维保工单处理。",
  XM: "该时段执行下模（镶件换型）作业，结束后需复检模具定位精度。",
  BYD: "该时段为备料待产状态，等待上游物料到位后自动转为生产。",
  HW: "该时段执行热处理工序，需按工艺曲线控制升温与保温时长。",
};

const cellDetailOpen = ref(false);
const cellDetail = ref<{ device: string; day: string; key: string; color: string; desc: string } | null>(null);

function handleCell(value: any, column: any, record: any) {
  if (!value) return;
  cellDetail.value = {
    device: record?.device ?? "-",
    day: column?.title ?? "-",
    key: value.key,
    color: value.color,
    desc: CELL_DESC[value.key] || "该时段为该设备的生产排程节点。",
  };
  cellDetailOpen.value = true;
}
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
