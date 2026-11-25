import type { ScheduleData, ScheduleDay } from "../types/Schedule";
export type ScheduleFormData = {
  value: string;
  ignore: boolean;
};
let scheduleFormData: ScheduleFormData = {
  value: "",
  ignore: false,
};
let scheduleData: ScheduleData[] = [];
const handle = () => { };

export async function getSchedule(
  data: ScheduleFormData
): Promise<ScheduleData[]> {
  await new Promise((resolve) => setTimeout(resolve, 90));

  // 首次调用时以默认排产数据填充，避免甘特图长期显示 No data
  if (!scheduleData.length) {
    scheduleData = getFakeData();
  }

  if (
    data.value === scheduleFormData.value &&
    data.ignore === scheduleFormData.ignore
  ) {
    return scheduleData;
  }
  if (data.value) {
    scheduleFormData.value = data.value;
    scheduleFormData.ignore = data.ignore;
    scheduleData = getFakeData();
  }
  if (data.value && data.ignore) {
    scheduleData = getFakeData().filter((device: ScheduleData) => {
      // 检查设备的所有工作日字段
      const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return !weekdays.some((day: string) => {
        const value: ScheduleDay = device[day as keyof ScheduleData] as ScheduleDay;
        // 如果该字段是对象且 key 为 "故障"，则说明设备有故障
        return value && value.key === "故障";
      });
    });
  }
  return scheduleData;
}

export function getFakeData(): ScheduleData[] {
  const data: ScheduleData[] = [
    {
      key: "1",
      device: "TM-YJ-01",
      level: 1,
      deadline: "2026-09-01",
      efficiency: 0.8,
      Monday: null,
      Tuesday: { key: "BYD", color: "#34a853", handle: handle },
      Wednesday: null,
      Thursday: { key: "BYD", color: "#34a853", handle: handle },
      Friday: null,
    },
    {
      key: "2",
      device: "TM-YJ-02",
      level: 3,
      deadline: "2026-08-15",
      efficiency: 0.65,
      Monday: { key: "紧急", color: "#ea473a", handle: handle },
      Tuesday: { key: "XM", color: "#4285f4", handle: handle },
      Wednesday: { key: "HW", color: "#fbbc05", handle: handle },
      Thursday: null,
      Friday: { key: "故障", color: "#8d9094", handle: handle },
    },
    {
      key: "3",
      device: "TM-YJ-03",
      level: 2,
      deadline: "2026-10-10",
      efficiency: 0.92,
      Monday: { key: "HW", color: "#fbbc05", handle: handle },
      Tuesday: { key: "HW", color: "#fbbc05", handle: handle },
      Wednesday: null,
      Thursday: { key: "XM", color: "#4285f4", handle: handle },
      Friday: { key: "XM", color: "#4285f4", handle: handle },
    },
    {
      key: "4",
      device: "TM-YJ-04",
      level: 1,
      deadline: "2026-07-20",
      efficiency: 0.78,
      Monday: null,
      Tuesday: null,
      Wednesday: { key: "BYD", color: "#34a853", handle: handle },
      Thursday: { key: "BYD", color: "#34a853", handle: handle },
      Friday: { key: "BYD", color: "#34a853", handle: handle },
    },
    {
      key: "5",
      device: "TM-YJ-05",
      level: 4,
      deadline: "2026-11-05",
      efficiency: 0.45,
      Monday: { key: "故障", color: "#8d9094", handle: handle },
      Tuesday: { key: "故障", color: "#8d9094", handle: handle },
      Wednesday: { key: "故障", color: "#8d9094", handle: handle },
      Thursday: null,
      Friday: { key: "紧急", color: "#ea473a", handle: handle },
    },
    {
      key: "6",
      device: "TM-YJ-06",
      level: 2,
      deadline: "2026-08-30",
      efficiency: 0.88,
      Monday: { key: "XM", color: "#4285f4", handle: handle },
      Tuesday: { key: "XM", color: "#4285f4", handle: handle },
      Wednesday: { key: "HW", color: "#fbbc05", handle: handle },
      Thursday: { key: "HW", color: "#fbbc05", handle: handle },
      Friday: null,
    },
    {
      key: "7",
      device: "TM-YJ-07",
      level: 1,
      deadline: "2026-09-15",
      efficiency: 0.76,
      Monday: null,
      Tuesday: { key: "BYD", color: "#34a853", handle: handle },
      Wednesday: { key: "BYD", color: "#34a853", handle: handle },
      Thursday: null,
      Friday: { key: "XM", color: "#4285f4", handle: handle },
    },
    {
      key: "8",
      device: "TM-YJ-08",
      level: 3,
      deadline: "2026-10-25",
      efficiency: 0.82,
      Monday: { key: "HW", color: "#fbbc05", handle: handle },
      Tuesday: null,
      Wednesday: { key: "紧急", color: "#ea473a", handle: handle },
      Thursday: { key: "紧急", color: "#ea473a", handle: handle },
      Friday: { key: "HW", color: "#fbbc05", handle: handle },
    },
    {
      key: "9",
      device: "TM-YJ-09",
      level: 2,
      deadline: "2026-07-10",
      efficiency: 0.91,
      Monday: { key: "XM", color: "#4285f4", handle: handle },
      Tuesday: { key: "XM", color: "#4285f4", handle: handle },
      Wednesday: { key: "XM", color: "#4285f4", handle: handle },
      Thursday: { key: "XM", color: "#4285f4", handle: handle },
      Friday: { key: "XM", color: "#4285f4", handle: handle },
    },
    {
      key: "10",
      device: "TM-YJ-10",
      level: 1,
      deadline: "2026-12-01",
      efficiency: 0.68,
      Monday: null,
      Tuesday: null,
      Wednesday: { key: "BYD", color: "#34a853", handle: handle },
      Thursday: null,
      Friday: { key: "BYD", color: "#34a853", handle: handle },
    },
    {
      key: "11",
      device: "TM-YJ-11",
      level: 4,
      deadline: "2026-08-05",
      efficiency: 0.52,
      Monday: { key: "故障", color: "#8d9094", handle: handle },
      Tuesday: null,
      Wednesday: { key: "故障", color: "#8d9094", handle: handle },
      Thursday: { key: "故障", color: "#8d9094", handle: handle },
      Friday: null,
    },
    {
      key: "12",
      device: "TM-YJ-12",
      level: 2,
      deadline: "2026-09-20",
      efficiency: 0.85,
      Monday: { key: "HW", color: "#fbbc05", handle: handle },
      Tuesday: { key: "HW", color: "#fbbc05", handle: handle },
      Wednesday: null,
      Thursday: { key: "XM", color: "#4285f4", handle: handle },
      Friday: { key: "XM", color: "#4285f4", handle: handle },
    },
    {
      key: "13",
      device: "TM-YJ-13",
      level: 1,
      deadline: "2026-11-15",
      efficiency: 0.79,
      Monday: null,
      Tuesday: { key: "BYD", color: "#34a853", handle: handle },
      Wednesday: { key: "BYD", color: "#34a853", handle: handle },
      Thursday: { key: "BYD", color: "#34a853", handle: handle },
      Friday: null,
    },
    {
      key: "14",
      device: "TM-YJ-14",
      level: 3,
      deadline: "2026-07-30",
      efficiency: 0.73,
      Monday: { key: "紧急", color: "#ea473a", handle: handle },
      Tuesday: { key: "紧急", color: "#ea473a", handle: handle },
      Wednesday: null,
      Thursday: { key: "HW", color: "#fbbc05", handle: handle },
      Friday: { key: "HW", color: "#fbbc05", handle: handle },
    },
    {
      key: "15",
      device: "TM-YJ-15",
      level: 2,
      deadline: "2026-10-05",
      efficiency: 0.89,
      Monday: { key: "XM", color: "#4285f4", handle: handle },
      Tuesday: null,
      Wednesday: { key: "XM", color: "#4285f4", handle: handle },
      Thursday: { key: "XM", color: "#4285f4", handle: handle },
      Friday: null,
    },
    {
      key: "16",
      device: "TM-YJ-16",
      level: 1,
      deadline: "2026-12-20",
      efficiency: 0.81,
      Monday: null,
      Tuesday: { key: "BYD", color: "#34a853", handle: handle },
      Wednesday: null,
      Thursday: { key: "BYD", color: "#34a853", handle: handle },
      Friday: { key: "BYD", color: "#34a853", handle: handle },
    },
    {
      key: "17",
      device: "TM-YJ-17",
      level: 4,
      deadline: "2026-08-25",
      efficiency: 0.48,
      Monday: { key: "故障", color: "#8d9094", handle: handle },
      Tuesday: { key: "故障", color: "#8d9094", handle: handle },
      Wednesday: null,
      Thursday: { key: "故障", color: "#8d9094", handle: handle },
      Friday: { key: "紧急", color: "#ea473a", handle: handle },
    },
    {
      key: "18",
      device: "TM-YJ-18",
      level: 2,
      deadline: "2026-09-10",
      efficiency: 0.87,
      Monday: { key: "HW", color: "#fbbc05", handle: handle },
      Tuesday: { key: "HW", color: "#fbbc05", handle: handle },
      Wednesday: { key: "HW", color: "#fbbc05", handle: handle },
      Thursday: null,
      Friday: { key: "XM", color: "#4285f4", handle: handle },
    },
    {
      key: "19",
      device: "TM-YJ-19",
      level: 1,
      deadline: "2026-11-30",
      efficiency: 0.75,
      Monday: null,
      Tuesday: { key: "BYD", color: "#34a853", handle: handle },
      Wednesday: { key: "BYD", color: "#34a853", handle: handle },
      Thursday: null,
      Friday: { key: "BYD", color: "#34a853", handle: handle },
    },
    {
      key: "20",
      device: "TM-YJ-20",
      level: 3,
      deadline: "2026-07-15",
      efficiency: 0.84,
      Monday: { key: "紧急", color: "#ea473a", handle: handle },
      Tuesday: null,
      Wednesday: { key: "紧急", color: "#ea473a", handle: handle },
      Thursday: { key: "HW", color: "#fbbc05", handle: handle },
      Friday: { key: "HW", color: "#fbbc05", handle: handle },
    },
  ];
  const randomizedData = randomizeWeekdays(data);
  return randomizedData;
}
function randomizeWeekdays(data: ScheduleData[]) {
  // 定义工作日数组
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

  return data.map((item) => {
    // 提取当前设备的工作日数据
    const currentWeekdays = weekdays.map((day) => item[day as keyof ScheduleData] as ScheduleDay | null);

    // 使用Fisher-Yates洗牌算法随机排序
    for (let i = currentWeekdays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentWeekdays[i], currentWeekdays[j]] = [
        currentWeekdays[j] as ScheduleDay | null,
        currentWeekdays[i] as ScheduleDay | null,
      ];
    }

    // 创建新对象并保留原始非工作日属性
    const newItem = { ...item };

    // 将随机排序后的值分配回工作日
    weekdays.forEach((day, index) => {
      newItem[day] = currentWeekdays[index] as ScheduleDay | null;
    });

    return newItem;
  });
}
