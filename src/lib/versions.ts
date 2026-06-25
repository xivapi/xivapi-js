import type * as Models from "../models.js";
import { CustomError, request } from "../utils.js";

/**
 * Endpoints for querying metadata about the versions recorded by the boilmaster system.
 * @see https://v2.xivapi.com/api/docs#tag/versions
 */
export class Versions {
  /**
   * List versions understood by the API.
   * @returns {Promise<Models.VersionsResponse>}
   * @see https://v2.xivapi.com/api/docs#tag/versions/get/version
   */
  async all(): Promise<Models.VersionsResponse> {
    const { data, errors } = await request({ path: "/version", params: {} });
    /* v8 ignore if -- @preserve */
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.VersionsResponse;
  }
}
