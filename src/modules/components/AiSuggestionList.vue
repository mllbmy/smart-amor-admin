<template>
    <div class="home-card flex flex-col relative overflow-hidden">
        <!-- 标题栏 -->
        <div class="flex justify-between items-center mb-3">
            <h1 class="text-lg text-[#00bcd4] m-0 font-bold">AI建议</h1>
            <span
                class="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700/50 flex items-center gap-1">
                <CheckCircleIcon class="w-3 h-3" /> 分析完成
            </span>
        </div>

        <!-- 列表容器 -->
        <div class="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            <div v-for="(item, index) in suggestions" :key="index"
                class="border rounded p-3 cursor-pointer transition-colors relative" :class="item.styleClass">

                <!-- 卡片头部 -->
                <div class="flex justify-between items-start mb-1">
                    <h4 class="font-bold text-sm flex items-center gap-2" :class="item.titleColor">
                        <component :is="item.icon" class="w-4 h-4" />
                        {{ item.title }}
                    </h4>
                    <span class="text-[10px] opacity-70" :class="item.titleColor">{{ item.time }}</span>
                </div>

                <!-- 内容 -->
                <p class="text-slate-300 text-xs leading-relaxed mb-2">{{ item.content }}</p>

                <!-- 建议方案 -->
                <div v-if="item.schemeList?.length" class="p-2 bg-black/20 rounded border border-white/5">
                    <p class="text-[#00bcd4] text-xs font-semibold mb-1">AI 建议方案:</p>
                    <ul class="list-disc list-inside text-slate-400 text-xs">
                        <li v-for="(sug, sIndex) in item.schemeList" :key="sIndex">{{ sug }}</li>
                    </ul>
                </div>

                <!-- 按钮组 -->
                <div v-if="item.buttons?.length" class="flex gap-2 mt-2">
                    <button v-for="(btn, bIndex) in item.buttons" :key="bIndex"
                        class="text-xs px-2 py-1 rounded border transition-colors"
                        :class="bIndex === 0 ? 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border-blue-500/30' : 'bg-transparent hover:bg-slate-700/50 text-slate-400 border-slate-600'">
                        {{ btn }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 背景光效 -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-[#00bcd4]/10 blur-2xl rounded-full pointer-events-none"></div>
    </div>
</template>

<script setup lang="ts">
import CheckCircleIcon from './CheckCircleIcon.vue'; // 建议使用图标库，或者将 SVG 封装为组件

defineProps<{
    suggestions: any[] // 这里应定义具体的 Suggestion 接口
}>();
</script>

<style scoped>
.home-card {
    height: 100%;
    border: 1px solid #00bcd4aa;
    padding: 10px 16px;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* 仅保留必要的特定动画样式 */
:deep(.ai-alert-card) {
    animation: pulse-border 2s infinite;
}

@keyframes pulse-border {

    0%,
    100% {
        border-color: rgba(239, 68, 68, 0.3);
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.1);
    }

    50% {
        border-color: rgba(239, 68, 68, 0.8);
        box-shadow: 0 0 8px 0 rgba(239, 68, 68, 0.2);
    }
}
</style>