import type { MaterialComposition, MaterialData, MaterialProperty } from "@/modules/research/types/home/MaterialDataBase";
import type { SearchFormData } from "@/modules/research/types/home/Search";
import { http } from '@/utils/request'
import type { BaseResponse, PageParams, PageResponse } from '@/types/api'
/**
 * 搜索材料
 * **/
export const searchMaterials = async (
  formData?: SearchFormData
): Promise<any> => {

  let reqFormData = {};
  if (formData && formData.type_key) {
    reqFormData = {
      baseTypeId: formData.type_key,
      hardness: {
        max: formData.HV.max,
        min: formData.HV.min
      },
      strength: {
        min: formData.MPa.min,
        max: formData.MPa.max
      },
      corrosionResistance: formData.resistance
    }
  }

  return http.post("/amorphous_alloys/filter", reqFormData);
};

export const getBastType = async () => {
  return http.get("/base_types/list")
}
/**
 * 分页搜索材料
 * **/
export function getListByPage(params: PageParams) {
  console.log({ params });

  return http.get<PageResponse<any>>("/amorphous_alloys/list", { params });
}