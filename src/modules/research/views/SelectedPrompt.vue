<template>
  <div>
    <section class="mb-10">
      <h3
        class="text-lg font-medium mb-3 text-left text-[#B3E0FF] border-b border-cyan-700 pb-2"
      >
        <span class="mr-2 text-cyan-400">#</span> 提示词精选 (点击自动填充)
      </h3>
      <div id="phraseLibrary" class="flex flex-wrap gap-3 pt-3">
        <div
          class="glow-tag px-4 py-2 rounded-full text-sm"
          v-for="prompt in props.prompts"
          @click="handlePromptsClick(prompt)"
          :key="prompt.id"
        >
          {{ prompt.subtitle }}
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Prompt } from "../types/Prompt";

const emits = defineEmits(["click:prompt"]);
const props = defineProps<{
  prompts?: Prompt[];
}>();
const handlePromptsClick = (prompt: Prompt) => {
  emits("click:prompt", prompt);
};
</script>
<style scoped>
.glow-tag {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid rgba(0, 191, 255, 0.5);
  background-color: rgba(0, 191, 255, 0.05);
  color: #e0ffff;
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.3);
}

.glow-tag:hover {
  background-color: rgba(0, 191, 255, 0.15);
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.7);
  transform: translateY(-2px);
}

.glow-tag:active {
  background-color: rgba(0, 191, 255, 0.3);
  transform: scale(0.98);
}
</style>
