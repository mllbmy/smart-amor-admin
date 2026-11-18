import type { DeviceInfo } from "../types/DeviceInfo";

// export async function getDeviceInfo(deviceId?: string): Promise<DeviceInfo> {
export async function getDeviceInfo(): Promise<DeviceInfo> {
  await new Promise((resolve) => setTimeout(resolve, 90));
  return getFakeDeviceInfo();
}

function getFakeDeviceInfo(): DeviceInfo {
  const nowDate = Date.now();
  const devices = Array.from({ length: 9 }, (_, index) => {
    return `TM-YJ-${++index > 9 ? index : "0" + index}`;
  });

  const devicesInfo = devices.map((deviceId) => {
    return {
      id: deviceId,
      info: {
        temperature: {
          value: randomNumber(10, 100, 1),
        },
        pressure: {
          value: Number((randomNumber(0, 10, 2) / 10).toFixed(2)),
        },
        vacuum: {
          value: randomNumber(200, 2000, 0),
        },
      },
    };
  });

  return {
    id: "INFO-" + nowDate,
    time: nowDate,
    devices: devicesInfo,
  };
}

function randomNumber(min: number, max: number, fixed: number): number {
  return Number((Math.random() * (max - min + 1) + min).toFixed(fixed));
}
