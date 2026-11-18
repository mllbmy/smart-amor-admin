export interface SearchFormData {
  value: string;
}
export interface SearchResult {
  recommendedResultName: string;
  suggestion: string;
  details: Array<{
    property: string;
    value: string;
    reference: string;
    hightlight: boolean;
  }>;
}
