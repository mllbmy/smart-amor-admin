import type {
  SearchFormData,
  SearchResult,
} from "@/modules/research/types/recommend/Search";
import { http } from "@/utils/request";
import { message } from "ant-design-vue";
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
      recommendedResultName: "镍基高温合金 Inconel 718",
      suggestion:
        '<li>推荐采用<span class="highlight">Inconel 718镍基高温合金</span>，其在650°C下仍保持优异强度</li><li>建议热处理工艺：<span class="highlight">固溶处理980°C×1h+时效处理720°C×8h</span></li><li>可采用精密铸造或粉末冶金工艺制造复杂结构件</li><li>表面建议进行<span class="highlight">渗铝或MCrAlY涂层</span>处理以提升抗氧化性能</li><li>焊接时需严格控制热输入，推荐采用电子束焊接工艺</li><li>材料成本较高但性能可靠，已广泛应用于航空发动机和机身结构</li>',
      details: [
        {
          property: "Ni含量",
          value: "52.5%",
          reference: "基体元素，提供高温强度",
          hightlight: true,
        },
        {
          property: "Cr含量",
          value: "19.0%",
          reference: "抗氧化关键元素",
          hightlight: false,
        },
        {
          property: "Fe含量",
          value: "18.5%",
          reference: "降低成本，改善工艺性",
          hightlight: false,
        },
        {
          property: "Nb+Ta含量",
          value: "5.1%",
          reference: "主要强化元素",
          hightlight: false,
        },
        {
          property: "最高使用温度",
          value: "650°C",
          reference: "长期工作温度",
          hightlight: true,
        },
        {
          property: "室温抗拉强度",
          value: "1350 MPa",
          reference: "满足高强度要求",
          hightlight: true,
        },
        {
          property: "650°C抗拉强度",
          value: "1050 MPa",
          reference: "高温强度保持率优异",
          hightlight: true,
        },
        {
          property: "密度",
          value: "8.19 g/cm³",
          reference: "适中密度",
          hightlight: false,
        },
      ],
    },
  },
  {
    id: 2,
    prompt_id: "selected_prompt_2",
    resultData: {
      recommendedResultName: "导电铝合金 AA6101-T6",
      suggestion:
        '<li>针对轻量化导电需求，推荐<span class="highlight">AA6101-T6铝合金</span>，密度仅为铜的30%</li><li>导电率可达<span class="highlight">57% IACS</span>，通过截面积补偿可完全替代铜排</li><li>建议采用<span class="highlight">搅拌摩擦焊(FSW)</span>进行电池模组连接，避免气孔缺陷</li><li>表面需进行<span class="highlight">镀镍或镀银</span>处理，防止表面氧化导致接触电阻增加</li><li>折弯加工时建议R角大于2倍板厚，防止外侧开裂</li>',
      details: [
        {
          property: "Al含量",
          value: "98.9%",
          reference: "基体，保证轻量化",
          hightlight: true,
        },
        {
          property: "Mg含量",
          value: "0.6%",
          reference: "提供固溶强化",
          hightlight: false,
        },
        {
          property: "Si含量",
          value: "0.5%",
          reference: "形成Mg2Si强化相",
          hightlight: false,
        },
        {
          property: "导电率",
          value: "57% IACS",
          reference: "优异的导电性能",
          hightlight: true,
        },
        {
          property: "密度",
          value: "2.70 g/cm³",
          reference: "实现极致轻量化",
          hightlight: true,
        },
        {
          property: "屈服强度",
          value: "195 MPa",
          reference: "满足结构支撑需求",
          hightlight: false,
        },
      ],
    },
  },
  {
    id: 3,
    prompt_id: "selected_prompt_3",
    resultData: {
      recommendedResultName: "医用镁合金 WE43",
      suggestion:
        '<li>推荐使用<span class="highlight">WE43稀土镁合金</span>，具有优异的生物相容性和可控降解性</li><li>建议降解周期控制：通过<span class="highlight">微弧氧化(MAO)</span>表面处理调节降解速率</li><li>加工环境需严格控制粉尘，防止镁粉燃烧风险</li><li>该材料弹性模量与人骨接近，可避免<span class="highlight">应力遮挡效应</span></li><li>制造工艺推荐采用<span class="highlight">激光粉末床熔融(LPBF)</span>3D打印技术定制复杂植入体</li>',
      details: [
        {
          property: "Mg含量",
          value: "93.6%",
          reference: "可降解基体",
          hightlight: true,
        },
        {
          property: "Y(钇)含量",
          value: "4.0%",
          reference: "提升强度与耐腐蚀性",
          hightlight: false,
        },
        {
          property: "RE(稀土)含量",
          value: "2.25%",
          reference: "细化晶粒",
          hightlight: false,
        },
        {
          property: "Zr含量",
          value: "0.15%",
          reference: "无锆不成镁合金",
          hightlight: false,
        },
        {
          property: "生物降解性",
          value: "完全降解",
          reference: "无需二次手术取出",
          hightlight: true,
        },
        {
          property: "弹性模量",
          value: "44 GPa",
          reference: "接近人骨(10-30GPa)",
          hightlight: true,
        },
        {
          property: "生物相容性",
          value: "ISO 10993级",
          reference: "无细胞毒性",
          hightlight: true,
        },
      ],
    },
  },
  {
    id: 4,
    prompt_id: "selected_prompt_4",
    resultData: {
      recommendedResultName: "无氧铜 C10100 (OFE)",
      suggestion:
        '<li>针对高功率密度电池组件，推荐<span class="highlight">C10100电子级无氧铜</span></li><li>含氧量极低(<5ppm)，杜绝了<span class="highlight">氢脆</span>风险，适合高温焊接环境</li><li>导电率高达<span class="highlight">101% IACS</span>，有效降低大电流下的焦耳热损耗</li><li>建议采用<span class="highlight">超声波焊接</span>连接电芯极耳，接触内阻最小</li><li>虽然密度较大，但可通过<span class="highlight">柔性扁平排线(FFC)</span>设计优化空间利用率</li>',
      details: [
        {
          property: "Cu含量",
          value: "99.99%",
          reference: "纯度极高",
          hightlight: true,
        },
        {
          property: "O含量",
          value: "0.0003%",
          reference: "严格控制杂质",
          hightlight: false,
        },
        {
          property: "P含量",
          value: "0.0002%",
          reference: "痕量杂质控制",
          hightlight: false,
        },
        {
          property: "导电率",
          value: "101% IACS",
          reference: "行业最高导电标准",
          hightlight: true,
        },
        {
          property: "热导率",
          value: "391 W/(m·K)",
          reference: "优异的散热性能",
          hightlight: true,
        },
        {
          property: "软化温度",
          value: "350°C",
          reference: "抗热软化能力强",
          hightlight: false,
        },
      ],
    },
  },
  {
    id: 5,
    prompt_id: "selected_prompt_5",
    resultData: {
      recommendedResultName: "超弹性镍钛合金 Nitinol SE508",
      suggestion:
        '<li>推荐使用<span class="highlight">Nitinol SE508 (NiTi)</span>，利用其独特的超弹性效应</li><li>可承受高达<span class="highlight">8%的可恢复应变</span>，远超普通金属的0.2%</li><li>具备自适应刚度特性，不仅耐磨损，还能在冲击下<span class="highlight">吸能减震</span></li><li>建议相变温度Af点控制在<span class="highlight">-15°C至10°C</span>之间，确保室温下表现为超弹性</li><li>加工困难，推荐采用<span class="highlight">激光切割</span>或放电加工(EDM)成型</li><li>表面需形成稳定的<span class="highlight">TiO2氧化膜</span>以保证耐磨性和润滑性</li>',
      details: [
        {
          property: "Ni含量",
          value: "55.8%",
          reference: "决定相变温度关键",
          hightlight: true,
        },
        {
          property: "Ti含量",
          value: "44.15%",
          reference: "基体平衡元素",
          hightlight: false,
        },
        {
          property: "C含量",
          value: "0.04%",
          reference: "低碳控制杂质",
          hightlight: false,
        },
        {
          property: "弹性应变极限",
          value: "8.0%",
          reference: "超弹性核心指标",
          hightlight: true,
        },
        {
          property: "耐磨损性",
          value: "优异",
          reference: "加工硬化能力强",
          hightlight: true,
        },
        {
          property: "抗疲劳寿命",
          value: "10^7 次",
          reference: "适合高频运动关节",
          hightlight: true,
        },
      ],
    },
  },
  {
    id: 6,
    prompt_id: "selected_prompt_6",
    resultData: {
      recommendedResultName: "高纯氧化铝陶瓷 Al2O3-995",
      suggestion:
        '<li>推荐采用<span class="highlight">99.5%高纯氧化铝陶瓷</span>，适用于深海高压绝缘环境</li><li>具有极高的<span class="highlight">抗压强度(>2500 MPa)</span>，可抵抗深海巨大的静水压力</li><li>化学性质绝对惰性，在海水中实现<span class="highlight">零腐蚀</span>，寿命极长</li><li>绝缘强度高达<span class="highlight">15 kV/mm</span>，完美保护电子探测模块</li><li>建议采用<span class="highlight">冷等静压(CIP)</span>成型+高温烧结工艺，确保致密度</li><li>需注意材料脆性，结构设计应避免尖角，采用<span class="highlight">钛合金卡箍</span>进行封装连接</li>',
      details: [
        {
          property: "Al2O3含量",
          value: "99.5%",
          reference: "主相成分",
          hightlight: true,
        },
        {
          property: "SiO2含量",
          value: "0.08%",
          reference: "玻璃相杂质",
          hightlight: false,
        },
        {
          property: "MgO含量",
          value: "0.05%",
          reference: "烧结助剂",
          hightlight: false,
        },
        {
          property: "体积电阻率",
          value: ">10^14 Ω·cm",
          reference: "优异绝缘性",
          hightlight: true,
        },
        {
          property: "吸水率",
          value: "0.00%",
          reference: "气密性好，不渗漏",
          hightlight: true,
        },
        {
          property: "抗压强度",
          value: "2600 MPa",
          reference: "抗深水压核心指标",
          hightlight: true,
        },
      ],
    },
  },
  {
    id: 7,
    prompt_id: "selected_prompt_7",
    resultData: {
      recommendedResultName: "超导铌 Ultra-High Purity Nb",
      suggestion:
        '<li>针对量子计算约瑟夫森结，推荐<span class="highlight">RRR>300的超高纯铌</span></li><li>在9.2K以下进入超导态，实现<span class="highlight">零电阻和完全抗磁性</span></li><li>极高的纯度确保了极长的<span class="highlight">退相干时间</span>，这是量子计算的关键</li><li>建议薄膜制备采用<span class="highlight">超高真空磁控溅射</span>，背底真空度需优于10^-8 Torr</li><li>表面需进行<span class="highlight">电化学抛光(EP)</span>，去除表面氧化层缺陷，降低介电损耗</li><li>需配合<span class="highlight">稀释制冷机</span>在mK级低温环境下工作</li>',
      details: [
        {
          property: "Nb含量",
          value: "99.999%",
          reference: "5N级超高纯度",
          hightlight: true,
        },
        {
          property: "Ta含量",
          value: "0.005%",
          reference: "最难去除的杂质",
          hightlight: false,
        },
        {
          property: "O含量",
          value: "0.0005%",
          reference: "间隙杂质需极低",
          hightlight: false,
        },
        {
          property: "超导临界温度",
          value: "9.26 K",
          reference: "相变温度点",
          hightlight: true,
        },
        {
          property: "RRR值",
          value: ">300",
          reference: "剩余电阻率比，纯度指标",
          hightlight: true,
        },
        {
          property: "磁穿透深度",
          value: "39 nm",
          reference: "量子器件设计参数",
          hightlight: false,
        },
      ],
    },
  },
];
const prompts: Prompt[] = [
  {
    id: "selected_prompt_1",
    content: "耐高温，高强度，适用于航空航天结构件",
    subtitle: "耐高温，高强度",
  },
  {
    id: "selected_prompt_2",
    content: "生物相容性，可降解，应用于植入式医疗器械",
    subtitle: "生物相容性，可降解",
  },
  {
    id: "selected_prompt_3",
    content: "轻量化，高导电性，用于电动汽车电池组件",
    subtitle: "轻量化，高导电性",
  },
  {
    id: "selected_prompt_4",
    content: "高弹性，耐磨损，用于机器人柔性关节",
    subtitle: "高弹性，耐磨损",
  },
  {
    id: "selected_prompt_5",
    content: "耐腐蚀，绝缘性好，应用于深海探测设备",
    subtitle: "耐腐蚀，绝缘性好",
  },
  {
    id: "selected_prompt_6",
    content: "超快响应时间，高灵敏度，用于量子计算芯片",
    subtitle: "超快响应时间，高灵敏度",
  },
];
export async function recommendSearch(
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
    "/ai/recommend",
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
