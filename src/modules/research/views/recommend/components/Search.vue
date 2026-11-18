<template>
  <BaseSearch
    v-model:modelValue="searchFormData.value"
    placeholder="例如：纳米级微流控芯片模芯，需100nm通道、耐生物腐蚀"
    button-text="开始智能推荐"
    :align="'center'"
    :is-loading="isLoading"
    :show-cancel="isLoading"
    @search="startSearch"
    @cancel="cancelSearch"
  >
    <template #title>
      <div class="title-section">
        <h1 class="text-4xl text-center">模芯需求描述</h1>
        <p style="color: #00bcd4" class="text-lg text-center">
          请输入您的模芯应用场景和性能需求
        </p>
      </div>
    </template>
  </BaseSearch>
</template>

<script setup lang="ts">
import { recommendSearch } from "@/modules/research/api/recommend/Search";
import { useSearch } from "@/modules/research/api/useSearch";
import type {
  SearchFormData,
  SearchResult,
} from "@/modules/research/types/recommend/Search";
import { message } from "ant-design-vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import BaseSearch from "../../BaseSearch.vue";

const search = useSearch<SearchResult>({
  searchFunction: recommendSearch,
  storageKey: "recommend_result",
  validateFunction: (data) => {
    if (!data.value) {
      message.error("请输入模芯需求描述！");
      return false;
    }
    return true;
  },
});
const { isLoading, executeSearch, cancelSearch, cleanup } = search;
const props = defineProps<{
  searchFormData?: SearchFormData;
}>();
const emit = defineEmits<{
  "search:result": [result: SearchResult];
  "search:init": [data: any];
}>();

const searchFormData = ref<SearchFormData>({
  value: "",
});

const startSearch = async () => {
  const result = await executeSearch(searchFormData.value);
  if (result) {
    emit("search:result", result);
  }
};

watch(
  () => props.searchFormData,
  (newVal: SearchFormData) => {
    searchFormData.value = newVal;
    console.log(searchFormData.value.value);
    
  },
  {
    deep: true,
  }
);

onMounted(() => {
  emit("search:init", search);
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped></style>
