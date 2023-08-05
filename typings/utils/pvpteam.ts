import { CharacterSearchResult } from "./character";
import { SearchParams, SearchResult } from "./search";

export interface PvPTeamSearchParams extends SearchParams {}

export interface PvPTeamSearchResult extends SearchResult {
  Results: {
    Crest: string[];
    ID: string;
    Name: string;
    Server: string;
  }[];
}

export interface PvPTeamGetResult {
  PvPTeam: {
    ID: string;
    Pagination: SearchResult["Pagination"];
    Profile: {
      Crest: string[];
      Name: string;
      Server: string;
    };
    Results: CharacterSearchResult["Results"];
  };
}
