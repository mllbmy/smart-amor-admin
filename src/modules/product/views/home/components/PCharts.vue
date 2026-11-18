<template>
    <div :style="props.style" id="charts"></div>
</template>
<script setup lang="ts">
const props = defineProps<{
    style?: any
}>()
</script>
<style scoped></style>