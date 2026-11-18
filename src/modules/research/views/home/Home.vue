<template>
  <a-layout class="layout-content">
    <header class="layout-header leading-normal">
      <div class="text-center py-4 relative">
        <h1 class="text-4xl">晶工巧匠</h1>
        <p class="text-lg text-[#00bcd4]">
          ——基于AI大模型的非晶合金材料与工艺智能优化系统——
        </p>
      </div>
    </header>
    <a-layout-content style="margin: 0 16px">
      <div :style="{ padding: '24px', minHeight: '360px' }">
        <section class="pb-4">
          <Items />
        </section>
        <section>
          <Search @search="handleSearch" :database_data="database_data" />
        </section>
        <section style="margin: 20px 0">
          <MaterialDataBase
            @addComparison="handleAddComparison"
            @init:database_data="handleDatabase_data"
            :search_data="search_data"
            :cancelComparison="comparison_data"
          />
        </section>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center" class="layout-footer">
      AMOR ©2025 Created by Ken
    </a-layout-footer>
    <CardComparison
      :cards_data="comparison_data"
      @cancelComparison="handleCancelComparison"
    />
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Items from "./components/Items.vue";
import Search from "./components/Search.vue";
import MaterialDataBase from "./components/MaterialDataBase.vue";
import CardComparison from "./components/CardComparison.vue";
import type { MaterialData } from "../../types/home/MaterialDataBase";

// 监听子组件事件
const comparison_data = ref<MaterialData[]>([]);
const database_data = ref<MaterialData[]>([]);
const handleAddComparison = (data: MaterialData[]) => {
  comparison_data.value = data;
};
const handleDatabase_data = (data: MaterialData[]) => {
  database_data.value = data;
};
const search_data = ref<MaterialData[]>([]);
function handleSearch(data: MaterialData[]) {
  search_data.value = data;
}

function handleCancelComparison() {
  comparison_data.value = [];
}
</script>
<style scoped></style>
