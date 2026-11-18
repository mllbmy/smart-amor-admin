// 定义基体类型接口
export interface DataType {
  id: number;
  value: string;
  label: string;
  description: string;
  density: number;
  thermalConductivity: number;
  color: string;
}

// 定义搜索输入项接口
export interface SearchInput {
  id: number;
  value: string;
  label: string;
  type: string;
  placeholder: string;
}

// 定义搜索表单数据接口
export interface SearchFormData {
  type_key: string;
  MPa: {
    min: number | null;
    max: number | null;
  };
  HV: {
    min: number | null;
    max: number | null;
  };
  resistance: number | null;
}
// 模拟搜索结果接口
export interface SearchResult {
  id: string;
  name: string;
  materialType: string;
  strength: number;
  hardness: number;
  corrosionResistance: number;
  details: string;
}
