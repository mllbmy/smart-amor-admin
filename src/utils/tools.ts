// 格式化时间为 YYYY-MM-DD HH:mm:ss 格式
export const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getBaseTypeById(id: number): string {
  switch (id) {
    case 1:
      return "锆";
    case 2:
      return "铁";
    case 3:
      return "铜";
    case 4:
      return "镁";
    case 5:
      return "钯";
    default:
      return "未知";
  }
}

export function parseResToMaterialResData(records: any) {
  return records.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      version: item.version,
      base_type: item.base_type_id.toString(),
      formula: item.formula,
      composition: item.composition,
      properties: item.properties,
      hasCompareButton: true,
    };
  });
}

/**
 * 处理文本区域的按键事件，支持 Shift+Enter 换行，Enter 执行搜索
 * @param event 键盘事件对象
 * @param options 配置选项
 */
export function handleTextAreaKeydown(
  event: KeyboardEvent,
  options: {
    /** 当前文本值（响应式引用或可修改的对象） */
    value:
    | { value: string }
    | { get: () => string; set: (value: string) => void };
    /** 按下 Enter 键时的回调函数 */
    onEnter: () => void;
    /** 按下 Shift+Enter 键时的自定义处理函数（可选） */
    onShiftEnter?: (
      event: KeyboardEvent,
      insertNewLine: (start: number, end: number) => void
    ) => void;
  }
) {
  if (event.key === "Enter" && event.shiftKey) {
    event.preventDefault();

    const insertNewLine = (start: number, end: number) => {
      const currentValue =
        "value" in options.value ? options.value.value : options.value.get();
      const newValue =
        currentValue.substring(0, start) + "\n" + currentValue.substring(end);

      if ("value" in options.value) {
        options.value.value = newValue;
      } else {
        options.value.set(newValue);
      }

      // 设置光标位置
      setTimeout(() => {
        if (event.target instanceof HTMLTextAreaElement) {
          event.target.selectionStart = event.target.selectionEnd = start + 1;
        }
      }, 0);
    };

    if (options.onShiftEnter) {
      // 允许自定义 Shift+Enter 处理逻辑
      options.onShiftEnter(event, insertNewLine);
    } else {
      // 默认行为：插入换行符
      if (event.target instanceof HTMLTextAreaElement) {
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        insertNewLine(start, end);
      }
    }
  } else if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    options.onEnter();
  }
}


export function safeParseJSON(dataString: string) {
  try {
    // 多种清理方式确保 JSON 格式正确
    let cleanString = dataString
      .replace(/^```(json)?\n/, '')  // 移除开头的 ```json
      .replace(/\n```$/, '')         // 移除结尾的 ```
      .trim();                       // 去除首尾空格

    return JSON.parse(cleanString);
  } catch (error) {
    // 如果第一次解析失败，尝试更激进的清理
    try {
      // 移除所有可能的多余字符
      const match = dataString.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch (e) {
      console.error('JSON 解析失败:', e);
      throw e;
    }
  }
}


export function loadLocationData(storeKey: string, ref: any) {
  const localStorageData = localStorage.getItem(storeKey)
  if (localStorageData) {
    try {
      if (localStorageData) ref.value = JSON.parse(localStorageData);
      return true

    } catch (error) {
      console.log(error);
      return false
    }
  } else {
    return false
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 页面导出为pdf格式
import html2Canvas from "html2canvas";
import jsPDF from "jspdf";

export const htmlToPdf = {
  getPdf(title, dom) {
    // 1. 构建 DOM 树
    if (!dom) return;
    let pdfContent = dom;
    pdfContent.ownerDocument.defaultView.innerHeight = 1000;
    pdfContent.ownerDocument.defaultView.innerWidth = 1000;
    // 2. Canvas 渲染图像
    html2Canvas(pdfContent, {
      logging: false,
      useCORS: true,
      scale: 2,//按比例增加分辨率
    }).then((canvas) => {
      // 3. jsPDF 导出 pdf文件
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "mm", "a4");
      const a4w = 190;
      const a4h = 277;
      pdf.addImage(
        imgData,
        "JPEG",
        10,
        10,
        a4w,
        Math.min(a4h, (a4w * canvas.height) / canvas.width)
      );
      pdf.save(title + ".pdf");
    });
  },
};