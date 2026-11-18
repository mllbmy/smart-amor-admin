<template>
  <a-layout-header style="height: 150px; line-height: 1.5" class="layout-header">
    <a-flex :align="'center'" :justify="'space-between'" style="height: 100%">
      <div style="display: flex; align-items: center; gap: 16px">
        <!-- <div style="width: 48px; height: 48px; background-color: #1a73e8"></div> -->
        <img class="w-16 h-16 bg-[#1a73e8] rounded-lg" :src="ASSET_BASE + 'logo.jpg'">

        <div>
          <h1 class="text-4xl">{{ props.title }}</h1>
          <p style="color: #00bcd4;" class="text-lg" v-if="props.subTitle">
            {{ props.subTitle }}
          </p>
        </div>
      </div>

      <ProductError />
    </a-flex>
  </a-layout-header>
</template>
<script setup lang="ts">
const ASSET_BASE = import.meta.env.BASE_URL;
import ProductError from "@/modules/product/views/components/ProductError.vue";

const props = defineProps(["title", "subTitle"]);

</script>
<style scoped></style>
