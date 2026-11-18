<template>
  <a-layout class="layout-content">
    <div class="text-center py-4 page-header relative">
      <h1 class="text-4xl text-center">热耦合成型工艺优化引擎</h1>
      <p style="color: #00bcd4" class="text-lg text-center">
        输入您的模芯结构特征，获取最优工艺参数
      </p>
    </div>
    <a-layout-content style="margin: 0 16px; padding: 36px 0">
      <a-row :style="{ padding: '0 24px' }" gap="miiddle" :gutter="16">
        <a-col :xl="12" :xs="24">
          <Search @search:result="handleSearch" @search:init="handleSearchInit" />
          <div class="pt-5 w-full mt-8 md:hidden lg:block">
            <div class="ai-suggestion">
              <div class="suggestion-header">
                <i class="fas fa-lightbulb"></i>
                <div class="suggestion-title text-xl">AI优化建议</div>
              </div>
              <ul class="suggestion-list" v-html="resultData?.suggestion"></ul>
            </div>
          </div>
        </a-col>
        <a-col :xl="12" :xs="24">
          <Result :data="resultData" />
          <div class="pt-5 w-full mt-8 md:block lg:hidden">
            <div class="ai-suggestion">
              <div class="suggestion-header">
                <i class="fas fa-lightbulb"></i>
                <div class="suggestion-title text-xl">AI优化建议</div>
              </div>
              <ul class="suggestion-list" v-html="resultData?.suggestion"></ul>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import type { SearchResult } from "@/modules/research/types/optimize/Search";
import Search from "./components/Search.vue";
import { ref } from "vue";
import Result from "./components/Result.vue";
import type { UseSaerch } from "../../api/useSearch";

const resultData = ref<SearchResult | null>(null);
const search = ref<UseSaerch<SearchResult> | null>();


const handleSearch = (result: SearchResult) => {
  resultData.value = result;
  search.value?.saveToStorage(result);
};
const handleSearchInit = (useSearch: UseSaerch<SearchResult>) => {
  search.value = useSearch;
  search.value.loadFromStorage();

  resultData.value = search.value.resultData;
};
</script>
<style scoped>
.ai-suggestion {
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  background-color: #232f44cc;
  border-radius: 8px;
  border-left: 4px solid rgb(0, 188, 212);
}

.suggestion-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.suggestion-list {
  padding-left: 25px;
  font-size: 1.05rem;
}

:deep(.suggestion-list li) {
  margin-bottom: 10px;
  line-height: 1.5;
}

:deep(.highlight) {
  color: rgb(0, 188, 212);
  font-weight: 600;
}
</style>
