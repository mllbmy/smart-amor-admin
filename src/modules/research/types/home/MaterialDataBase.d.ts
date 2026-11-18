export interface MaterialProperty {
  strength: number;
  hardness: number;
  corrosion_resistance: number;
}

export interface MaterialComposition {
  [key: string]: string;
}

export interface MaterialData {
  id: string;
  name: string;
  version: string;
  base_type: string;
  formula: string;
  composition: MaterialComposition;
  properties: MaterialProperty;
  hasCompareButton: boolean;
}

export interface MaterialResData {
  id: string;
  name: string;
  version: string;
  base_type_id: number;
  formula: string;
  composition: MaterialComposition;
  properties: MaterialProperty;
}