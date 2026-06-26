import { Assets } from "./lib/assets.js";
import { Sheet, Sheets } from "./lib/sheets.js";
import { Versions } from "./lib/versions.js";
import * as Models from "./models.js";
import { CustomError, request } from "./utils.js";

export default class XIVAPI {
  public readonly options: XIVAPIOptions;

  public readonly achievements: Sheet<"Achievement">;
  public readonly minions: Sheet<"Companion">;
  public readonly mounts: Sheet<"Mount">;
  public readonly items: Sheet<"Item">;

  /**
   * Raw endpoints for the API. Please consider using the typed endpoints instead.
   * @see https://v2.xivapi.com/api/docs
   * @since 0.5.0
   */
  public readonly data = {
    /**
     * @see https://v2.xivapi.com/api/docs#tag/sheets
     * @since 0.5.0
     */
    sheets: () => new Sheets(this.options),
    /**
     * @see https://v2.xivapi.com/api/docs#tag/versions
     * @since 0.5.0
     */
    versions: () =>
      new Versions()
        .all()
        .then((versions) =>
          versions.versions.map((version) => version.names[0])
        ),
    /**
     * @see https://v2.xivapi.com/api/docs#tag/assets
     * @since 0.5.0
     */
    assets: () => new Assets(),
  };

  /**
   * A wrapper for the XIVAPI v2 API.
   * @param {XIVAPIOptions} [options] The client options to fetch with.
   * @see https://v2.xivapi.com/api/docs
   * @since 0.5.0
   */
  constructor(
    options: XIVAPIOptions = {
      version: "latest",
      language: "en",
      verbose: false,
    }
  ) {
    this.achievements = new Sheet("Achievement", options);
    this.minions = new Sheet("Companion", options);
    this.mounts = new Sheet("Mount", options);
    this.items = new Sheet("Item", options);

    this.options = options;
  }

  /**
   * Fetch information about rows and their related data that match the provided search query.
   * @param {SearchParams} params Query paramters accepted by the search endpoint.
   * @returns {Promise<Models.SearchResponse>} Response structure for the search endpoint.
   * @see https://v2.xivapi.com/api/docs#tag/search/get/search
   * @since 0.5.0
   */
  public async search(params: SearchParams): Promise<Models.SearchResponse> {
    const { data, errors } = await request({
      path: "/search",
      params: params as Record<string, unknown>,
    });
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.SearchResponse;
  }
}

export interface XIVAPIOptions {
  /**
   * The supported version of the game to use for the API.
   * @default "latest"
   */
  version?: string;
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

/**
 * Query parameters accepted by the search endpoint.
 * @see https://v2.xivapi.com/api/docs#tag/search/get/search
 */
export type SearchParams = Models.SearchQuery &
  Models.VersionQuery &
  Models.RowReaderQuery & { verbose?: boolean };

export { Models, XIVAPI };
