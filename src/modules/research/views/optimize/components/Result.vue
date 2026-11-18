<template>
  <div>
    <h1 style="color: #00bcd4" class="text-4xl">工艺优化结果</h1>
    <section style="padding: 20px 0">
      <h2 style="color: #00bcd4" class="text-3xl">推荐最优工艺参数</h2>
      <a-row :gutter="[16, 16]" style="padding: 10px 0">
        <a-col :span="12" v-for="(item, index) in props.data?.arguments" :key="index">
          <a-card>
            <a-statistic :value="item.value" :valueStyle="{ color: '#00bcd4', fontSize: '36px' }">
              >
              <template #title>
                <h3 class="text-xl">{{ item.property }}</h3>
              </template>
              <template #suffix>
                <span class="text-xl">{{ item.unit }}</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>

      <a-divider orientation="left" style="color: #00bcd4"><span class="text-xl">预测成型效果</span></a-divider>
      <a-row :gutter="[16, 16]">
        <a-col :span="24" v-for="(item, index) in props.data?.predict" :key="index">
          <a-card>
            <a-flex :align="'center'" :justify="'space-between'">
              <h3 style="margin: 0" class="text-2xl">{{ item.property }}</h3>
              <a-flex :align="'center'" gap="small">
                <a-statistic :value="item.value" :valueStyle="valueStyle(item.check)">
                </a-statistic>
                <CheckCircleFilled :style="valueStyle(item.check)" />
              </a-flex>
            </a-flex>
          </a-card>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from "@/modules/research/types/optimize/Search";
import { CheckCircleFilled } from "@ant-design/icons-vue";
import { watch } from "vue";
const props = defineProps<{
  data: SearchResult | null;
}>();
const valueStyle = (check: boolean) => {
  return {
    color: check ? 'green' : 'red',
    fontSize: '24px',
  }
}
watch(
  () => props.data,
  (newVal) => {
    if (!newVal) return;
  }
);
</script>

<style scoped></style>
