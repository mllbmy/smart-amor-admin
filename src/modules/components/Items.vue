<template>
  <div>
    <a-row :gutter="20">
      <a-col :span="6" v-for="item in itemsData" :key="item.name">
        <a-card class="card">
          <p
            :style="{
              color: item.color,
            }"
            class="text-lg text-center font-bold"
          >
            {{ item?.name }}
          </p>
          <a-statistic
            :value="item.value"
            :valueStyle="{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
            }"
          >
            <template #suffix>
              <span>台</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  deviceOpenRateData: {
    type: Object,
    default: () => ({}),
  },
});

// 设备数据是异步加载的，需用 computed 跟随 props 变化；
// 原先在 onMounted 里一次性赋值，首屏之后数值不会再更新。
const itemsData = computed<any[]>(() => props.deviceOpenRateData?.data || []);
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
