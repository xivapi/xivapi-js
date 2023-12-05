import { CharacterSearchResult } from "./character";
import { SearchParams, SearchResult } from "./search";

export interface CWLSearchParams extends SearchParams {}

export interface CWLSearchResult extends SearchResult {
  Results: {
    Crest: string[];
    ID: string;
    Name: string;
    Server: string;
  }[];
}

export interface CWLGetResult {
  CWL: {
    ID: string;
    Pagination: SearchResult["Pagination"];
    Profile: {
      Name: string;
    };
    Results: CharacterSearchResult["Results"];
  };
}
