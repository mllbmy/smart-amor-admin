<template>
  <div>
    <a-row :gutter="20">
      <a-col :span="6" v-for="item in itemsData" :key="item.name">
        <a-card class="card">
          <a-statistic :value="item.value" :valueStyle="{
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
          }">
            <template #suffix>
              <span class="text-xl">{{ item.unit }}</span>
            </template>
          </a-statistic>
          <p :style="{
            textAlign: 'center',
            color: item.color,
          }" class="text-xl">
            {{ item?.name }}
            <ArrowUpOutlined v-if="item?.isUp" style="color: #10b981; font-size: 16px" />
            <ArrowDownOutlined v-if="!item?.isUp" style="color: #ea4335; font-size: 16px" />
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
const itemsData = ref();

function getRandomData(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getData() {
  return [
    {
      name: "OEE",
      value: getRandomData(80, 100),
      unit: "%",
      isUp: Math.random() > 0.5,
      color: "#5f7c8a",
    },
    {
      name: "产量",
      value: getRandomData(125, 200),
      unit: "件",
      isUp: Math.random() > 0.5,
      color: "#5f7c8a",
    },
    {
      name: "合格率",
      value: ((Math.random() * (99 - 90 + 1)) + 90).toFixed(1),
      unit: "%",
      isUp: Math.random() > 0.5,
      color: "#10b981aa",
    },
    {
      name: "停机",
      value: getRandomData(1, 10),
      unit: "min",
      isUp: Math.random() > 0.5,
      color: "#ea4335aa",
    },
  ]
}
onMounted(() => {
  itemsData.value = getData();
  setInterval(() => {
    itemsData.value = getData();
  }, 3000);
})
</script>
<style scoped>
.card {
  border-color: #00bbd46c;
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #00bcd4;
}
</style>
