import {
  CharacterGetParams,
  CharacterGetResult,
  CharacterSearchParams,
  CharacterSearchResult,
  FreeCompanyGetParams,
  FreeCompanyGetResult,
  FreeCompanySearchParams,
  FreeCompanySearchResult,
  LinkshellGetResult,
  LinkshellSearchParams,
  LinkshellSearchResult,
  CWLGetResult,
  CWLSearchParams,
  CWLSearchResult,
  PvPTeamGetResult,
  PvPTeamSearchParams,
  PvPTeamSearchResult,
  SearchIndexResult,
  SearchIndexes,
  SearchResult,
} from "./utils";
export * from "./utils";

declare module "@xivapi/js" {
  type StringAlgo =
    | "custom"
    | "wildcard"
    | "wildcard_plus"
    | "fuzzy"
    | "term"
    | "prefix"
    | "match"
    | "match_phrase"
    | "match_phrase_prefix"
    | "multi_match"
    | "query_string";

  interface XIVAPIOptions {
    private_key?: string;
    language?: "en" | "de" | "fr" | "ja" | "cn" | "ko";
    snake_case?: boolean;
    staging?: boolean;
    verbose?: boolean;
  }

  interface DataSearchParams {
    /**
     * Search a specific series of indexes separated by commas.
     */
    indexes: SearchIndexes[];

    /**
     * Search for lore! This is a special built search endpoint which searches a string through various lore specific content.
     * @see https://xivapi.com/docs/Search#lore
     */
    lore?: boolean;

    /**
     * The column to use in string searches.
     * @see https://xivapi.com/docs/Search#filters
     */
    filters?: string | string[];

    /**
     * The search algorithm to use for string matching.
     * @default "wildcard"
     * @see https://xivapi.com/docs/Search
     */
    string_algo?: StringAlgo;

    /**
     * The column to use in string searches.
     */
    string_column?: string;

    /**
     * Limit the number of results to show. (from 1 to 100)
     */
    limit?: number;
  }

  export default class XIVAPI {
    private readonly options: XIVAPIOptions;
    private readonly endpoint: string;
    private readonly globalParams: { [key: string]: string | number };

    constructor(options: string | XIVAPIOptions);
    constructor(options: string | XIVAPIOptions, legacyOptions?: XIVAPIOptions);

    /**
     * XIVAPI provides the ability to quickly search all game content via Elasticsearch.
     * This search endpoint only searches game content and not: characters, free companies, linkshells or pvp teams.
     * Those have their own dedicated search endpoints as they relay to Lodestone.
     * @since 0.4.2
     * @see https://xivapi.com/docs/Search
     * @example
     * ```ts
     * const xiv = new XIVAPI();
     * await xiv.search("aiming"); // without params
     * await xiv.search("aiming", { indexes: ["Item", "Recipe"] }); // with params
     * ```
     */
    public search(
      input: string,
      params?: DataSearchParams
    ): Promise<SearchIndexResult>;

    /**
     * Obtain game content data of Final Fantasy XIV.
     * @since 0.4.2
     * @see https://xivapi.com/docs/Game-Data
     */
    public data: {
      /**
       * Returns information about a specific object including extended information.
       * @since 0.4.2
       * @see https://xivapi.com/docs/Game-Data
       * @example
       * ```ts
       * const xiv = new XIVAPI();
       * await xiv.data.get("Item", 1673);
       * ```
       */
      get: (name: string, id: string | number) => Promise<{ [key: string]: any }>;

      /**
       * Obtain game content data of Final Fantasy XIV.
       * @since 0.4.2
       * @see https://xivapi.com/docs/Game-Data
       * @example
       * ```ts
       * const xiv = new XIVAPI();
       * await xiv.data.list("Item", { limit: 100 }); // with limit param
       * await xiv.data.list("Item", { ids: [1673, 1674] }); // with ids param
       * ```
       */
      list: (
        name: keyof typeof SearchIndexes,
        params?: {
          /**
           * Limit the number of items returned by the API.
           * @min 100
           * @max 3000
           */
          limit?: number;

          /**
           * Filter the ids down if you want data for a specific series of items.
           */
          ids?: number[];
        }
      ) => Promise<SearchIndexResult>;

      /**
       * Returns information about a specific object including extended information.
       * @since 0.4.2
       * @see https://xivapi.com/docs/Game-Data#servers
       */
      servers: () => Promise<string[]>;

      /**
       * Another list of servers grouped by their data center.
       * @since 0.4.2
       * @see https://xivapi.com/docs/Game-Data#data-center
       */
      datacenters: () => Promise<{ [key: string]: string[] }>;
    };

    /**
     * Search and retrieve character data from The Lodestone. Providing useful information such as character profile data, minions and mounts obtained, achievements obtained and their relative dates. Character friends, their free company, pvp team and much more!
     * @since 0.4.2
     * @see https://xivapi.com/docs/Character
     */
    public character: {
      search: (name: string, params?: CharacterSearchParams) => Promise<CharacterSearchResult>;
      get: (id: string | number, params?: CharacterGetParams) => Promise<CharacterGetResult>;
    };

    /**
     * Search and retrieve Free Company data from The Lodestone, provides useful information such as profile information and member lists.
     * @since 0.4.2
     * @see https://xivapi.com/docs/Free-Company
     */
    public freecompany: {
      search: (name: string, params?: FreeCompanySearchParams) => Promise<FreeCompanySearchResult>;
      get: (id: string | number, params?: FreeCompanyGetParams) => Promise<FreeCompanyGetResult>;
    };

    /**
     * Search and retrieve Linkshell data from The Lodestone.
     * @since 0.4.2
     * @see https://xivapi.com/docs/Linkshell
     */
    public linkshell: {
      search: (name: string, params?: LinkshellSearchParams) => Promise<LinkshellSearchResult>;
      get: (id: string | number) => Promise<LinkshellGetResult>;
    };

    /**
     * Search and retrieve CWL data from The Lodestone.
     * @since 0.4.4
     * @see https://xivapi.com/docs/Linkshell
     */
    public cwl: {
      search: (name: string, params?: CWLSearchParams) => Promise<CWLSearchResult>;
      get: (id: string | number) => Promise<CWLGetResult>;
    };

    /**
     * Search and retrieve PVP Team data from The Lodestone.
     * @since 0.4.2
     * @see https://xivapi.com/docs/PvP-Team
     */
    public pvpteam: {
      search: (name: string, params?: PvPTeamSearchParams) => Promise<PvPTeamSearchResult>;
      get: (id: string | number) => Promise<PvPTeamGetResult>;
    };
  }
}
