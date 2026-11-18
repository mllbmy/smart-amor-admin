<template>
  <a-flex :vertical="true" gap="large" :align="align">
    <slot name="title"></slot>

    <a-textarea
      :rows="6"
      :placeholder="placeholder"
      class="search-textarea tech-border"
      v-model:value="localValue"
      @keydown="handleKeydown"
    />

    <slot name="additional-options"></slot>

    <a-flex gap="small">
      <a-button
        v-if="showCancel"
        @click="handleCancel"
        class="cancel-button"
        type="default"
      >
        <span class="button-text">取消搜索</span>
      </a-button>

      <a-button
        @click="handleSearch"
        :loading="isLoading"
        class="search-button"
        type="primary"
      >
        <span class="button-text">{{ buttonText }}</span>
      </a-button>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts" generic="T">
import { handleTextAreaKeydown } from "@/utils/tools";
import { computed } from "vue";

interface Props {
  modelValue: string;
  placeholder?: string;
  buttonText?: string;
  align?: "start" | "end" | "center" | "stretch";
  isLoading?: boolean;
  showCancel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入内容",
  buttonText: "搜索",
  align: "stretch",
  isLoading: false,
  showCancel: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  search: [];
  cancel: [];
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleKeydown = (event: KeyboardEvent) => {
  handleTextAreaKeydown(event, {
    value: { value: localValue.value },
    onEnter: () => emit("search"),
  });
};

const handleSearch = () => {
  emit("search");
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<style scoped>
.search-textarea {
  resize: none;
  font-size: 18px;
}

.search-button,
.cancel-button {
  width: 100%;
  height: 5vh;
  flex: 1;
}

.button-text {
  font-size: 1.25rem;
}

:deep(.search-button) {
  width: 100%;
}
</style>