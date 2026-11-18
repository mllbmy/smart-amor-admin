<template>
  <div class="flex items-center gap-2.5 mb-6">
    <i
      class="flex items-center justify-center w-9 h-9 bg-[#124154] rounded-full text-[#00bcd4]"
    >
      <DatabaseOutlined class="text-2xl" />
    </i>
    <h1 class="text-[#00bcd4] text-4xl">材料数据库</h1>
  </div>
  <a-row :gutter="[20, 24]" v-if="database_data?.length">
    <a-col :xl="6" :md="8" v-for="item in database_data" :key="item.id">
      <a-card
        class="database_card"
        :headStyle="{
          backgroundColor: '#18345b',
        }"
        :class="item.hasCompareButton ? '' : 'card_active'"
      >
        <template #title>
          <div class="py-4">
            <p class="text-white m-0 text-2xl">
              {{ item.id }}
            </p>
            <div
              class="flex items-center gap-2.5 text-lg text-[#00bcd4] font-normal"
            >
              <span>{{ item.name }}</span>
              <div class="w-0.5 h-2.5 bg-[#00bcd4]"></div>
              <span>{{ item.version }}</span>
            </div>
          </div>
        </template>

        <div class="p-0">
          <div
            class="flex items-center gap-2.5 justify-between border-b border-[#124154] py-2.5 text-base"
          >
            <span class="text-[#557081] min-w-[30%]">化学式</span>
            <p class="overflow-hidden text-ellipsis whitespace-nowrap m-0">
              {{ item.formula }}
            </p>
          </div>
          <div
            class="flex items-center gap-2.5 justify-between border-b border-[#124154] py-2.5 text-base"
            v-for="(property, key) in item.properties"
            :key="key"
          >
            <span class="text-[#557081] min-w-[30%]">
              {{ getDataKeyName(key) }}
            </span>
            <p
              class="overflow-hidden text-ellipsis whitespace-nowrap m-0"
              :style="{ color: getPropertyColor(key) }"
            >
              {{
                (() => {
                  switch (key) {
                    case "strength":
                      return property + "MPa";
                    case "hardness":
                      return property + "HV";
                    case "composition" as keyof MaterialProperty:
                      return convertComposition(
                        item.composition as { key: string; value: string }
                      );
                    case "corrosion_resistance":
                      return typeof property === "number" && property !== null
                        ? `常规${getBaseTypeById(
                            Number(item.base_type)
                          )}基的${property}倍`
                        : property;
                    default:
                      return property;
                  }
                })()
              }}
            </p>
          </div>
        </div>

        <template #actions>
          <div class="flex justify-between items-center p-4">
            <p class="m-0 text-white text-base">ID:{{ item.id }}</p>
            <a-button
              size="medium"
              :class="
                item.hasCompareButton
                  ? 'text-[#00bcd4] border-[#00bcd4]'
                  : 'text-[#ff9804] border-[#ff9804]'
              "
              @click="addComparison(item)"
              :disabled="comparison_data.length >= 2 && item.hasCompareButton"
            >
              <i></i>
              {{ item.hasCompareButton ? "加入对比" : "移除对比" }}
            </a-button>
          </div>
        </template>
      </a-card>
    </a-col>
  </a-row>
  <div v-else class="flex items-center justify-center">
    <h1 class="text-4xl">暂无数据</h1>
  </div>
  <a-button
    size="large"
    style="display: block; width: 30%; margin: 24px auto"
    @click="getMore"
    v-if="
      database_data &&
      databaseDataAll &&
      !(database_data.length >= databaseDataAll.length)
    "
    >加载更多</a-button
  >
</template>
<script setup lang="ts">
import { DatabaseOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, watch } from "vue";
import type {
  MaterialData,
  MaterialProperty,
} from "@/modules/research/types/home/MaterialDataBase";
import { getDataKeyName, getPropertyColor } from "@/utils/database";
import {
  getListByPage,
  searchMaterials,
} from "@/modules/research/api/home/Search";
import { message } from "ant-design-vue";
import { getBaseTypeById, parseResToMaterialResData } from "@/utils/tools";
const emits = defineEmits(["addComparison", "init:database_data"]);
const props = defineProps<{
  search_data: MaterialData[];
  cancelComparison: any[];
}>();

const database_data = ref<MaterialData[]>();
const comparison_data = ref<MaterialData[]>([]);
const endDataIndex = ref(0);
const databaseDataAll = ref<MaterialData[]>();
const size = 12;

const addComparison = (item: MaterialData) => {
  if (comparison_data.value.some((i: { id: string }) => i.id === item.id)) {
    comparison_data.value = comparison_data.value.filter(
      (i: { id: string }) => i.id !== item.id
    );
  } else {
    comparison_data.value.push(item);
  }
  item.hasCompareButton = !item.hasCompareButton;
  emits("addComparison", comparison_data.value);
};
// 将composition转换为字符串
function convertComposition(composition: {
  key: string;
  value: string;
}): string {
  return Object.keys(composition)
    .map(
      (key: string) => `${key}${composition[key as keyof typeof composition]}`
    )
    .join(";");
}
async function getMore() {
  if (
    !databaseDataAll.value ||
    !databaseDataAll.value.length ||
    database_data.value!.length >= databaseDataAll.value.length
  )
    return;
  database_data.value = [
    ...(database_data.value as MaterialData[]),
    ...parseResToMaterialResData(
      databaseDataAll.value.slice(
        endDataIndex.value,
        (endDataIndex.value += size)
      )
    ),
  ];
}

function resetPageValue() {
  endDataIndex.value = 0;
}

watch(
  () => props.search_data,
  (newVal) => {
    databaseDataAll.value = newVal;
    resetPageValue();
    database_data.value = parseResToMaterialResData(
      databaseDataAll.value.slice(
        endDataIndex.value,
        (endDataIndex.value += size)
      )
    );
  }
);
watch(
  () => props.cancelComparison,
  (newVal) => {
    if (!newVal.length) {
      if (!database_data.value) return;
      database_data.value = database_data.value.map((item) => {
        if (!item.hasCompareButton) item.hasCompareButton = true;
        return item;
      });
      comparison_data.value = [];
    }
  }
);
const localData = ref<MaterialData[]>([]);
onMounted(async () => {
  try {
    localData.value = JSON.parse(localStorage.getItem("database_data") || "[]");
    if (localData.value.length) {
      databaseDataAll.value = localData.value;
      database_data.value = parseResToMaterialResData(
        localData.value.slice(0, size)
      );
      emits("init:database_data", database_data.value);
      return;
    }
    message.loading({ content: "正在加载数据...", key: "dbLoading", duration: 0 });
    const res = await searchMaterials();
    message.destroy("dbLoading");
    databaseDataAll.value = res.data;
    localStorage.setItem("database_data", JSON.stringify(res.data));
    if (databaseDataAll.value && databaseDataAll.value.length > 10) {
      database_data.value = parseResToMaterialResData(
        databaseDataAll.value.slice(
          endDataIndex.value,
          (endDataIndex.value += size)
        )
      );
    } else {
      database_data.value = parseResToMaterialResData(databaseDataAll.value);
    }
    emits("init:database_data", database_data.value);
  } catch (error: any) {
    message.destroy("dbLoading");
    message.error("材料数据加载失败，请确认后端服务已启动");
  }
});
</script>
<style scoped>
.fa-search {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #124154;
  border-radius: 24px;
  text-align: center;
  color: #00bcd4;
}

.property_text {
}

.database_card {
  padding: 0;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
}

.database_card:hover,
.database_card.card_active {
  border-color: #00bcd4;
  transform: scale(1.05);
}

.database_card.card_active {
  background: rgba(6, 182, 212, 0.1);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}
</style>
