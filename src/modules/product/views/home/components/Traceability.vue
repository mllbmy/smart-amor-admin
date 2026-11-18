<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :customHeaderRow="customHeaderRow"
      :customRow="customRow"
    >
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.key === 'processCurve'">
          <a-button size="large" @click="checkProcessCurve(record)"
            ><span>查看</span>
          </a-button>
        </template>
        <template v-if="column.key === 'operation'">
          <a-button size="large" @click="handleDownload(value)"
            ><span>下载报告</span>
          </a-button>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="processCurveModalOpen"
      :title="curProcessCurve ? curProcessCurve.batchNo : '批次曲线'"
      :footer="null"
      style="width: 85%"
    >
      <ProcessCurve :curProcessCurve="curProcessCurve" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { getBatchesList, getEquipmentList } from "@/modules/product/api/BatchSearch";
import { customHeaderRow, customRow } from "@/utils/table";
import ProcessCurve from "./ProcessCurve.vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
const processCurveModalOpen = ref(false);

const curProcessCurve = ref<any | null>(null);
const columns = ref([
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
  {
    title: "设备",
    dataIndex: "equipment",
    key: "equipment",
  },
  {
    title: "工艺曲线",
    dataIndex: "processCurve",
    key: "processCurve",
  },
  {
    title: "操作",
    key: "operation",
  },
]);

const dataSource = ref([
  {
    key: "1",
    batchNo: "BATCH-20231026-01",
    productionDate: "2023-10-26",
    equipment: "TM-YJ-02",
  },
  {
    key: "2",
    batchNo: "BATCH-20231025-03",
    productionDate: "2023-10-25",
    equipment: "TM-YJ-05",
  },
  {
    key: "3",
    batchNo: "BATCH-20231025-02",
    productionDate: "2023-10-25",
    equipment: "TM-YJ-07",
  },
  {
    key: "4",
    batchNo: "BATCH-20231024-05",
    productionDate: "2023-10-24",
    equipment: "TM-YJ-02",
  },
]);

// const handleSearch = () => {
//   if (searchValue.value) {
//     message.info(`搜索批次号: ${searchValue.value}`);
//   } else {
//     message.info("请输入批次号进行搜索");
//   }
// };

// const handleView = (record: any) => {
//   message.info(`查看批次 ${record.batchNo} 的详细信息`);
// };

const handleDownload = (record: any) => {
  message.success(`开始下载批次 ${record.batchNo} 的报告`);
};

const checkProcessCurve = (record: any) => {
  processCurveModalOpen.value = true;
  curProcessCurve.value = record;
};
onMounted(async () => {
  message.loading("正在加载数据...");
  const localData = localStorage.getItem("traceability_data");
  if (localData) {
    dataSource.value = JSON.parse(localData);
    message.destroy();
    return;
  }
  const res = await getBatchesList();
  const equipmentRes = await getEquipmentList();
  console.log(equipmentRes);

  if (res.status === 200 && equipmentRes.status === 200) {
    dataSource.value = res.data.map((item: any) => {
      return {
        key: item.id,
        batchNo: item.batchNo,
        productionDate: item.productionDate,
        equipment: equipmentRes.data.find(
          (equipment: any) => equipment.id === item.equipmentId
        ).equipmentCode,
      };
    });
    localStorage.setItem("traceability_data", JSON.stringify(dataSource.value));
  }
  message.destroy();
});
</script>
<style scoped></style>
