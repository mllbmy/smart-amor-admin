import type { DeviceInfo, DeviceInfoData, DeviceStatusEnum } from "../types/DeviceInfo";

/**
 * 演示用设备数据。
 *
 * 说明：这里不连接真实设备，数值由前端按固定比例构造，仅用于界面演示，
 *      不作为真实运行数据。状态划分与首页阈值规则保持一致：
 *        温度 > 80 告警、> 100 故障；压力 > 0.8 告警、> 1.0 故障；
 *        真空度 > 1200 告警、> 1500 故障。
 */
export async function getDeviceInfo(): Promise<DeviceInfo> {
  await new Promise((resolve) => setTimeout(resolve, 90));
  return getFakeDeviceInfo();
}

// 9 台设备的状态分布：6 台正常、2 台告警、1 台故障
const STATUS_PLAN: DeviceStatusEnum[] = [
  "normal",
  "warning",
  "normal",
  "normal",
  "error",
  "normal",
  "normal",
  "normal",
  "warning",
];

function getFakeDeviceInfo(): DeviceInfo {
  const nowDate = Date.now();
  const devicesInfo = STATUS_PLAN.map((status, index) => ({
    id: `TM-YJ-0${index + 1}`,
    info: buildMetrics(status),
  }));

  return {
    id: "INFO-" + nowDate,
    time: nowDate,
    devices: devicesInfo,
  };
}

/** 按目标状态构造三路工艺参数，保证数值落在对应区间内 */
function buildMetrics(status: DeviceStatusEnum): DeviceInfoData {
  const metrics = {
    temperature: randomNumber(45, 75, 1),
    pressure: Number((randomNumber(30, 75, 0) / 100).toFixed(2)),
    vacuum: randomNumber(400, 1100, 0),
  };

  // 只把其中一路参数推到告警/故障区间，其余保持正常
  const key = (["temperature", "pressure", "vacuum"] as const)[
    Math.floor(Math.random() * 3)
  ];

  if (status === "warning") {
    if (key === "temperature") metrics.temperature = randomNumber(82, 98, 1);
    if (key === "pressure") metrics.pressure = Number((randomNumber(82, 98, 0) / 100).toFixed(2));
    if (key === "vacuum") metrics.vacuum = randomNumber(1250, 1450, 0);
  } else if (status === "error") {
    if (key === "temperature") metrics.temperature = randomNumber(102, 120, 1);
    if (key === "pressure") metrics.pressure = Number((randomNumber(105, 130, 0) / 100).toFixed(2));
    if (key === "vacuum") metrics.vacuum = randomNumber(1550, 1900, 0);
  }

  return {
    temperature: { value: metrics.temperature },
    pressure: { value: metrics.pressure },
    vacuum: { value: metrics.vacuum },
  };
}

function randomNumber(min: number, max: number, fixed: number): number {
  return Number((Math.random() * (max - min + 1) + min).toFixed(fixed));
}