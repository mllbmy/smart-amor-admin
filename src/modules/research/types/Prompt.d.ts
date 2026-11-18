import type { SearchResult as RecommendSearchResult } from "./recommend/Search";
import type { SearchResult as OptimizeSearchResult } from "./optimize/Search";

export interface Prompt {
  id: string;
  content: string;
  subtitle: string;
}
export interface PromptsResult {
  id: number;
  prompt_id: string;
  resultData: RecommendSearchResult | OptimizeSearchResult;
}
