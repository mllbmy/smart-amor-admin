import type {
  SearchFormData,
  SearchResult,
} from "@/modules/research/types/optimize/Search";
import { http } from "@/utils/request";
import type { Prompt, PromptsResult } from "../../types/Prompt";
let recommendSearchDataText = "";
let mockResults: SearchResult;

type AiResult = {
  timestamp: number;
  success: true;
  data: string;
};
const promptsResult: PromptsResult[] = [
  {
    id: 1,
    prompt_id: "selected_prompt_1",
    resultData: {
      arguments: [
        { property: "加热阶段温度", value: "590", unit: "°C" },
        { property: "模压压力", value: "2.5", unit: "MPa" },
        { property: "冷却速率", value: "40", unit: "°C/min" },
        { property: "保压时间", value: "60", unit: "s" },
        { property: "真空度", value: "5×10⁻⁴", unit: "Pa" },
      ],
      predict: [
        { property: "槽深填充率", value: "99.2%", check: true },
        { property: "表面粗糙度", value: "Ra 2.1nm", check: true },
        { property: "周期偏差", value: "<0.5%", check: true },
        { property: "脱模缺陷率", value: "极低", check: true },
      ],
      suggestion:
        '<li>针对<span class="highlight">300nm周期光栅</span>，建议采用高温低压模压方案以保护模具精细结构</li><li>关键在于<span class="highlight">高真空环境(5×10⁻⁴Pa)</span>，防止纳米槽内空气滞留造成填充不足</li><li>冷却阶段需引入<span class="highlight">精密退火曲线</span>，防止玻璃基材产生双折射效应</li><li>建议模具表面镀<span class="highlight">DLC(类金刚石)膜层</span>以降低纳米级脱模摩擦力</li>',
    },
  },
  {
    id: 2,
    prompt_id: "selected_prompt_2",
    resultData: {
      arguments: [
        { property: "熔体温度", value: "240", unit: "°C" },
        { property: "注射压力", value: "180", unit: "MPa" },
        { property: "保压压力", value: "120", unit: "MPa" },
        { property: "模具温度", value: "135", unit: "°C" },
        { property: "排气槽深度", value: "5", unit: "μm" },
      ],
      predict: [
        { property: "针尖完整度", value: "100%", check: true },
        { property: "针高一致性", value: "±2μm", check: true },
        { property: "收缩率", value: "0.8%", check: false },
        { property: "残余应力", value: "集中于根部", check: true },
      ],
      suggestion:
        '<li>针对<span class="highlight">尖端直径<10μm</span>的特征，必须采用<span class="highlight">变模温(RHCM)工艺</span>防止冷凝堵塞</li><li>推荐设置<span class="highlight">多级注射速度</span>，在填充针尖时降低速度以避免剪切焦烧</li><li>需优化排气设计，建议在微针根部设置<span class="highlight">多孔透气钢嵌件</span>辅助排气</li><li>脱模时建议采用<span class="highlight">空气顶出辅助</span>，防止高深径比结构断裂</li>',
    },
  },
  {
    id: 3,
    prompt_id: "selected_prompt_3",
    resultData: {
      arguments: [
        { property: "模压温度", value: "585", unit: "°C" },
        { property: "成型压力", value: "500", unit: "N" },
        { property: "冷却速率", value: "5", unit: "°C/min" },
        { property: "闭模速度", value: "0.5", unit: "mm/s" },
        { property: "氮气保护", value: "99.99%", unit: "纯度" },
      ],
      predict: [
        { property: "面型精度(Pv)", value: "<0.3μm", check: true },
        { property: "表面粗糙度", value: "Ra 3.5nm", check: true },
        { property: "轴向偏差", value: "1.2μm", check: true },
        { property: "光学透过率", value: ">92%", check: true },
      ],
      suggestion:
        '<li>为满足<span class="highlight">Ra<5nm的光学表面</span>要求，模具需采用超精密单点金刚石车削加工</li><li><span class="highlight">慢速冷却(5°C/min)</span>是关键，可有效控制透镜收缩，保证面型精度(Pv值)</li><li>建议在<span class="highlight">软化点Tg+20°C</span>范围内进行等温模压，避免材料流动痕迹</li><li>必须严格控制<span class="highlight">闭模轴向对中度</span>，防止阵列透镜产生偏心像差</li>',
    },
  },
  {
    id: 4,
    prompt_id: "selected_prompt_4",
    resultData: {
      arguments: [
        { property: "压印温度", value: "155", unit: "°C" },
        { property: "压印压力", value: "40", unit: "bar" },
        { property: "保压时间", value: "180", unit: "s" },
        { property: "脱模温度", value: "80", unit: "°C" },
        { property: "基底厚度", value: "2.0", unit: "mm" },
      ],
      predict: [
        { property: "流道截面保真度", value: "95%", check: true },
        { property: "基底平整度", value: "<10μm", check: true },
        { property: "残余应力", value: "低", check: true },
        { property: "微结构崩缺", value: "无", check: true },
      ],
      suggestion:
        '<li>针对微流控芯片的<span class="highlight">后续键合需求</span>，必须将残余应力降至最低</li><li>建议脱模温度设定在<span class="highlight">玻璃化转变温度(Tg)以下20°C</span>，确保结构固化定型</li><li>对于混合器等复杂拓扑结构，推荐使用<span class="highlight">PDMS柔性模具</span>进行软光刻或热压</li><li>注意控制<span class="highlight">压力分布均匀性</span>，避免大面积芯片边缘产生翘曲变形</li>',
    },
  },
  {
    id: 5,
    prompt_id: "selected_prompt_5",
    resultData: {
      arguments: [
        { property: "模具温度", value: "160", unit: "°C" },
        { property: "注射速率", value: "80", unit: "cm³/s" },
        { property: "保压压力", value: "80", unit: "MPa" },
        { property: "冷却时间", value: "15", unit: "s" },
        { property: "模具涂层", value: "FDTS", unit: "SAM" },
      ],
      predict: [
        { property: "微柱高度复制率", value: "98%", check: true },
        { property: "纳米结构填充", value: "良好", check: true },
        { property: "接触角", value: ">150°", check: true },
        { property: "脱模拉伤", value: "轻微", check: false },
      ],
      suggestion:
        '<li><span class="highlight">微纳双级结构</span>成型难度大，需采用急冷急热(RHCM)技术保证纳米级纹理填充</li><li>模具表面必须进行<span class="highlight">抗粘连处理</span>，推荐沉积FDTS自组装单分子膜</li><li>建议<span class="highlight">适当降低保压压力</span>，防止聚合物嵌入纳米孔隙过深导致无法脱模</li><li>设计模具时应考虑<span class="highlight">1-2°的微小拔模斜度</span>，在保证疏水性的前提下改善脱模</li>',
    },
  },
  {
    id: 6,
    prompt_id: "selected_prompt_6",
    resultData: {
      arguments: [
        { property: "熔体温度", value: "260", unit: "°C" },
        { property: "注射压力", value: "150", unit: "MPa" },
        { property: "V/P切换点", value: "98", unit: "%" },
        { property: "模具温度", value: "90", unit: "°C" },
        { property: "锁模力", value: "120", unit: "Ton" },
      ],
      predict: [
        { property: "齿尖半径", value: "0.4μm", check: true },
        { property: "齿深填充率", value: "99.8%", check: true },
        { property: "同心度", value: "0.01mm", check: true },
        { property: "表面波纹度", value: "无", check: true },
      ],
      suggestion:
        '<li>菲涅尔透镜的<span class="highlight">锐利齿尖</span>是性能关键，需采用高速高压注射填充</li><li>V/P(速度/压力)切换点应设置在<span class="highlight">型腔填充98%</span>时，利用惯性填充齿尖，避免飞边</li><li>建议选用<span class="highlight">高流动性PMMA或PC材料</span>，熔指(MFI)建议大于20 g/10min</li><li>模具加工推荐使用<span class="highlight">单晶金刚石飞切</span>工艺，以保证锯齿面的光学光洁度</li>',
    },
  },
];
const prompts: Prompt[] = [
  {
    id: "selected_prompt_1",
    content: "亚波长纳米光栅结构，周期300nm，槽深150nm，用于AR衍射波导",
    subtitle: "纳米级光栅，高精度复制",
  },
  {
    id: "selected_prompt_2",
    content: "高深径比微针阵列，针体高度600μm，尖端直径<10μm，用于透皮给药",
    subtitle: "高深径比，尖端成型",
  },
  {
    id: "selected_prompt_3",
    content: "非球面微透镜阵列，透镜曲率半径2mm，表面粗糙度Ra<5nm",
    subtitle: "光学级表面，面型精度",
  },
  {
    id: "selected_prompt_4",
    content: "复杂微流控芯片流道，包含微混合器结构，通道宽度50μm",
    subtitle: "复杂拓扑，低残余应力",
  },
  {
    id: "selected_prompt_5",
    content: "仿生超疏水表面，微纳米分级结构，微柱阵列深径比5:1",
    subtitle: "双级结构，脱模优化",
  },
  {
    id: "selected_prompt_6",
    content: "菲涅尔透镜结构，锯齿槽深20μm，要求齿尖锐利度<0.5μm",
    subtitle: "锐利边缘，高填充率",
  },
];
export async function opitmizeSearch(
  data: SearchFormData,
  signal?: AbortSignal
): Promise<AiResult> {
  const isSelected = prompts.find((prompt) => prompt.content === data.value);
  if (!!isSelected) {
    await new Promise((resolve) => setTimeout(resolve, 550));
    console.log(getFakeData(isSelected));

    return {
      timestamp: 0,
      success: true,
      data: JSON.stringify(getFakeData(isSelected)),
    };
  }
  return http.post(
    "/ai/optimize",
    {
      message: data.value,
    },
    {
      timeout: 60000, // 30秒超时
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    }
  );
}
function getFakeData(prompt: Prompt): SearchResult {
  const results = promptsResult.find(
    (result) => result.prompt_id === prompt.id
  );
  return results.resultData as SearchResult;
}
