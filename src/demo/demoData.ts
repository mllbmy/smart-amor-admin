/**
 * 演示数据（GitHub Pages 静态站点使用）
 *
 * 说明：本文件数据用于公开演示站点，全部为构造的示例值，
 * 不代表任何真实检测结果、材料实测数据或工艺结论。
 * 与 mock_backend/mock_server.py 使用同一套示例数据，便于本地与线上表现一致。
 */

export interface DemoBaseType {
  id: number;
  value: string;
  label: string;
  description: string;
  density: number;
  thermalConductivity: number;
  color: string;
}

export const BASE_TYPES: DemoBaseType[] = [
  { id: 1, value: "Zr", label: "锆基", description: "非晶形成能力最强的体系之一，过冷液相区宽", density: 6.7, thermalConductivity: 9.0, color: "#00bcd4" },
  { id: 2, value: "Fe", label: "铁基", description: "软磁与耐磨应用为主", density: 7.4, thermalConductivity: 10.0, color: "#81c784" },
  { id: 3, value: "Cu", label: "铜基", description: "强度高、成本低，适合结构件", density: 8.9, thermalConductivity: 20.0, color: "#4dd0e1" },
  { id: 4, value: "Mg", label: "镁基", description: "密度最低的一类非晶合金", density: 2.0, thermalConductivity: 30.0, color: "#ffb74d" },
  { id: 5, value: "Pd", label: "钯基", description: "贵金属体系，研究用", density: 10.5, thermalConductivity: 8.0, color: "#9575cd" },
];

type RawMaterial = [string, number, string, Record<string, string>, number, number, number];

// 基体 id 需与前端 utils/tools.ts:getBaseTypeById 对齐：1锆 2铁 3铜 4镁 5钯
const RAW_MATERIALS: RawMaterial[] = [
  ["Zr55Cu30Al10Ni5", 1, "Zr55Cu30Al10Ni5", { Zr: "55", Cu: "30", Al: "10", Ni: "5" }, 1900, 540, 3.2],
  ["Vit1", 1, "Zr41.2Ti13.8Cu12.5Ni10Be22.5", { Zr: "41.2", Ti: "13.8", Cu: "12.5", Ni: "10", Be: "22.5" }, 1900, 530, 2.8],
  ["Zr65Cu15Al10Ni10", 1, "Zr65Cu15Al10Ni10", { Zr: "65", Cu: "15", Al: "10", Ni: "10" }, 1750, 500, 3.0],
  ["Zr52.5Cu17.9Ni14.6Al10Ti5", 1, "Zr52.5Cu17.9Ni14.6Al10Ti5", { Zr: "52.5", Cu: "17.9", Ni: "14.6", Al: "10", Ti: "5" }, 1850, 520, 3.1],
  ["Fe80Si9B11", 2, "Fe80Si9B11", { Fe: "80", Si: "9", B: "11" }, 3000, 780, 4.5],
  ["FINEMET", 2, "Fe73.5Si13.5B9Cu1Nb3", { Fe: "73.5", Si: "13.5", B: "9", Cu: "1", Nb: "3" }, 2800, 720, 4.0],
  ["Fe78Si9B13", 2, "Fe78Si9B13", { Fe: "78", Si: "9", B: "13" }, 2900, 760, 4.3],
  ["Cu47Zr11Ti34Ni8", 3, "Cu47Zr11Ti34Ni8", { Cu: "47", Zr: "11", Ti: "34", Ni: "8" }, 2100, 610, 2.4],
  ["Cu50Zr50", 3, "Cu50Zr50", { Cu: "50", Zr: "50" }, 2000, 590, 2.2],
  ["Cu60Zr30Ti10", 3, "Cu60Zr30Ti10", { Cu: "60", Zr: "30", Ti: "10" }, 2050, 600, 2.1],
  ["Cu46Zr42Al7Y5", 3, "Cu46Zr42Al7Y5", { Cu: "46", Zr: "42", Al: "7", Y: "5" }, 1980, 575, 2.6],
  ["Mg65Cu25Gd10", 4, "Mg65Cu25Gd10", { Mg: "65", Cu: "25", Gd: "10" }, 780, 240, 1.6],
  ["Mg65Cu25Y10", 4, "Mg65Cu25Y10", { Mg: "65", Cu: "25", Y: "10" }, 760, 235, 1.5],
  ["Mg70Zn25Ca5", 4, "Mg70Zn25Ca5", { Mg: "70", Zn: "25", Ca: "5" }, 720, 220, 1.4],
  ["Pd40Ni40P20", 5, "Pd40Ni40P20", { Pd: "40", Ni: "40", P: "20" }, 1700, 480, 3.4],
  ["Pd40Cu30Ni10P20", 5, "Pd40Cu30Ni10P20", { Pd: "40", Cu: "30", Ni: "10", P: "20" }, 1750, 495, 3.6],
];

export const MATERIALS = RAW_MATERIALS.map((m, index) => {
  const [name, baseTypeId, formula, composition, strength, hardness, corrosion] = m;
  return {
    id: `M${String(index + 1).padStart(3, "0")}`,
    name,
    version: `v${1 + (index % 3)}.${index % 5}`,
    base_type_id: baseTypeId,
    base_type: BASE_TYPES[baseTypeId - 1].label,
    formula,
    composition,
    properties: { strength, hardness, corrosion_resistance: corrosion },
    hasCompareButton: true,
  };
});

export const OPERATORS = [
  { id: "OP001", name: "陈梦娜", department: "材料研发", role: "工艺工程师" },
  { id: "OP002", name: "游丽莎", department: "装备制造", role: "设备工程师" },
  { id: "OP003", name: "黄泽濠", department: "算法软件", role: "算法工程师" },
  { id: "OP004", name: "李明轩", department: "质量控制", role: "质检员" },
  { id: "OP005", name: "周晓彤", department: "生产调度", role: "调度员" },
];

export const EQUIPMENTS = [
  { id: "EQ01", name: "TM-YJ-01", type: "非晶合金微纳成型装备", status: "运行中", location: "一号车间" },
  { id: "EQ02", name: "TM-YJ-02", type: "非晶合金微纳成型装备", status: "运行中", location: "一号车间" },
  { id: "EQ03", name: "TM-YJ-03", type: "实验室级成型装备", status: "待机", location: "实验室" },
  { id: "EQ04", name: "TM-JC-01", type: "AI视觉检测单元", status: "运行中", location: "二号车间" },
  { id: "EQ05", name: "TM-JC-02", type: "AI视觉检测单元", status: "维护中", location: "二号车间" },
  { id: "EQ06", name: "TM-LC-01", type: "热力耦合成型单元", status: "运行中", location: "一号车间" },
];

const BATCH_STATUS = ["已完成", "生产中", "待排产", "质检中"];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function makeBatches() {
  const list = [];
  const base = new Date(2026, 10, 1, 8, 0, 0);
  for (let i = 1; i <= 18; i++) {
    const d = new Date(base.getTime());
    d.setDate(d.getDate() + Math.floor((i - 1) / 2));
    d.setHours(8 + (i % 2) * 8);
    const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const mat = MATERIALS[i % MATERIALS.length];
    const eq = EQUIPMENTS[i % EQUIPMENTS.length];
    const op = OPERATORS[i % OPERATORS.length];
    const end = new Date(d.getTime() + 6 * 3600 * 1000);
    list.push({
      id: `B${String(i).padStart(3, "0")}`,
      batchNo: `TM${ymd}-${String(i).padStart(3, "0")}`,
      productName: `非晶合金微纳模芯-${pad((i % 6) + 1)}型`,
      materialId: mat.id,
      materialName: mat.name,
      equipmentId: eq.id,
      equipmentName: eq.name,
      operatorId: op.id,
      operatorName: op.name,
      status: BATCH_STATUS[i % BATCH_STATUS.length],
      progress: [100, 65, 0, 85][i % 4],
      quantity: 20 + i * 3,
      startTime: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:00:00`,
      endTime: i % 4 === 0 ? `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())} ${pad(end.getHours())}:00:00` : null,
      qualityRate: Number((0.93 + (i % 7) * 0.01).toFixed(3)),
    });
  }
  return list;
}

export const BATCHES = makeBatches();

function ok(data: unknown, extra: Record<string, unknown> = {}) {
  return { code: 200, success: true, message: "ok", data, ...extra };
}

function pageBody(items: unknown[], pageNo: number, size: number) {
  const start = Math.max(0, (pageNo - 1) * size);
  const chunk = items.slice(start, start + size);
  return {
    code: 200,
    success: true,
    message: "ok",
    data: { records: chunk, list: chunk, total: items.length, page: pageNo, size },
    records: chunk,
    list: chunk,
    total: items.length,
    page: pageNo,
    size,
  };
}

function aiRecommend(text: string) {
  const t = text || "";
  let pick = MATERIALS[0];
  if (t.includes("耐蚀") || t.includes("腐蚀")) {
    pick = MATERIALS.reduce((a, b) => (b.properties.corrosion_resistance > a.properties.corrosion_resistance ? b : a));
  }
  if (t.includes("强度") || t.includes("承载")) {
    pick = MATERIALS.reduce((a, b) => (b.properties.strength > a.properties.strength ? b : a));
  }
  if (t.includes("轻") || t.includes("密度")) {
    pick = MATERIALS.reduce((a, b) => {
      const da = BASE_TYPES[a.base_type_id - 1].density;
      const db = BASE_TYPES[b.base_type_id - 1].density;
      return db < da ? b : a;
    });
  }
  const p = pick.properties;
  return {
    recommendedResultName: `${pick.name}（${pick.base_type}）`,
    suggestion: `针对「${t.slice(0, 28)}」的需求，推荐 ${pick.formula}。该体系强度 ${p.strength} MPa、硬度 ${p.hardness} HV、耐蚀倍率 ${p.corrosion_resistance}，建议先以 30～50 组小样本做迁移校准后再进入试制。`,
    details: [
      { property: "成分体系", value: pick.formula, reference: `材料数据库 ${pick.id}`, hightlight: true },
      { property: "抗拉强度", value: `${p.strength} MPa`, reference: "数据库记录（演示值）", hightlight: false },
      { property: "维氏硬度", value: `${p.hardness} HV`, reference: "数据库记录（演示值）", hightlight: false },
      { property: "耐腐蚀性", value: `${p.corrosion_resistance} 倍`, reference: "数据库记录（演示值）", hightlight: false },
      { property: "成型工艺窗口", value: "过冷液相区 ΔTx ≥ 60 K", reference: "体系经验值（演示）", hightlight: false },
    ],
  };
}

function aiOptimize(text: string) {
  const t = text || "";
  return {
    arguments: [
      { property: "成型温度", value: "723", unit: "K" },
      { property: "保温时间", value: "180", unit: "s" },
      { property: "加压压力", value: "12", unit: "MPa" },
      { property: "冷却速率", value: "80", unit: "K/s" },
      { property: "真空度", value: "0.5", unit: "Pa" },
    ],
    predict: [
      { property: "成型良率", value: "97.2 %", check: true },
      { property: "尺寸偏差", value: "±0.8 μm", check: true },
      { property: "表面粗糙度 Ra", value: "12 nm", check: true },
      { property: "晶化率", value: "< 0.5 %", check: true },
      { property: "废品率", value: "2.6 %", check: true },
    ],
    suggestion: `针对「${t.slice(0, 28)}」，在现有工艺窗口内建议优先调整保温时间与冷却速率。上述参数为演示数据，实际投产前需以小批量试制结果校准。`,
  };
}

export function resolveDemo(url: string, method: string, body: any, params: any) {
  const path = url.replace(/^https?:\/\/[^/]+/, "").replace(/^\/api/, "");
  const pageNo = Number(params?.startPage || params?.page || 1) || 1;
  const size = Number(params?.size || 12) || 12;
  const m = (method || "get").toLowerCase();

  if (path === "/base_types/list") {
    return ok(BASE_TYPES, { records: BASE_TYPES, list: BASE_TYPES, total: BASE_TYPES.length });
  }
  if (path === "/amorphous_alloys/list") {
    return pageBody(MATERIALS, pageNo, size);
  }
  if (path === "/amorphous_alloys/filter" && m === "post") {
    const h = body?.hardness || {};
    const s = body?.strength || {};
    const corr = body?.corrosionResistance;
    const bt = body?.baseTypeId;
    let rows = MATERIALS.slice();
    if (bt) rows = rows.filter((x) => String(x.base_type_id) === String(bt));
    if (h.min != null) rows = rows.filter((x) => x.properties.hardness >= h.min);
    if (h.max != null) rows = rows.filter((x) => x.properties.hardness <= h.max);
    if (s.min != null) rows = rows.filter((x) => x.properties.strength >= s.min);
    if (s.max != null) rows = rows.filter((x) => x.properties.strength <= s.max);
    if (corr != null) rows = rows.filter((x) => x.properties.corrosion_resistance >= corr);
    return ok(rows, { records: rows, list: rows, total: rows.length });
  }
  if (path === "/equipment/list") {
    return ok(EQUIPMENTS, { records: EQUIPMENTS, list: EQUIPMENTS, total: EQUIPMENTS.length });
  }
  if (path === "/operator/list") {
    return ok(OPERATORS, { records: OPERATORS, list: OPERATORS, total: OPERATORS.length });
  }
  if (path === "/operator/list/page") {
    return pageBody(OPERATORS, pageNo, size);
  }
  if (path.startsWith("/operator/")) {
    const id = path.split("/").pop();
    return ok(OPERATORS.find((o) => o.id === id) || OPERATORS[0]);
  }
  if (path === "/production_batches/list") {
    return ok(BATCHES, { records: BATCHES, list: BATCHES, total: BATCHES.length });
  }
  if (path === "/production_batches/list/page") {
    return pageBody(BATCHES, pageNo, size);
  }
  if (path.startsWith("/production_batches/batchNo/")) {
    const no = decodeURIComponent(path.split("/batchNo/").pop() || "");
    return ok(BATCHES.find((b) => b.batchNo === no) || BATCHES[0]);
  }
  if (path === "/ai/recommend") {
    return ok(JSON.stringify(aiRecommend(body?.message || "")));
  }
  if (path === "/ai/optimize") {
    return ok(JSON.stringify(aiOptimize(body?.message || "")));
  }
  if (path === "/login") {
    return ok({ token: "demo-token", user: { id: "U001", name: "演示账号" } });
  }
  return { code: 404, success: false, message: `no such endpoint: ${path}`, data: null };
}