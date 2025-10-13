import type {Models} from "..";
import { CustomError, request } from "../utils";

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
    const { data, errors } = await request({ path: "/asset", params });
    if (errors) throw new CustomError(errors[0].message);
    return data as Buffer;
  }

  /**
   * Retrieve the specified map, composing it from split source files if necessary.
   * @param {Models.MapPath & Models.VersionQuery & Models.AssetQuery} params
   * @returns {Promise<Buffer>} An image of the map.
   * @see https://v2.xivapi.com/api/docs#tag/assets/get/asset/map/{territory}/{index}
   */
  async map(params: Models.MapPath & Models.VersionQuery & Pick<Models.AssetQuery, 'format'>): Promise<Buffer> {
    const { data, errors } = await request({ path: "/asset/map", params });
    if (errors) throw new CustomError(errors[0].message);
    return data as Buffer;
  }
}
