<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :customHeaderRow="customHeaderRow"
      :customRow="customRow"
    >
      <template #bodyCell="{ column, value, record }">
        <template v-if="column.key === 'processCurve'">
          <a-button size="large" @click="checkProcessCurve(record)"
            ><span>查看</span>
          </a-button>
        </template>
        <template v-if="column.key === 'operation'">
          <a-button size="large" :loading="downloadingKey === record.key" @click="handleDownload(record)"
            ><span>下载报告</span>
          </a-button>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="processCurveModalOpen"
      :title="curProcessCurve ? curProcessCurve.batchNo : '批次曲线'"
      :footer="null"
      style="width: 85%"
    >
      <ProcessCurve :curProcessCurve="curProcessCurve" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { getBatchesList, getEquipmentList } from "@/modules/product/api/BatchSearch";
import { customHeaderRow, customRow } from "@/utils/table";
import { htmlToPdf } from "@/utils/tools";
import ProcessCurve from "./ProcessCurve.vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
const processCurveModalOpen = ref(false);
const downloadingKey = ref<string | number | null>(null);

const curProcessCurve = ref<any | null>(null);
const columns = ref([
  {
    title: "批次号",
    dataIndex: "batchNo",
    key: "batchNo",
  },
  {
    title: "生产日期",
    dataIndex: "productionDate",
    key: "productionDate",
  },
  {
    title: "设备",
    dataIndex: "equipment",
    key: "equipment",
  },
  {
    title: "工艺曲线",
    dataIndex: "processCurve",
    key: "processCurve",
  },
  {
    title: "操作",
    key: "operation",
  },
]);

const dataSource = ref([
  {
    key: "1",
    batchNo: "BATCH-20231026-01",
    productionDate: "2023-10-26",
    equipment: "TM-YJ-02",
  },
  {
    key: "2",
    batchNo: "BATCH-20231025-03",
    productionDate: "2023-10-25",
    equipment: "TM-YJ-05",
  },
  {
    key: "3",
    batchNo: "BATCH-20231025-02",
    productionDate: "2023-10-25",
    equipment: "TM-YJ-07",
  },
  {
    key: "4",
    batchNo: "BATCH-20231024-05",
    productionDate: "2023-10-24",
    equipment: "TM-YJ-02",
  },
]);

// const handleSearch = () => {
//   if (searchValue.value) {
//     message.info(`搜索批次号: ${searchValue.value}`);
//   } else {
//     message.info("请输入批次号进行搜索");
//   }
// };

// const handleView = (record: any) => {
//   message.info(`查看批次 ${record.batchNo} 的详细信息`);
// };

const handleDownload = (record: any) => {
  if (!record || downloadingKey.value) return;
  downloadingKey.value = record.key ?? record.batchNo;
  message.loading({ content: `正在生成批次 ${record.batchNo} 的溯源报告…`, key: "batchPdf", duration: 0 });

  // 构建报告内容（离屏渲染，浅色排版便于打印/阅读）
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "position:absolute;left:-10000px;top:0;width:794px;padding:40px 48px;background:#ffffff;color:#111827;" +
    "font-family:'Microsoft YaHei','PingFang SC',sans-serif;font-size:13px;line-height:1.9;box-sizing:border-box;";
  const now = new Date().toLocaleString("zh-CN", { hour12: false });
  const infoRows: [string, string][] = [
    ["批次号", record.batchNo || "-"],
    ["生产日期", record.productionDate || "-"],
    ["生产设备", record.equipment || "-"],
    ["报告生成时间", now],
  ];
  wrap.innerHTML =
    '<div style="font-size:22px;font-weight:700;letter-spacing:2px;">批次溯源报告</div>' +
    '<div style="color:#0e7490;font-size:12px;margin-top:6px;">晶工巧匠 · 非晶合金材料与工艺智能优化系统</div>' +
    '<div style="height:2px;background:#0e7490;margin:14px 0 20px;"></div>' +
    '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">一、批次基本信息</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">' +
    infoRows
      .map(
        ([k, v]) =>
          `<tr><td style="width:130px;padding:7px 10px;background:#f1f5f9;border:1px solid #e2e8f0;">${k}</td>` +
          `<td style="padding:7px 10px;border:1px solid #e2e8f0;">${v}</td></tr>`
      )
      .join("") +
    "</table>" +
    '<div style="font-size:14px;font-weight:600;margin:20px 0 8px;">二、生产溯源链路</div>' +
    '<div style="padding:10px 12px;border:1px solid #e2e8f0;background:#f8fafc;">' +
    "原料入库 → 配料熔炼 → 非晶成型 → 在线检测 → 成品入库</div>" +
    '<div style="margin-top:26px;padding-top:10px;border-top:1px dashed #cbd5e1;color:#64748b;font-size:11px;">' +
    "本报告由演示系统自动生成，所含数据为示例数据，不作为实际检测结论。</div>";

  document.body.appendChild(wrap);
  try {
    htmlToPdf.getPdf(`批次${record.batchNo}_溯源报告`, wrap);
    setTimeout(() => {
      message.success({ content: "报告已生成，PDF 已开始下载", key: "batchPdf", duration: 2 });
      downloadingKey.value = null;
    }, 1200);
  } catch (e) {
    console.error("报告生成失败:", e);
    message.error({ content: "报告生成失败，请重试", key: "batchPdf", duration: 2 });
    downloadingKey.value = null;
  } finally {
    setTimeout(() => wrap.remove(), 4000);
  }
};

const checkProcessCurve = (record: any) => {
  processCurveModalOpen.value = true;
  curProcessCurve.value = record;
};
onMounted(async () => {
  message.loading("正在加载数据...");
  const localData = localStorage.getItem("traceability_data");
  if (localData) {
    dataSource.value = JSON.parse(localData);
    message.destroy();
    return;
  }
  const res = await getBatchesList();
  const equipmentRes = await getEquipmentList();

  if (res.status === 200 && equipmentRes.status === 200) {
    dataSource.value = res.data.map((item: any) => {
      return {
        key: item.id,
        batchNo: item.batchNo,
        productionDate: item.productionDate,
        equipment: equipmentRes.data.find(
          (equipment: any) => equipment.id === item.equipmentId
        ).equipmentCode,
      };
    });
    localStorage.setItem("traceability_data", JSON.stringify(dataSource.value));
  }
  message.destroy();
});
</script>
<style scoped></style>
