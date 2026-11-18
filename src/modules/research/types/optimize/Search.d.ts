export interface SearchFormData {
  value: string;
  isHistorical: boolean;
}
export interface SearchResult {
  // resultId: string;
  arguments: Array<{
    property: string;
    value: string;
    unit: string;
  }>;
  predict: Array<{
    property: string;
    value: string;
    check: boolean;
  }>;
  suggestion?: string;
}
