<template>
  <a-card style="height: 100%">
    <template #title>
      <h2 style="color: #00bcd4" class="text-3xl">AI质检详细报告</h2>
    </template>
    <div id="resultTable" ref="resultTable">
      <a-table bordered :data-source="dataSource" :columns="columns" :customHeaderRow="customHeaderRow"
        :customRow="customRow" :pagination="false">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'level'">
            <div class="editable-cell">
              <div v-if="editableData[record.key] && curColumn === column.dataIndex"
                class="editable-cell-input-wrapper">
                <a-input v-model:value="editableData[record.key]!.level" @pressEnter="save(record.key)" />
                <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
              </div>
              <div v-else class="editable-cell-text-wrapper" :class="getLevelName(text) === '严重'
                ? 'danger'
                : getLevelName(text) === '轻微'
                  ? 'warning'
                  : ''
                ">
                {{ getLevelName(text) || " " }}
                <edit-outlined class="editable-cell-icon" @click="edit(record.key, column.dataIndex)" />
              </div>
            </div>
          </template>
          <template v-if="column.dataIndex === 'type'">
            <div class="editable-cell">
              <div v-if="editableData[record.key] && curColumn === column.dataIndex"
                class="editable-cell-input-wrapper">
                <a-input v-model:value="editableData[record.key]!.type" @pressEnter="save(record.key)" />
                <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ text }}
                <edit-outlined class="editable-cell-icon" @click="edit(record.key, column.dataIndex)" />
              </div>
            </div>
          </template>
          <template v-if="column.key === 'position'">
            <span>
              ({{
                `${Math.round(Number(text.x))},${Math.round(Number(text.y))}`
              }})
            </span>
          </template>
          <template v-if="column.dataIndex === 'operation2'">
            <a-popconfirm v-if="dataSource.length" title="确定删除吗？" @confirm="onDelete(record.key)" :okText="'确定'"
              :cancelText="'取消'">
              <a>删除</a>
            </a-popconfirm>
          </template>
          <template v-if="column.key === 'operation'">
            <a-button size="large" @click="locateDefect(record)">定位</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <div class="flex items-center justify-center gap-2.5 mt-5">
      <a-button size="large" @click="pdfHandle">生成PDF报告</a-button>
      <a-button size="large" :style="{
        color: isTaged ? '#fbbc05' : '#ea4335',
        borderColor: isTaged ? '#fbbc05' : '#ea4335',
      }" @click="tagHandle">{{ isTaged ? "取消标记" : "标记为不合格品" }}</a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { customHeaderRow, customRow } from "@/utils/table";
import { message } from "ant-design-vue";
import { ref, nextTick, watch, computed, reactive, onMounted } from "vue";
import type { Ref, UnwrapRef } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
import { formatDateTime, htmlToPdf, loadLocationData } from "@/utils/tools";

const searchValue = ref("");
// 修改: 添加emit定义用于传递定位事件
const emit = defineEmits(["locate:defect", "marker:delete"]);
const props = defineProps<{
  reportData?: ReportData;
  deleteData?: number;
}>();

const curColumn = ref<string | null>(null);

const columns = ref([
  {
    title: "编号",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "位置",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "程度",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "操作",
    key: "operation",
  },
  {
    title: "删除",
    key: "operation2",
    dataIndex: "operation2",
  },
]);
const resultTable = ref()

const dataSource: Ref<ReportData[]> = ref([]);
const isTaged = ref(false);

function tagHandle() {
  if (!isTaged.value) {
    message.success("标记成功！");
    isTaged.value = true;
  } else {
    message.error("取消标记！");
    isTaged.value = false;
  }
}
let pdfLoading = ref(false);
function pdfHandle() {
  if (pdfLoading.value) return;
  pdfLoading.value = true;
  message
    .loading({
      content: '正在生成PDF报告...',
      duration: 1,
      key: 'report',
    })
    .then(() => {
      htmlToPdf.getPdf('AI质检详细报告' + formatDateTime(new Date()), resultTable.value)
      message.success({
        content: 'PDF报告已生成！',
        duration: 2,
        key: 'report',
      });
      pdfLoading.value = false;
    });
}

// 修改: 添加定位缺陷函数
function locateDefect(record: ReportData) {
  emit("locate:defect", record);
  message.info(`正在定位缺陷 编号#${record.key}`);
}

function getLevelName(level: string) {
  switch (level) {
    case "warning":
      return "轻微";
    case "danger":
      return "严重";
    default:
      return level;
  }
}

watch(dataSource, (val: any) => {
  localStorage.setItem("visonReportDataSource", JSON.stringify(val));
},
  {
    deep: true,
  })

watch(
  () => props.reportData,
  (val) => {
    if (!val) return;
    dataSource.value.push(val);
  },
  {
    deep: true,
  }
);
watch(
  () => props.deleteData,
  (val) => {
    if (!val) return;
    dataSource.value = dataSource.value.filter((item) => item.key !== val);
  },
  {
    deep: true,
  }
);

const count = computed(() => dataSource.value.length + 1);
const editableData: UnwrapRef<Record<string, ReportData>> = reactive({});

const edit = (key: number, dataIndex: string) => {
  const item = dataSource.value.find((item) => key === item.key);
  if (item) {
    curColumn.value = dataIndex;
    editableData[key] = cloneDeep(item);
  }
};

const save = (key: number) => {
  dataSource.value[dataSource.value.findIndex((item) => key === item.key)] = {
    ...(editableData[key] as ReportData),
  };
  delete editableData[key];
};

const onDelete = (key: number) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  emit("marker:delete", key);
};
onMounted(() => {
  loadLocationData("visonReportDataSource", dataSource)
})
</script>

<style lang="less" scoped>
.warning {
  color: #fbbc05;
}

.danger {
  color: #ea4335;
}

.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
