<template>
  <h2 style="color: #00bcd4" class="text-3xl">全流程溯源查询</h2>
  <a-card style="height: 100%">
    <a-flex vertical align="center">
      <a-qrcode :value="QRCodeText" :size="250" />

      <span class="my-3.5 text-xl">请扫描模芯二维码</span>
      <a-input-search v-model:value="formData.value" placeholder="输入批次号" enter-button size="large"
        :loading="searchLoading" @search="onSearch" />
    </a-flex>
  </a-card>
  <Result :data-source="result" />
</template>
<script setup lang="ts">
import {
  getBatchByBatchNo,
  getBatchesList,
  getOperatorList,
} from "@/modules/product/api/BatchSearch";
import type { BatchSearchResult } from "@/modules/product/types/BatchSearch";
import { loadLocationData } from "@/utils/tools";
import { message } from "ant-design-vue";
import { onMounted, ref, watch } from "vue";
import Result from "./Result.vue";
const result = ref<BatchSearchResult[] | null>(null);
const formData = ref({
  value: "",
});
const searchLoading = ref(false);
const QRCodeText = ref("Thanks for your watch!");
async function onSearch() {
  const value = formData.value.value;
  searchLoading.value = true;
  try {
    const operatorsRes = await getOperatorList();

    if (!value.trim()) {
      const res = await getBatchesList();
      if (res.status === 200 && operatorsRes.status === 200) {
        result.value = res.data.map((item: any) => {
          return {
            key: item.id,
            productionDate: item.productionDate,
            equipment: item.equipment,
            batchNo: item.batchNo,
            material: item.material,
            process: item.process,
            quality: item.quality ? "合格" : "不合格",
            operator: operatorsRes.data!.find(
              (operator: any) => operator.id === item.operatorId
            ).name,
          };
        });
      } else {
        message.error("查询失败" + res.message);
      }
    } else {
      const res = await getBatchByBatchNo(value);

      if (res.status === 200 && operatorsRes.status === 200) {
        result.value = Array.of(res.data).map((item) => {
          return {
            key: item.id,
            productionDate: item.productionDate,
            equipment: item.equipment,
            batchNo: item.batchNo,
            material: item.material,
            process: item.process,
            quality: item.quality ? "合格" : "不合格",
            operator: operatorsRes.data!.find(
              (operator: any) => operator.id === item.operatorId
            ).name,
          };
        });
      } else {
        message.error("查询失败" + res.message);
      }
    }
    searchLoading.value = false;
    message.success("查询成功!");
  } catch (error: any) {
    message.error("查询失败");
    console.error(error);
    searchLoading.value = false;
  }
}

onMounted(async () => {
  if (!loadLocationData("batchSearchResultData", result)) onSearch();
});
watch(result, (newResult) => {
  localStorage.setItem("batchSearchResultData", JSON.stringify(newResult));
});
</script>
<style scoped></style>
