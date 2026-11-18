import { onMounted, ref, type Ref } from "vue";

export interface CountUpItem {
  /** 目标数值（纯数字部分） */
  value: number;
  /** 数字后缀，如 "+"、"%"，可为空 */
  suffix?: string;
  /** 小数位数，默认 0 */
  decimals?: number;
}

/**
 * 数字滚动动画：进入页面时从 0 递增到目标值。
 * 使用 requestAnimationFrame + easeOutCubic，避免 setInterval 抖动。
 * 系统开启"减少动态效果"时直接显示终值。
 */
export function useCountUpList(items: CountUpItem[], duration = 900): Ref<string[]> {
  const format = (item: CountUpItem, n: number) =>
    `${n.toFixed(item.decimals ?? 0)}${item.suffix ?? ""}`;

  const displays = ref<string[]>(items.map((it) => format(it, 0)));

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    displays.value = items.map((it) => format(it, it.value));
    return displays;
  }

  onMounted(() => {
    const stagger = 90;
    items.forEach((item, index) => {
      const delay = index * stagger;
      let startTime = 0;
      const step = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime - delay;
        if (elapsed < 0) {
          requestAnimationFrame(step);
          return;
        }
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        displays.value[index] = format(item, item.value * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });

  return displays;
}