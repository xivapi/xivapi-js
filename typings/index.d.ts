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

  type Servers =
    | "Adamantine"
    | "Aegis"
    | "Alexander"
    | "Anima"
    | "Asura"
    | "Atomos"
    | "Bahamut"
    | "Balmung"
    | "Behemoth"
    | "Belias"
    | "Brynhildr"
    | "Cactuar"
    | "Carbuncle"
    | "Cerberus"
    | "Chocobo"
    | "Coeurl"
    | "Diabolos"
    | "Durandal"
    | "Excalibur"
    | "Exodus"
    | "Faerie"
    | "Famfrit"
    | "Fenrir"
    | "Garuda"
    | "Gilgamesh"
    | "Goblin"
    | "Gungnir"
    | "Hades"
    | "Hyperion"
    | "Ifrit"
    | "Ixion"
    | "Jenova"
    | "Kujata"
    | "Lamia"
    | "Leviathan"
    | "Lich"
    | "Louisoix"
    | "Malboro"
    | "Mandragora"
    | "Masamune"
    | "Mateus"
    | "Midgardsormr"
    | "Moogle"
    | "Odin"
    | "Omega"
    | "Pandaemonium"
    | "Phoenix"
    | "Ragnarok"
    | "Ramuh"
    | "Ridill"
    | "Sargatanas"
    | "Shinryu"
    | "Shiva"
    | "Siren"
    | "Tiamat"
    | "Titan"
    | "Tonberry"
    | "Typhon"
    | "Ultima"
    | "Ultros"
    | "Unicorn"
    | "Valefor"
    | "Yojimbo"
    | "Zalera"
    | "Zeromus"
    | "Zodiark"
    | "Spriggan"
    | "Twintania"
    | "Bismarck"
    | "Ravana"
    | "Sephirot"
    | "Sophia"
    | "Zurvan"
    | "Halicarnassus"
    | "Maduin"
    | "Marilith"
    | "Seraph"
    | "HongYuHai"
    | "ShenYiZhiDi"
    | "LaNuoXiYa"
    | "HuanYingQunDao"
    | "MengYaChi"
    | "YuZhouHeYin"
    | "WoXianXiRan"
    | "ChenXiWangZuo"
    | "BaiYinXiang"
    | "BaiJinHuanXiang"
    | "ShenQuanHen"
    | "ChaoFengTing"
    | "LvRenZhanQiao"
    | "FuXiaoZhiJian"
    | "Longchaoshendian"
    | "MengYuBaoJing"
    | "ZiShuiZhanQiao"
    | "YanXia"
    | "JingYuZhuangYuan"
    | "MoDuNa"
    | "HaiMaoChaWu"
    | "RouFengHaiWan"
    | "HuPoYuan"
    | "ShuiJingTa2"
    | "YinLeiHu2"
    | "TaiYangHaiAn2"
    | "YiXiuJiaDe2"
    | "HongChaChuan2"
    | "Alpha"
    | "Phantom"
    | "Raiden"
    | "Sagittarius";

  interface XIVAPIOptions {
    private_key?: string;
    language?: "en" | "de" | "fr" | "ja" | "cn" | "ko";
    snake_case?: boolean;
    staging?: boolean;
    verbose?: boolean;
  }

  interface SearchResponse {
    Pagination: {
      Page: number;
      PageNext: number;
      PagePrev: number | null;
      PageTotal: number;
      Results: number;
      ResultsPerPage: number;
      ResultsTotal: number;
    };
    Results: unknown[];
  }

  interface SearchParams {
    /**
     * The name to search for, you can use `+` for spaces or let the API handle it for you.
     */
    name?: string;

    /**
     * The server to search against, this is case sensitive.
     * @see https://xivapi.com/servers
     */
    server?: Servers;

    /**
     * Search or move to a specific page.
     */
    page?: number;
  }

  interface DataSearchParams {
    /**
     * Search a specific series of indexes separated by commas.
     */
    indexes: [
      | "Achievement"
      | "Title"
      | "Action"
      | "CraftAction"
      | "Trait"
      | "PvPAction"
      | "PvPTrait"
      | "Status"
      | "BNpcName"
      | "ENpcResident"
      | "Companion"
      | "Mount"
      | "Leve"
      | "Emote"
      | "InstanceContent"
      | "Item"
      | "Recipe"
      | "Fate"
      | "Quest"
      | "ContentFinderCondition"
      | "Balloon"
      | "BuddyEquip"
      | "Orchestrion"
      | "PlaceName"
      | "Weather"
      | "World"
      | "Map"
      | "lore_finder"
    ];

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

  export default class XIVAPI<T = { [key: string]: any }> {
    public readonly options: XIVAPIOptions;
    public readonly endpoint: string;
    public readonly globalParams: { [key: string]: string | number };

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
    public search(input: string, params?: DataSearchParams): Promise<SearchResponse>;

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
      get: (name: string, id: number) => Promise<T>;

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
        name: string,
        params: {
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
      ) => Promise<SearchResponse>;

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
      search: (name: string, params?: SearchParams) => Promise<SearchResponse>;
      get: (
        id: number,
        params?: {
          /**
           * If set to 1, the API will return more data in the response by extending out the data IDs to useful objects.
           */
          extended?: 1;

          /**
           * By default the `Character`, `ClassJobs`, `Minion` and `Mount` data will return, you can request more data using the `data` query.
           * @see https://xivapi.com/docs/Character#character
           */
          data?: ("AC" | "FR" | "FC" | "FC" | "FCM" | "MIMO" | "PVP")[];
        }
      ) => Promise<T>;
    };

    /**
     * Search and retrieve Free Company data from The Lodestone, provides useful information such as profile information and member lists.
     * @since 0.4.2
     * @see https://xivapi.com/docs/Free-Company
     */
    public freecompany: {
      search: (name: string, params?: SearchParams) => Promise<SearchResponse>;
      get: (
        id: number,
        params?: {
          /**
           * If set to 1, the API will return more data in the response by extending out the data IDs to useful objects.
           */
          extended?: 1;

          /**
           * By default only the `FreeCompany` data will return, you can request more data using the `data` query.
           * @see https://xivapi.com/docs/Free-Company#free-company
           */
          data?: ["FCM"];
        }
      ) => Promise<T>;
    };

    /**
     * Search and retrieve Linkshell data from The Lodestone.
     * @since 0.4.2
     * @see https://xivapi.com/docs/Linkshell
     */
    public linkshell: {
      search: (name: string, params?: SearchParams) => Promise<SearchResponse>;
      get: (id: number) => Promise<T>;
    };

    /**
     * Search and retrieve PVP Team data from The Lodestone.
     * @since 0.4.2
     * @see https://xivapi.com/docs/PvP-Team
     */
    public pvpteam: {
      search: (name: string, params?: SearchParams) => Promise<SearchResponse>;
      get: (id: number) => Promise<T>;
    };
  }
}
