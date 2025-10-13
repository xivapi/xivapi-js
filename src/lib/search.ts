import type { Models, XIVAPI } from "..";
import { CustomError, request } from "../utils";

/**
 * Endpoints for seaching and filtering the game's static relational data store.
 * @see https://v2.xivapi.com/api/docs#tag/search
 */
export class Search {
  private readonly options: XIVAPI.Options;

  constructor(
    options: XIVAPI.Options = {
      language: "en",
      verbose: false,
    }
  ) {
    this.options = options;
  }

  /**
   * Fetch information about rows and their related data that match the provided search query.
   * @param {Models.SearchQuery} params Query paramters accepted by the search endpoint.
   * @returns {Promise<Models.SearchResponse>} Response structure for the search endpoint.
   * @see https://v2.xivapi.com/api/docs#tag/search/get/search
   */
  async get(params: Models.SearchQuery): Promise<Models.SearchResponse> {
    const { data, errors } = await request({ path: "/search", params, options: this.options });
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.SearchResponse;
  }
}
