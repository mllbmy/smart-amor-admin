export type DeviceStatusEnum = "normal" | "warning" | "error";

export interface DeviceInfo {
  id: string;
  time: number;
  devices: Device[];
}

export interface DeviceInfoStatus {
  value: number;
  status?: DeviceStatusEnum;
}

export interface Device {
  id: string;
  info: DeviceInfoData;
}

export interface DeviceInfoData {
  temperature: DeviceInfoStatus;
  pressure: DeviceInfoStatus;
  vacuum: DeviceInfoStatus;
}

export type WarnInfoRenderData = {
  id: string;
  time: number;
  msg: string;
};
