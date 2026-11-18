import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";
import { resolveDemo } from "./demoData";

/**
 * 演示用 axios 适配器：仅在 VITE_DEMO_MODE=true 时启用。
 *
 * 作用：把请求直接在浏览器内解析为内置示例数据，使 GitHub Pages 这类
 *      纯静态托管也能完整展示界面（没有后端服务器）。
 * 说明：返回内容为构造的演示数据，非真实检测/实验数据。
 */
export const demoAdapter: AxiosAdapter = (config: AxiosRequestConfig) => {
  const url = config.url || "";
  const method = (config.method || "get").toLowerCase();
  let body: any = {};
  if (typeof config.data === "string") {
    try {
      body = JSON.parse(config.data);
    } catch {
      body = {};
    }
  } else if (config.data && typeof config.data === "object") {
    body = config.data;
  }

  const payload = resolveDemo(url, method, body, config.params || {});
  const delay = method === "post" && url.includes("/ai/") ? 550 : 80;

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        data: payload,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      } as AxiosResponse);
    }, delay);
  });
};