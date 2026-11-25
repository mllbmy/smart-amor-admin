/**
 * AI 视觉质量检测工作台的演示数据。
 *
 * 说明：以下缺陷记录与标记点为构造的示例数据，用于页面打开时就有内容展示，
 *      不代表真实检测结果。键值与坐标在「缺陷摘要 / 详细报告 / 画面标记」三处共用，
 *      保证点击"定位"时能对应上。
 */

/** 演示用的画布基准尺寸（与 mold_core.mp4 视频分辨率一致） */
export const NOMINAL_CANVAS = { width: 1728, height: 856 };

export type DemoDefect = {
  key: number;
  type: string;
  level: "warning" | "danger";
  position: { x: number; y: number };
};

export const DEMO_DEFECTS: DemoDefect[] = [
  { key: 1, type: "刀纹", level: "warning", position: { x: 420, y: 300 } },
  { key: 2, type: "气孔", level: "danger", position: { x: 762, y: 424 } },
  { key: 3, type: "裂纹", level: "warning", position: { x: 1178, y: 262 } },
  { key: 4, type: "毛刺", level: "warning", position: { x: 556, y: 636 } },
  { key: 5, type: "划痕", level: "danger", position: { x: 980, y: 610 } },
  { key: 6, type: "凹陷", level: "warning", position: { x: 1348, y: 486 } },
];

/** 依据画布实际尺寸把演示缺陷换算成标记点 */
export function makeDemoMarkers(
  width: number = NOMINAL_CANVAS.width,
  height: number = NOMINAL_CANVAS.height
) {
  const w = width > 0 ? width : NOMINAL_CANVAS.width;
  const h = height > 0 ? height : NOMINAL_CANVAS.height;
  return DEMO_DEFECTS.map((d) => ({
    key: d.key,
    x: Math.round((d.position.x / NOMINAL_CANVAS.width) * w),
    y: Math.round((d.position.y / NOMINAL_CANVAS.height) * h),
    radius: 60,
  }));
}

/** 演示用的检测摘要：视觉质检口径（尺寸/表面/焊接/涂层 + 缺陷计数） */
export function makeVisionSummary(defectCount: number = DEMO_DEFECTS.length) {
  const pass = (v: string) => ({ value: v, status: "succeed" as const });
  const fail = (v: string) => ({ value: v, status: "fail" as const });

  // 尺寸精度偏差、表面粗糙度略作浮动，其余按缺陷数量判定
  const sizeErr = Number((0.4 + Math.random() * 0.4).toFixed(2)); // %
  const roughness = Number((0.006 + Math.random() * 0.01).toFixed(3)); // μm
  const weldOk = Math.random() > 0.35;
  const coatOk = Math.random() > 0.35;

  return {
    columns: [
      { title: "尺寸精度", ...(sizeErr <= 1 ? pass(`${sizeErr}%`) : fail(`${sizeErr}%`)) },
      { title: "表面粗糙度", ...(roughness <= 0.02 ? pass(`${roughness}μm`) : fail(`${roughness}μm`)) },
      { title: "焊接质量", ...(weldOk ? pass("完整") : fail("不完整")) },
      { title: "涂层厚度", ...(coatOk ? pass("均匀") : fail("不均匀")) },
      { title: "缺陷数量", ...(defectCount <= 3 ? pass(`${defectCount} 处`) : fail(`${defectCount} 处`)) },
    ],
  };
}