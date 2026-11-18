<template>
  <div class="w-full">
    <a-card>
      <div class="flex items-center gap-2.5 mb-6">
        <i
          class="flex items-center justify-center w-9 h-9 bg-[#124154] rounded-full text-[#00bcd4]"
        >
          <SearchOutlined class="text-2xl" />
        </i>
        <h1 class="text-[#00bcd4] text-4xl">多维度素材检索</h1>
      </div>
      <a-form
        layout="inline"
        ref="formRef"
        :model="search_form_data"
        class="lg:justify-around md:justify-between"
      >
        <a-form-item class="lg:w-1/4">
          <span class="text-[#5d7a86] text-lg block mb-1">基体类型</span>
          <a-select
            v-model:value="search_form_data.type_key"
            placeholder="全部基体类型"
            :size="inputSize"
          >
            <a-select-option
              v-for="item in data_types"
              :key="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="lg:w-1/6 md:w-1/6">
          <span class="text-[#5d7a86] text-lg block mb-1">耐腐蚀性(倍率)</span>
          <a-input-number
            v-model:value="search_form_data.resistance"
            size="large"
            :min="0"
            :max="200"
            placeholder="倍率"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item>
          <span class="text-[#5d7a86] text-lg block mb-1">强度范围(MPa)</span>
          <div class="flex items-center">
            <a-form-item name="MPa-min">
              <a-input-number
                v-model:value="search_form_data.MPa.min"
                size="large"
                :min="1000"
                :max="4000"
                placeholder="最小值"
              />
            </a-form-item>
            <a-form-item>
              <i>-</i>
            </a-form-item>
            <a-form-item name="MPa-max">
              <a-input-number
                v-model:value="search_form_data.MPa.max"
                size="large"
                :min="1000"
                :max="4000"
                placeholder="最大值"
              />
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item>
          <span class="text-[#5d7a86] text-lg block mb-1">硬度范围(HV)</span>
          <div class="flex items-center">
            <a-form-item name="HV-min">
              <a-input-number
                v-model:value="search_form_data.HV.min"
                size="large"
                :min="100"
                :max="2000"
                placeholder="最小值"
              />
            </a-form-item>
            <a-form-item>
              <i>-</i>
            </a-form-item>
            <a-form-item name="HV-max">
              <a-input-number
                v-model:value="search_form_data.HV.max"
                size="large"
                :min="100"
                :max="2000"
                placeholder="最大值"
              />
            </a-form-item>
          </div>
        </a-form-item>
      </a-form>
      <section class="flex justify-end py-2.5 gap-2.5 mt-5">
        <a-button @click="handleReset" :size="inputSize">
          <div class="flex align-middle gap-1.5 text-lg">
            <RedoOutlined />
            <span>重置条件</span>
          </div>
        </a-button>
        <a-button type="primary" @click="handleSearch" :size="inputSize">
          <div class="flex align-middle gap-1.5 text-lg">
            <SearchOutlined />
            <span>智能材料搜索</span>
          </div>
        </a-button>
      </section>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { getBastType, searchMaterials } from "@/modules/research/api/home/Search";
import type {
  SearchFormData
} from "@/modules/research/types/home/Search";
import { getBaseTypeById } from "@/utils/tools";
import {
  RedoOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

const emit = defineEmits(["search"]);
// const props = defineProps<{
//   database_data: MaterialData[];
// }>();
const isSearching = ref<boolean>(false);
const inputSize = ref<string>("large");

type DataType = {
  label: string;
  value: string;
};
// 基体类型
const data_types = ref<DataType[]>();

// const search_inputs = ref<SearchInput[]>([
//   {
//     id: 1,
//     value: "MPa",
//     label: "强度范围(MPa)",
//     type: "number",
//     placeholder: "例如 > 1500",
//   },
//   {
//     id: 2,
//     value: "HV",
//     label: "硬度范围(HV)",
//     type: "number",
//     placeholder: "例如 < 1000",
//   },
//   {
//     id: 3,
//     value: "HV",
//     label: "防腐性要求",
//     type: "number",
//     placeholder: "例如 > 常规Zr合金20倍",
//   },
// ]);

// 表单数据
const search_form_data = ref<SearchFormData>({
  type_key: "",
  MPa: {
    min: null,
    max: null,
  },
  HV: {
    min: null,
    max: null,
  },
  resistance: null,
});
const handleSearch = async () => {
  if (isSearching.value) return message.warn("正在搜索，请稍等...", 1);
  isSearching.value = true;
  try {
    message.loading({
      content: "正在搜索...",
      key: "searchLoading",
      duration: 0,
    });

    const res = await searchMaterials(search_form_data.value);
    const row = res.data;
    message.destroy("searchLoading");
    message.success("搜索成功");
    emit("search", row);
    isSearching.value = false;
  } catch (error) {
    console.error("搜索失败:", error);
    message.error("搜索失败");
    isSearching.value = false;
  }
};

const handleReset = () => {
  search_form_data.value = {
    type_key: "",
    MPa: {
      min: null,
      max: null,
    },
    HV: {
      min: null,
      max: null,
    },
    resistance: null,
  };
};

// function getDataTypes(value: MaterialData[]): DataType[] {
//   const results = value.map((val) => {
//     return {
//       label: val.base_type,
//       value: val.formula,
//     };
//   });

//   if (results.length) {
//     return results;
//   } else {
//     throw new Error("getDataTypes错误！无法生成数组。");
//   }
// }

const uniqueByLabel = (arr: any) => {
  return arr.map((item: any) => {
    return {
      value: item.id,
      label: getBaseTypeById(item.id),
    };
  });
};

onMounted(async () => {
  const base_types = await getBastType();
  data_types.value = uniqueByLabel(base_types.data);
});
</script>

<style scoped>
/* 保留原有的自定义样式 */
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
</style>
