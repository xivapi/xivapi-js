import { SearchParams, SearchResult } from "./search";

export interface FreeCompanySearchParams extends SearchParams {}
export interface FreeCompanyGetParams {
  /**
   * If set to 1, the API will return more data in the response by extending out the data IDs to useful objects.
   */
  extended?: 1;

  /**
   * By default the `Character`, `ClassJobs`, `Minion` and `Mount` data will return, you can request more data using the `data` query.
   * @see https://xivapi.com/docs/Character#character
   */
  data?: ["FCM"];
}

export interface FreeCompanySearchResult extends SearchResult {
  Results: {
    Crest: string[];
    ID: string;
    Name: string;
    Server: string;
  }[];
}

export interface FreeCompanyGetResult {
  Active: string;
  ActiveMemberCount: number;
  Crest: string[];
  DC: string;
  Estate: {
    Greeting: string;
    Name: string;
    Plot: string;
  };
  Focus: { Icon: string; Name: string; Status: boolean }[];
  Formed: number;
  GrandCompany: "Maelstrom" | "Order of the Twin Adder" | "Immortal Flames";
  ID: string;
  Name: string;
  ParseDate: number;
  Rank: string;
  Rankings: {
    Monthly: number;
    Weekly: number;
  };
  Recruitment: string;
  Reputation: [
    { Name: string; Progress: number; Rank: number },
    { Name: string; Progress: number; Rank: number },
    { Name: string; Progress: number; Rank: number }
  ];
  Seeking: { Icon: string; Name: string; Status: boolean }[];
  Server: string;
  Slogan: string;
  Tag: string;
}
