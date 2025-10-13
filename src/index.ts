export * from "./lib/assets";
export * from "./lib/search";
export * from "./lib/sheets";
export * from "./lib/versions";

export namespace XIVAPI {
  export interface Options {
    /**
     * Language to use for the API.
     */
    language?: keyof typeof Models.SchemaLanguage;
    /**
     * Whether to enable verbose logging.
     * @default false
     */
    verbose?: boolean;
  }
}

/**
 * Models are used to define the structure of the data returned by the API.
 * @see https://v2.xivapi.com/api/docs#models
 */
export namespace Models {
  /**
   * Query parameters accepted by endpoints that interact with versioned game data.
   * @see https://v2.xivapi.com/api/docs#model/versionquery
   */
  export interface VersionQuery {
    /**
     * Game version to utilise for this query.
     */
    version?: string | null;
  }

  /**
   * Query parameters accepted by the asset endpoint.
   * @see https://v2.xivapi.com/api/docs#model/assetquery
   */
  export interface AssetQuery {
    format: string | SchemaFormat;
    /**
     * Game path of the asset to retrieve.
     * @example "ui/icon/051000/051474_hr1.tex"
     */
    path: string;
  }

  /**
   * @see https://v2.xivapi.com/api/docs#model/schemaformat
   */
  export enum SchemaFormat {
    jpg = "jpg",
    png = "png",
    webp = "webp",
  }

  /**
   * General purpose error response structure.
   * @see https://v2.xivapi.com/api/docs#model/errorresponse
   */
  export interface ErrorResponse {
    code: number;
    /**
     * Description of what went wrong.
     */
    message: string;
  }

  /**
   * @see https://v2.xivapi.com/api/docs#model/statuscode
   */
  export type StatusCode = number;

  /**
   * Path segments expected by the asset map endpoint.
   * @see https://v2.xivapi.com/api/docs#model/mappath
   */
  export interface MapPath {
    /**
     * Index of the map within the territory. This invariably takes the form of a two-digit zero-padded number. See Map's Id field for examples of possible combinations of `territory` and `index`.
     * @example "00"
     */
    index: string;
    /**
     * Territory of the map to be retrieved. This typically takes the form of 4 characters, [letter][number][letter][number]. See Map's Id field for examples of possible combinations of `territory` and `index`.
     * @example "s1d1"
     */
    territory: string;
  }

  /**
   * Query paramters accepted by the search endpoint.
   * @see https://v2.xivapi.com/api/docs#model/searchquery
   */
  export interface SearchQuery {
    /**
     * Continuation token to retrieve further results from a prior search request. If specified, takes priority over query.
     */
    cursor?: string | null;
    /**
     * Maximum number of rows to return. To paginate, provide the cursor token provided in `next` to the `cursor` parameter.
     */
    limit?: number | null;
    /**
     * A query string for searching excel data.
     * Queries are formed of clauses, which take the basic form of `[specifier][operation][value]`, i.e. `Name="Example"`. Multiple clauses may be specified by seperating them with whitespace, i.e. `Foo=1 Bar=2`.
     * @see https://v2.xivapi.com/docs/guides/search/#query
     */
    query?: QueryString;
    /**
     * List of excel sheets that the query should be run against. At least one must be specified if not querying a cursor.
     */
    sheets?: string | null;
  }

  /**
   * A query string for searching excel data.
   * Queries are formed of clauses, which take the basic form of `[specifier][operation][value]`, i.e. `Name="Example"`. Multiple clauses may be specified by seperating them with whitespace, i.e. `Foo=1 Bar=2`.
   * @see https://v2.xivapi.com/api/docs#model/querystring
   */
  export type QueryString = string | null;

  /**
   * Query parameters accepted by endpoints that retrieve excel row data.
   * @see https://v2.xivapi.com/api/docs#model/rowreaderquery
   */
  export interface RowReaderQuery {
    /**
     * A filter string for selecting fields within a row.
     * Filters are comprised of a comma-seperated list of field paths, i.e. `a,b` will select the fields `a` and `b`.
     */
    fields?: FilterString | null;
    /**
     * Known languages supported by the game data format. **NOTE:** Not all languages that are supported by the format are valid for all editions of the game. For example, the global game client acknowledges the existence of `chs` and `kr`, however does not provide any data for them.
     */
    language?: string | SchemaLanguage | null;
    /**
     * Schema that row data should be read with.
     */
    schema?: SchemaSpecifier | null;
    /**
     * A filter string for selecting fields within a row.
     * Filters are comprised of a comma-seperated list of field paths, i.e. `a,b` will select the fields `a` and `b`.
     */
    transient?: FilterString | null;
  }

  /**
   * Known languages supported by the game data format. **NOTE:** Not all languages that are supported by the format are valid for all editions of the game. For example, the global game client acknowledges the existence of `chs` and `kr`, however does not provide any data for them.
   * @see https://v2.xivapi.com/api/docs#model/schemalanguage
   */
  export enum SchemaLanguage {
    none = "none",
    en = "en",
    ja = "ja",
    de = "de",
    fr = "fr",
    chs = "chs",
    cht = "cht",
    kr = "kr",
  }

  /**
   * @see https://v2.xivapi.com/api/docs#model/schemaspecifier
   */
  export type SchemaSpecifier = string; // `^.+(@.+)?$`

  /**
   * A filter string for selecting fields within a row.
   * Filters are comprised of a comma-seperated list of field paths, i.e. `a,b` will select the fields `a` and `b`.
   * @see https://v2.xivapi.com/api/docs#model/filterstring
   */
  export type FilterString = string;

  /**
   * Response structure for the search endpoint.
   * @see https://v2.xivapi.com/api/docs#model/searchresponse
   */
  export interface SearchResponse {
    results: SearchResult[];
    schema: SchemaSpecifier;
    next?: string | null;
  }

  /**
   * Result found by a search query, hydrated with data from the underlying excel row the result represents.
   * @see https://v2.xivapi.com/api/docs#model/searchresult
   */
  export interface SearchResult {
    fields: object;
    /**
     * ID of this row.
     */
    row_id: number;
    /**
     * Relevance score for this entry.
     * These values only loosely represent the relevance of an entry to the search query. No guarantee is given that the discrete values, nor resulting sort order, will remain stable.
     */
    score: number;
    /**
     * Excel sheet this result was found in.
     */
    sheet: SchemaSpecifier;
    /**
     * Subrow ID of this row, when relevant.
     */
    subrow_id?: number;
    /**
     * Field values for this row's transient row, if any is present, according to the current schema and transient filter.
     */
    transient?: object;
  }

  /**
   * Response structure for the list endpoint.
   * @see https://v2.xivapi.com/api/docs#model/listresponse
   */
  export interface ListResponse {
    /**
     * Array of sheets known to the API.
     * Metadata about a single sheet.
     */
    sheets: SheetMetadata[];
  }

  /**
   * Metadata about a single sheet.
   * @see https://v2.xivapi.com/api/docs#model/sheetmetadata
   */
  export interface SheetMetadata {
    /**
     * The name of the sheet.
     */
    name: string;
  }

  /**
   * Path variables accepted by the sheet endpoint.
   * @see https://v2.xivapi.com/api/docs#model/sheetpath
   */
  export interface SheetPath {
    /**
     * Name of the sheet to read.
     */
    sheet: SchemaSpecifier;
  }

  /**
   * Query parameters accepted by the sheet endpoint.
   * @see https://v2.xivapi.com/api/docs#model/sheetquery
   */
  export interface SheetQuery {
    /**
     * Fetch rows after the specified row. Behavior is undefined if both `rows` and `after` are provided.
     */
    after?: SchemaSpecifier | null;
    /**
     * Maximum number of rows to return. To paginate, provide the last returned row to the next request's `after` parameter.
     */
    limit?: number | null;
    /**
     * Rows to fetch from the sheet, as a comma-separated list. Behavior is undefined if both `rows` and `after` are provided.
     */
    rows?: string; // `^\d+(:\d+)?(,\d+(:\d+)?)*$`
  }

  /**
   * @see https://v2.xivapi.com/api/docs#model/rowspecifier
   */
  export type RowSpecifier = string; // `^\d+(:\d+)?$`

  /**
   * Response structure for the sheet endpoint.
   * @see https://v2.xivapi.com/api/docs#model/sheetresponse
   */
  export interface SheetResponse {
    /**
     * Array of rows retrieved by the query.
     * @see https://v2.xivapi.com/api/docs#model/rowresult
     */
    rows: RowResult[];
    /**
     * The canonical specifier for the schema used in this response.
     */
    schema: SchemaSpecifier;
  }

  /**
   * Row retrieved by the query.
   * @see https://v2.xivapi.com/api/docs#model/rowresult
   */
  export interface RowResult {
    fields: object;
    /**
     * ID of this row.
     */
    row_id: number;
    /**
     * Subrow ID of this row, when relevant.
     */
    subrow_id?: number | null;
    /**
     * Field values for this row's transient row, if any is present, according to the current schema and transient filter.
     */
    transient?: object;
  }

  /**
   * Path variables accepted by the row endpoint.
   * @see https://v2.xivapi.com/api/docs#model/rowpath
   */
  export interface RowPath {
    row: RowSpecifier;
    /**
     * Name of the sheet to read.
     */
    sheet: SchemaSpecifier;
  }

  /**
   * Response structure for the row endpoint.
   * @see https://v2.xivapi.com/api/docs#model/rowresponse
   */
  export interface RowResponse {
    fields: object;
    /**
     * ID of this row.
     */
    row_id: number;
    /**
     * The canonical specifier for the schema used in this response.
     */
    schema: SchemaSpecifier;
    /**
     * Subrow ID of this row, when relevant.
     */
    subrow_id?: number | null;
    /**
     * Field values for this row's transient row, if any is present, according to the current schema and transient filter.
     */
    transient?: object;
  }

  /**
   * Response structure for the versions endpoint.
   * @see https://v2.xivapi.com/api/docs#model/versionsresponse
   */
  export interface VersionsResponse {
    /**
     * Array of versions available in the API.
     * Metadata about a single version supported by the API.
     */
    versions: VersionMetadata[];
  }

  /**
   * Metadata about a single version supported by the API.
   * @see https://v2.xivapi.com/api/docs#model/versionmetadata
   */
  export interface VersionMetadata {
    /**
     * Names associated with this version. Version names specified here are accepted by the `version` query parameter throughout the API.
     */
    names: string[];
  }
}
