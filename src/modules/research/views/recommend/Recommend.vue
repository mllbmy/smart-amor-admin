<template>
  <a-layout class="layout-content">
    <div class="text-center py-8 relative page-header">
      <h1 class="text-4xl text-center">材料智能推荐算法</h1>
    </div>
    <a-layout-content style="margin: 0 16px; padding: 16px 0">
      <div :style="{ minHeight: '360px' }" class="lg:p-20 md:p10">
        <section>
          <Search @search:result="handleSearch" @search:init="handleSearchInit"
            v-model:searchFormData="searchFormData" />
        </section>
        <section>
          <SelectedPrompt @click:prompt="handleClickPrompt" :prompts="prompts" />
        </section>
        <section style="margin-top: 30px">
          <Result :data="resultData" />
        </section>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import type {
  SearchFormData,
  SearchResult,
} from "@/modules/research/types/recommend/Search";
import Search from "./components/Search.vue";
import { ref } from "vue";
import Result from "./components/Result.vue";
import SelectedPrompt from "../SelectedPrompt.vue";
import type { UseSaerch } from "../../api/useSearch";
import type { Prompt, PromptsResult } from "../../types/Prompt";
const resultData = ref<SearchResult | null>(null);
const search = ref<UseSaerch<SearchResult> | null>();
const prompts = ref<Prompt[]>([
  {
    id: "selected_prompt_1",
    content: "耐高温，高强度，适用于航空航天结构件",
    subtitle: "耐高温，高强度",
  },
  {
    id: "selected_prompt_2",
    content: "生物相容性，可降解，应用于植入式医疗器械",
    subtitle: "生物相容性，可降解",
  },
  {
    id: "selected_prompt_3",
    content: "轻量化，高导电性，用于电动汽车电池组件",
    subtitle: "轻量化，高导电性",
  },
  {
    id: "selected_prompt_4",
    content: "高弹性，耐磨损，用于机器人柔性关节",
    subtitle: "高弹性，耐磨损",
  },
  {
    id: "selected_prompt_5",
    content: "耐腐蚀，绝缘性好，应用于深海探测设备",
    subtitle: "耐腐蚀，绝缘性好",
  },
  {
    id: "selected_prompt_6",
    content: "超快响应时间，高灵敏度，用于量子计算芯片",
    subtitle: "超快响应时间，高灵敏度",
  },
]);

const searchFormData = ref<SearchFormData>({
  value: "",
});
const handleSearch = (result: SearchResult) => {
  resultData.value = result;
  console.log(result);

  search.value?.saveToStorage(result);
};
const handleSearchInit = (useSearch: UseSaerch<SearchResult>) => {
  search.value = useSearch;
  search.value.loadFromStorage();
  resultData.value = search.value.resultData;
};

const handleClickPrompt = (prompt: Prompt) => {
  searchFormData.value = {
    value: prompt.content,
  };
};
</script>
<style scoped></style>
