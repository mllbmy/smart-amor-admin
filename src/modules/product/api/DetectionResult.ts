import { formatDateTime } from "@/utils/tools"
import type { DetectionResultData, DetectionResultColumns } from "../types/DetectionResult"
export async function getDetectionResult(): Promise<DetectionResultData> {
    await new Promise((resolve) => setTimeout(resolve, 90));
    return getFakeData();
}
function getFakeData(): DetectionResultData {
    const database = [
        [
            {
                "title": "尺寸精度",
                "value": "0.5%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.008μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "不完整",
                "status": "fail"
            },
            {
                "title": "涂层厚度",
                "value": "不均匀",
                "status": "fail"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 520",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "1850 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "不合格",
                "status": "fail"
            },
            {
                "title": "微观结构",
                "value": "存在气孔",
                "status": "fail"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.3%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.005μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "完整",
                "status": "succeed"
            },
            {
                "title": "涂层厚度",
                "value": "均匀",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 480",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "2100 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "合格",
                "status": "succeed"
            },
            {
                "title": "微观结构",
                "value": "致密",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "1.2%",
                "status": "fail"
            },
            {
                "title": "表面粗糙度",
                "value": "0.025μm",
                "status": "fail"
            },
            {
                "title": "焊接质量",
                "value": "不完整",
                "status": "fail"
            },
            {
                "title": "涂层厚度",
                "value": "过薄",
                "status": "fail"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 320",
                "status": "fail"
            },
            {
                "title": "抗拉强度",
                "value": "1200 MPa",
                "status": "fail"
            },
            {
                "title": "耐腐蚀性",
                "value": "不合格",
                "status": "fail"
            },
            {
                "title": "微观结构",
                "value": "晶粒粗大",
                "status": "fail"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.8%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.012μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "不完整",
                "status": "fail"
            },
            {
                "title": "涂层厚度",
                "value": "均匀",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 580",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "1950 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "不合格",
                "status": "fail"
            },
            {
                "title": "微观结构",
                "value": "致密",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.4%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.006μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "完整",
                "status": "succeed"
            },
            {
                "title": "涂层厚度",
                "value": "不均匀",
                "status": "fail"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 450",
                "status": "fail"
            },
            {
                "title": "抗拉强度",
                "value": "1650 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "合格",
                "status": "succeed"
            },
            {
                "title": "微观结构",
                "value": "存在裂纹",
                "status": "fail"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.7%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.015μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "完整",
                "status": "succeed"
            },
            {
                "title": "涂层厚度",
                "value": "均匀",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 620",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "2300 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "优秀",
                "status": "succeed"
            },
            {
                "title": "微观结构",
                "value": "均匀细密",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "1.5%",
                "status": "fail"
            },
            {
                "title": "表面粗糙度",
                "value": "0.035μm",
                "status": "fail"
            },
            {
                "title": "焊接质量",
                "value": "不完整",
                "status": "fail"
            },
            {
                "title": "涂层厚度",
                "value": "过厚",
                "status": "fail"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 280",
                "status": "fail"
            },
            {
                "title": "抗拉强度",
                "value": "950 MPa",
                "status": "fail"
            },
            {
                "title": "耐腐蚀性",
                "value": "差",
                "status": "fail"
            },
            {
                "title": "微观结构",
                "value": "疏松多孔",
                "status": "fail"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.6%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.009μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "不完整",
                "status": "fail"
            },
            {
                "title": "涂层厚度",
                "value": "均匀",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 510",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "1800 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "不合格",
                "status": "fail"
            },
            {
                "title": "微观结构",
                "value": "致密",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.2%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.003μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "完整",
                "status": "succeed"
            },
            {
                "title": "涂层厚度",
                "value": "不均匀",
                "status": "fail"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 490",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "1750 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "合格",
                "status": "succeed"
            },
            {
                "title": "微观结构",
                "value": "存在夹杂",
                "status": "fail"
            }
        ],
        [
            {
                "title": "尺寸精度",
                "value": "0.9%",
                "status": "succeed"
            },
            {
                "title": "表面粗糙度",
                "value": "0.018μm",
                "status": "succeed"
            },
            {
                "title": "焊接质量",
                "value": "完整",
                "status": "succeed"
            },
            {
                "title": "涂层厚度",
                "value": "均匀",
                "status": "succeed"
            }
        ],
        [
            {
                "title": "硬度测试",
                "value": "HV 670",
                "status": "succeed"
            },
            {
                "title": "抗拉强度",
                "value": "2450 MPa",
                "status": "succeed"
            },
            {
                "title": "耐腐蚀性",
                "value": "优秀",
                "status": "succeed"
            },
            {
                "title": "微观结构",
                "value": "均匀细密",
                "status": "succeed"
            }
        ]
    ]
    return {
        date: formatDateTime(new Date()),
        columns: database[Math.floor(Math.random() * database.length)] as DetectionResultColumns[]
    }
}
