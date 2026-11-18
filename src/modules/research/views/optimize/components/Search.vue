<template>
  <BaseSearch
    v-model:modelValue="searchFormData.value"
    placeholder="例如：100nm光栅，深径比50:1"
    button-text="开启工艺优化"
    :align="'center'"
    :is-loading="isLoading"
    :show-cancel="isLoading"
    @search="startSearch"
    @cancel="cancelSearch"
  >
    <template #title>
      <div class="w-full">
        <h1 style="color: #00bcd4" class="text-4xl">模芯结构输入</h1>
      </div>
    </template>
    <template #additional-options>
      <a-checkbox v-model:checked="searchFormData.isHistorical"
        ><span class="text-lg">参考历史数据</span></a-checkbox
      >
      <section style="width: 100%">
        <SelectedPrompt @click:prompt="handleClickPrompt" :prompts="prompts" />
      </section>
    </template>
  </BaseSearch>
</template>
<script setup lang="ts">
import { opitmizeSearch } from "@/modules/research/api/optimize/Search";
import type {
  SearchFormData,
  SearchResult,
} from "@/modules/research/types/optimize/Search";
import { onMounted, onUnmounted, ref } from "vue";
import BaseSearch from "../../BaseSearch.vue";
import { useSearch } from "@/modules/research/api/useSearch";
import SelectedPrompt from "../../SelectedPrompt.vue";
import type { Prompt } from "@/modules/research/types/Prompt";

const emit = defineEmits<{
  "search:result": [result: SearchResult];
  "search:init": [useSearch: any];
}>();
const searchFormData = ref<SearchFormData>({
  value: "",
  isHistorical: true,
});
const handleClickPrompt = (prompt: Prompt) => {
  searchFormData.value.value = prompt.content;
};
const search = useSearch<SearchResult>({
  searchFunction: opitmizeSearch,
  storageKey: "optimize_result",
});
const { isLoading, executeSearch, cancelSearch, cleanup } = search;
const prompts = ref<Prompt[]>([
  {
    id: "selected_prompt_1",
    content: "亚波长纳米光栅结构，周期300nm，槽深150nm，用于AR衍射波导",
    subtitle: "纳米级光栅，高精度复制",
  },
  {
    id: "selected_prompt_2",
    content: "高深径比微针阵列，针体高度600μm，尖端直径<10μm，用于透皮给药",
    subtitle: "高深径比，尖端成型",
  },
  {
    id: "selected_prompt_3",
    content: "非球面微透镜阵列，透镜曲率半径2mm，表面粗糙度Ra<5nm",
    subtitle: "光学级表面，面型精度",
  },
  {
    id: "selected_prompt_4",
    content: "复杂微流控芯片流道，包含微混合器结构，通道宽度50μm",
    subtitle: "复杂拓扑，低残余应力",
  },
  {
    id: "selected_prompt_5",
    content: "仿生超疏水表面，微纳米分级结构，微柱阵列深径比5:1",
    subtitle: "双级结构，脱模优化",
  },
  {
    id: "selected_prompt_6",
    content: "菲涅尔透镜结构，锯齿槽深20μm，要求齿尖锐利度<0.5μm",
    subtitle: "锐利边缘，高填充率",
  },
]);

async function startSearch() {
  const result = await executeSearch(searchFormData.value);
  if (result) {
    console.log(result);

    emit("search:result", result);
  }
}

onMounted(() => {
  emit("search:init", search);
});

onUnmounted(() => {
  cleanup();
});
</script>
<style scoped></style>
