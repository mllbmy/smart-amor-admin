import type { BatchSearchResult } from "../types/BatchSearch";
let results: BatchSearchResult[] = [];
let oldBatchNo = "";
import type { PageParams, PageResponse } from "@/types/api";
import { http } from "@/utils/request";


export async function getBatchesList(): Promise<any> {
    return http.get<PageResponse<any>>("/production_batches/list");
}
export async function getListByPage(params: PageParams): Promise<any> {
    return http.get<PageResponse<any>>("/production_batches/list/page", { params });
}

export async function getBatchByBatchNo(batchNo: string): Promise<any> {
    return http.get<any>("/production_batches/batchNo/" + batchNo);
}
export async function getOperatorById(id: string): Promise<any> {
    return http.get<any>("/operator/" + id);
}

export async function getOperatorList(): Promise<any> {
    return http.get<any>("/operator/list");
}
export async function getOperatorListWithPage(params: PageParams): Promise<any> {
    return http.get<any>("/operator/list/page", { params });
}

export async function getEquipmentList(): Promise<any> {
    return http.get("/equipment/list");
}
export async function getBatchSearchResult(batchNo?: string): Promise<BatchSearchResult[]> {
    await new Promise((resolve) => setTimeout(resolve, 70));

    if (batchNo) {
        if (oldBatchNo === batchNo) return results;

        results = getFakeData(batchNo);

        oldBatchNo = batchNo;
        return results;
    } else return getFakeData();

    function getFakeData(batchNo?: string): BatchSearchResult[] {
        const data: BatchSearchResult[] = [
            {
                "key": "1",
                "batchNo": "BATCH-20231026-01",
                "productionDate": "2023-10-26",
                "equipment": "TM-YJ-02",
                "material": "铸铁HT250",
                "process": "砂型铸造",
                "quality": "不合格",
                "operator": "王十二"
            },
            {
                "key": "2",
                "batchNo": "BATCH-20231027-03",
                "productionDate": "2023-10-27",
                "equipment": "TM-YJ-05",
                "material": "铝合金6061",
                "process": "压铸",
                "quality": "合格",
                "operator": "李建国"
            },
            {
                "key": "3",
                "batchNo": "BATCH-20231028-07",
                "productionDate": "2023-10-28",
                "equipment": "TM-YJ-08",
                "material": "不锈钢304",
                "process": "精密铸造",
                "quality": "不合格",
                "operator": "张明华"
            },
            {
                "key": "4",
                "batchNo": "BATCH-20231029-12",
                "productionDate": "2023-10-29",
                "equipment": "TM-YJ-11",
                "material": "铜合金C11000",
                "process": "连续铸造",
                "quality": "合格",
                "operator": "陈晓东"
            },
            {
                "key": "5",
                "batchNo": "BATCH-20231030-15",
                "productionDate": "2023-10-30",
                "equipment": "TM-YJ-03",
                "material": "钛合金TC4",
                "process": "真空铸造",
                "quality": "合格",
                "operator": "刘伟强"
            },
            {
                "key": "6",
                "batchNo": "BATCH-20231031-22",
                "productionDate": "2023-10-31",
                "equipment": "TM-YJ-06",
                "material": "镁合金AZ91",
                "process": "低压铸造",
                "quality": "不合格",
                "operator": "赵海洋"
            },
            {
                "key": "7",
                "batchNo": "BATCH-20231101-04",
                "productionDate": "2023-11-01",
                "equipment": "TM-YJ-09",
                "material": "镍基合金Inconel 718",
                "process": "离心铸造",
                "quality": "合格",
                "operator": "周建华"
            },
            {
                "key": "8",
                "batchNo": "BATCH-20231102-18",
                "productionDate": "2023-11-02",
                "equipment": "TM-YJ-12",
                "material": "锌合金ZA-8",
                "process": "重力铸造",
                "quality": "不合格",
                "operator": "吴志强"
            },
            {
                "key": "9",
                "batchNo": "BATCH-20231103-09",
                "productionDate": "2023-11-03",
                "equipment": "TM-YJ-04",
                "material": "工具钢D2",
                "process": "消失模铸造",
                "quality": "合格",
                "operator": "郑晓峰"
            },
            {
                "key": "10",
                "batchNo": "BATCH-20231104-21",
                "productionDate": "2023-11-04",
                "equipment": "TM-YJ-07",
                "material": "高温合金GH4169",
                "process": "真空熔模铸造",
                "quality": "不合格",
                "operator": "王海涛"
            },
            {
                "key": "11",
                "batchNo": "BATCH-20231105-05",
                "productionDate": "2023-11-05",
                "equipment": "TM-YJ-10",
                "material": "铅合金PbSb2",
                "process": "压力铸造",
                "quality": "合格",
                "operator": "孙志明"
            },
            {
                "key": "12",
                "batchNo": "BATCH-20231106-14",
                "productionDate": "2023-11-06",
                "equipment": "TM-YJ-01",
                "material": "球墨铸铁QT500",
                "process": "砂型铸造",
                "quality": "不合格",
                "operator": "钱学林"
            },
            {
                "key": "13",
                "batchNo": "BATCH-20231107-08",
                "productionDate": "2023-11-07",
                "equipment": "TM-YJ-05",
                "material": "铝合金7075",
                "process": "压铸",
                "quality": "合格",
                "operator": "冯建军"
            },
            {
                "key": "14",
                "batchNo": "BATCH-20231108-16",
                "productionDate": "2023-11-08",
                "equipment": "TM-YJ-08",
                "material": "不锈钢316L",
                "process": "精密铸造",
                "quality": "不合格",
                "operator": "朱卫国"
            },
            {
                "key": "15",
                "batchNo": "BATCH-20231109-11",
                "productionDate": "2023-11-09",
                "equipment": "TM-YJ-11",
                "material": "铜合金C17200",
                "process": "连续铸造",
                "quality": "合格",
                "operator": "秦晓峰"
            },
            {
                "key": "16",
                "batchNo": "BATCH-20231110-19",
                "productionDate": "2023-11-10",
                "equipment": "TM-YJ-03",
                "material": "钛合金Ti-6Al-4V",
                "process": "真空铸造",
                "quality": "不合格",
                "operator": "何志伟"
            },
            {
                "key": "17",
                "batchNo": "BATCH-20231111-06",
                "productionDate": "2023-11-11",
                "equipment": "TM-YJ-06",
                "material": "镁合金AM60",
                "process": "低压铸造",
                "quality": "合格",
                "operator": "宋海涛"
            },
            {
                "key": "18",
                "batchNo": "BATCH-20231112-13",
                "productionDate": "2023-11-12",
                "equipment": "TM-YJ-09",
                "material": "镍基合金Hastelloy C276",
                "process": "离心铸造",
                "quality": "不合格",
                "operator": "林志强"
            },
            {
                "key": "19",
                "batchNo": "BATCH-20231113-17",
                "productionDate": "2023-11-13",
                "equipment": "TM-YJ-12",
                "material": "锌合金Zamak 3",
                "process": "重力铸造",
                "quality": "合格",
                "operator": "黄建国"
            },
            {
                "key": "20",
                "batchNo": "BATCH-20231114-20",
                "productionDate": "2023-11-14",
                "equipment": "TM-YJ-04",
                "material": "高速钢M2",
                "process": "消失模铸造",
                "quality": "不合格",
                "operator": "杨晓东"
            }
        ];
        if (batchNo) {
            return data.filter((item) => item.batchNo === batchNo);
        }
        return data
    }
}