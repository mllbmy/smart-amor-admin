import type { MaterialProperty } from "../modules/research/types/home/MaterialDataBase";

export function getDataKeyName(key: keyof MaterialProperty): string {
  switch (key) {
    case "composition" as keyof MaterialProperty:
      return "原子配比";
    case "strength":
      return "强度";
    case "hardness":
      return "硬度";
    case "corrosion_resistance":
      return "防腐性";
    default:
      return key;
  }
}
export function getPropertyColor(key: keyof MaterialProperty): string {
  switch (key) {
    case "composition" as keyof MaterialProperty:
      return "#ffffff";
    case "strength":
      return "#4caf50";
    case "hardness":
      return "#ff9800";
    case "corrosion_resistance":
      return "#00bcd4";
    default:
      return "#fff";
  }
}
