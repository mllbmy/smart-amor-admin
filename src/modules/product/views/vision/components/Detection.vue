<template>
  <a-card style="height: 100%">
    <template #title>
      <h2 class="text-3xl text-[#00bcd4]">实时监测可视化区</h2>
    </template>
    <canvas style="width: 100%; background-color: #e0e0e0; border-radius: 10px" id="videoCanvas"
      ref="videoCanvas"></canvas>
    <video :src="ASSET_BASE + 'mold_core.mp4'" autoplay loop muted style="display: none" id="videoSource"
      ref="videoSource"></video>
    <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding-top: 20px;
      ">
      <a-button size="large" @click="onStart">开始检测</a-button>
      <a-button class="pasue" size="large" @click="onPause">暂停检测</a-button>
      <a-button class="restart" size="large" @click="onRestart">重新拍摄</a-button>
    </div>
  </a-card>
</template>
<script setup lang="ts">
const ASSET_BASE = import.meta.env.BASE_URL;
import { debounce, formatDateTime, loadLocationData } from "@/utils/tools";
import { makeDemoMarkers, makeVisionSummary } from "../demoVisionData";
import type { DetectionResultData } from "@/modules/product/types/DetectionResult";
import { message } from "ant-design-vue";
import { onMounted, ref, watch } from "vue";

const videoCanvas = ref<HTMLCanvasElement>();
const videoSource = ref<HTMLVideoElement>();
export type Marker = {
  key: number;
  x: number;
  y: number;
  radius: number;
  custom?: boolean;
};

const markers = ref<Marker[]>([]);
const markersStyle = ref<{
  radius: number;
  custom: boolean;
}>({
  radius: 60,
  custom: true
})
const animationFrame = ref<number | null>(null);
// 修改: 添加locateMarker用于存储需要定位的标记
const locateMarker = ref<Marker | null>(null);
const locateTimeout = ref<number | null>(null);
const emits = defineEmits([
  "search:result",
  "markers:update",
  "markers:delete",
  "reset",
]);
// 修改: 监听来自Report.vue的定位事件
const props = defineProps<{
  locateDefect?: ReportData;
  deleteMarkerKey?: number;
}>();

const isPuaused = ref(false);
const isSearching = ref(false);
async function onStart() {
  const canvas = videoCanvas.value;
  if (!canvas) return;
  if (isPuaused.value) return message.warn("已经暂停，请先重新开始");
  if (isSearching.value) return message.warn("正在检测中，请勿重复点击");

  message.loading({
    content: "正在检测...",
    key: "searchLoading",
    duration: 0,
  });

  // 检测摘要采用视觉质检口径，并带上本次检测的缺陷数量
  const summary = makeVisionSummary(markers.value.length + 1);
  const results: DetectionResultData = {
    date: formatDateTime(new Date()),
    columns: summary.columns as DetectionResultData["columns"],
  };
  message.destroy("searchLoading");
  message.success("检测完成!");
  emits("search:result", results);
  const marker = {
    key: markers.value.length + 1,
    x: canvas.width / 2 - 300,
    y: canvas.height / 2 + 230,
    radius: 60,
  };
  markers.value.push(marker);
  emits("markers:update", marker);

  isSearching.value = false;
}
function onPause() {
  if (animationFrame.value) {
    isPuaused.value = true;
    cancelAnimationFrame(animationFrame.value);
    animationFrame.value = null;
  }
}

function onRestart() {
  markers.value = [];

  if (videoSource.value) {
    videoSource.value.currentTime = 0;
    videoSource.value.play();
  }
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
  isPuaused.value = false;
  startDrawing();
  emits("reset");
}

// 修改: 添加绘制定位标记的函数
function drawLocateMarker(
  ctx: CanvasRenderingContext2D,
  marker: Marker,
  time: number
) {
  // 绘制闪烁的外圈
  const pulse = Math.sin(time * 0.01) * 0.3 + 1.0;
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, marker.radius * pulse, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(0, 255, 0, ${0.7 + Math.sin(time * 0.01) * 0.3})`;
  ctx.lineWidth = 3;
  ctx.stroke();

  // 绘制内圈
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, marker.radius * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
  ctx.fill();

  // 绘制中心点
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#00ff00";
  ctx.fill();
}

function drawModernMarker(
  ctx: CanvasRenderingContext2D,
  marker: { x: number; y: number; radius: number },
  time: number
) {
  // 计算动画参数
  const pulse = Math.sin(time * 0.005) * 0.2 + 0.8;
  const opacity = Math.abs(Math.sin(time * 0.003)) * 0.5 + 0.5;

  // 绘制外圈 - 脉动效果（改为红色）
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, marker.radius * pulse, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 50, 50, ${opacity})`; // 改为红色
  ctx.lineWidth = 4;
  ctx.stroke();

  // 绘制内圈 - 固定大小（改为红色）
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, marker.radius * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 50, 50, 0.7)"; // 改为红色
  ctx.fill();

  // 绘制中心点（保持白色）
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  // 绘制十字线（保持白色）
  ctx.beginPath();
  ctx.moveTo(marker.x - marker.radius * 0.7, marker.y);
  ctx.lineTo(marker.x + marker.radius * 0.7, marker.y);
  ctx.moveTo(marker.x, marker.y - marker.radius * 0.7);
  ctx.lineTo(marker.x, marker.y + marker.radius * 0.7);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 绘制外圈发光效果（改为红色）
  const gradient = ctx.createRadialGradient(
    marker.x,
    marker.y,
    marker.radius * 0.8,
    marker.x,
    marker.y,
    marker.radius * 1.2
  );
  gradient.addColorStop(0, "rgba(255, 50, 50, 0.3)"); // 改为红色
  gradient.addColorStop(1, "rgba(255, 50, 50, 0)"); // 改为红色

  ctx.beginPath();
  ctx.arc(marker.x, marker.y, marker.radius * 1.2, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawMarkers(ctx: CanvasRenderingContext2D, time: number) {
  markers.value.forEach((marker) => {
    drawModernMarker(ctx, marker, time);
  });

  // 修改: 绘制定位标记
  if (locateMarker.value) {
    drawLocateMarker(ctx, locateMarker.value, time);
  }
}

function startDrawing() {
  const canvas = videoCanvas.value;
  const video = videoSource.value;
  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let startTime = performance.now();

  function drawVideo(time: number) {
    if (video.paused || video.ended) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 使用相对时间实现动画效果
    const elapsedTime = time - startTime;
    drawMarkers(ctx, elapsedTime);

    animationFrame.value = requestAnimationFrame(drawVideo);
  }

  animationFrame.value = requestAnimationFrame(drawVideo);
}

// 修改: 添加处理定位缺陷的函数
function handleLocateDefect(defect: ReportData) {
  // 清除之前的定时器
  if (locateTimeout.value) {
    clearTimeout(locateTimeout.value);
  }

  // 设置需要定位的标记
  const marker = markers.value.find((m) => m.key === defect.key);
  if (marker) {
    locateMarker.value = marker;

    // 3秒后清除定位标记
    locateTimeout.value = window.setTimeout(() => {
      locateMarker.value = null;
    }, 3000);

    message.success(
      `已定位缺陷 #${defect.key} (${Math.round(marker.x)}, ${Math.round(
        marker.y
      )})`
    );
  } else {
    message.error("未找到对应的标记点");
  }
}

onMounted(() => {
  const canvas = videoCanvas.value;
  const video = videoSource.value;
  if (!canvas || !video) return;
  function resizeCanvas() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  video.addEventListener("loadedmetadata", () => {
    resizeCanvas();
    // 画布尺寸就绪后，若无标记点则用演示缺陷填充，保证画面有内容
    if (!markers.value.length) {
      markers.value = makeDemoMarkers(canvas.width, canvas.height);
    }
    video.play();
    startDrawing();
  });

  window.addEventListener("resize", resizeCanvas);
  // 添加点击添加标记点功能
  const handleClick = debounce((event: MouseEvent) => {
    if (isPuaused.value) return message.warn("已经暂停，请先重新开始");
    const rect = canvas.getBoundingClientRect();

    // 计算缩放比例
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // 计算实际画布坐标
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // 检查是否点击在现有标记点上（用于删除）
    if (event.shiftKey) {
      // Shift+点击删除标记点
      for (let i = markers.value.length - 1; i >= 0; i--) {
        const marker = markers.value[i];
        const dx = marker.x - x;
        const dy = marker.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < marker.radius) {
          markers.value.splice(i, 1);
          emits("markers:delete", marker?.key);
          message.success("标记点已删除");
          return;
        }
      }
    } else {
      // 检查是否点击在现有标记点上
      for (const marker of markers.value) {
        const dx = marker.x - x;
        const dy = marker.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < marker.radius) {
          message.info("您点击了一个标记点，按住Shift点击可删除");
          return;
        }
      }
      if (markers.value.length >= 10) {
        message.warn("最多添加10个标记点");
        return;
      }
      const marker = {
        key: markers.value.length > 0 ? Math.max(...markers.value.map(marker => marker.key)) + 1 : 1,
        x: x,
        y: y,
        radius: 60,
        custom: true,
      };

      // 添加新标记点
      markers.value.push(marker);
      emits("markers:update", marker);

      message.success(`添加标记点 (${Math.round(x)}, ${Math.round(y)})`);
    }
  }, 100); // 300ms 防抖延迟

  canvas.addEventListener("click", handleClick as EventListener);

});
const visonReportDataSource = ref<any>()


// 修改: 监听定位缺陷属性变化
watch(
  () => props.locateDefect,
  (newDefect) => {
    if (newDefect) {
      handleLocateDefect(newDefect);
    }
  }
);
watch(
  () => props.deleteMarkerKey,
  (val) => {
    if (val) {
      markers.value = markers.value.filter((m) => m.key !== val);
      message.success("标记点已删除");
    }
  }
);
onMounted(() => {
  const hasCache = loadLocationData("detectionMarkers_v2", markers);
  watch(markers, (newMarkers) => {
    localStorage.setItem("detectionMarkers_v2", JSON.stringify(newMarkers))
  }, {
    deep: true,
  });
  // 首次进入（无历史缓存）时预置演示标记点；画布尺寸就绪后还有一次兜底填充
  if (!hasCache || !markers.value?.length) {
    markers.value = makeDemoMarkers();
  }
});
</script>
<style scoped>
.pasue {
  color: #fbbc05;
  border-color: #fbbc05;
}

.pasue:hover {
  color: #b88d0a;
  border-color: #b88d0a;
}

.restart {
  color: #ea4335;
  border-color: #ea4335;
}

.restart:hover {
  color: #b53226;
  border-color: #b53226;
}
</style>
