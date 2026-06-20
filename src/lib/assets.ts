import * as Models from "../models.js";
import { CustomError, request } from "../utils.js";

/**
 * Endpoints for accessing game data on a file-by-file basis. Commonly useful for fetching icons or other textures to display on the web.
 * @see https://v2.xivapi.com/api/docs#tag/assets
 */
export class Assets {
  /**
   * Read an asset from the game at the specified path, converting it into a usable format. If no valid conversion between the game file type and specified format exists, an error will be returned.
   * @param {Models.AssetQuery} params Query parameters accepted by the asset endpoint.
   * @returns {Promise<Buffer>} An image of the asset.
   * @see https://v2.xivapi.com/api/docs#tag/assets/get/asset
   */
  async get(params: Models.AssetQuery): Promise<Buffer> {
    const { data, errors } = await request({
      path: "/asset",
      params: params as unknown as Record<string, unknown>,
    });
    if (errors) throw new CustomError(errors[0].message);
    return data as Buffer;
  }

  /**
   * Retrieve the specified map, composing it from split source files if necessary.
   * @param {string} territory Territory of the map to be retrieved. This typically takes the form of 4 characters, [letter][number][letter][number]. See Map's Id field for examples of possible combinations of `territory` and `index`.
   * @param {string} index Index of the map within the territory. This invariably takes the form of a two-digit zero-padded number. See Map's Id field for examples of possible combinations of `territory` and `index`.
   * @param {Models.MapPath & Models.VersionQuery & Models.AssetQuery} params
   * @returns {Promise<Buffer>} An image of the map.
   * @see https://v2.xivapi.com/api/docs#tag/assets/get/asset/map/{territory}/{index}
   */
  async map(
    territory: string,
    index: string,
    params: Models.VersionQuery
  ): Promise<Buffer> {
    const { data, errors } = await request({
      path: `/asset/map/${territory}/${index}`,
      params: params as unknown as Record<string, unknown>,
    });
    /* v8 ignore if -- @preserve */
    if (errors) throw new CustomError(errors[0].message);
    return data as Buffer;
  }
}
