<template>
  <a-card style="height: 100%">
    <div class="flex items-center justify-center flex-col">
      <p v-if="!props.dataSource?.length" class="text-xl">
        请输入批次号或扫描二维码查询溯源信息
      </p>
      <a-table
        :columns="columns"
        :data-source="props.dataSource"
        v-if="props.dataSource?.length"
        class="w-full"
        :customHeaderRow="customHeaderRow"
        :customRow="customRow"
      >
        <template #bodyCell="{ column, value }">
          <template v-if="column.key === 'quality'">
            <p :class="value === '合格' ? 'text-green-300' : 'text-red-300'">
              {{ value }}
            </p>
          </template>
        </template>
      </a-table>
      <a-button v-if="props.dataSource?.length" @click="showDetail" size="large"
        >查看详情</a-button
      >
    </div>
    <a-modal
      v-model:open="openDetail"
      width="auto"
      :okText="'确定'"
      :footer="null"
    >
      <template #title>
        <p class="text-4xl py-5">批次详情</p>
      </template>
      <a-table
        :columns="detailColumns"
        :data-source="props.dataSource"
        v-if="props.dataSource?.length"
        class="w-full"
        :customHeaderRow="customHeaderRow"
        :customRow="customRow"
      >
        <template #bodyCell="{ column, value }">
          <template v-if="column.key === 'quality'">
            <p :class="value === '合格' ? 'text-green-300' : 'text-red-300'">
              {{ value }}
            </p>
          </template>
        </template>
      </a-table>
    </a-modal>
  </a-card>
</template>
<script setup lang="ts">
import type { BatchSearchResult } from "@/modules/product/types/BatchSearch";
import { customHeaderRow, customRow } from "@/utils/table";
import { onMounted, ref } from "vue";
const openDetail = ref(false);
const props = defineProps<{
  batchNo?: string;
  dataSource?: BatchSearchResult[] | null;
}>();
const columns = ref([
  {
    title: "批次号",
    dataIndex: "batchNo",
    key: "batchNo",
  },
  {
    title: "质检",
    dataIndex: "quality",
    key: "quality",
  },
  {
    title: "操作人员",
    dataIndex: "operator",
    key: "operator",
  },
]);
const detailColumns = ref([
  {
    title: "批次号",
    dataIndex: "batchNo",
    key: "batchNo",
  },
  {
    title: "生产日期",
    dataIndex: "productionDate",
    key: "productionDate",
  },
  //   {
  //     title: "设备",
  //     dataIndex: "equipment",
  //     key: "equipment",
  //   },
  {
    title: "物料",
    dataIndex: "material",
    key: "material",
  },
  {
    title: "工序",
    dataIndex: "process",
    key: "process",
  },
  {
    title: "质检",
    dataIndex: "quality",
    key: "quality",
  },
  {
    title: "操作人员",
    dataIndex: "operator",
    key: "operator",
  },
]);
const showDetail = () => {
  openDetail.value = true;
};
onMounted(() => {});
</script>
<style scoped></style>
