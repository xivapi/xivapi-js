import type {Models} from "..";
import { CustomError, request } from "../utils";

/**
 * Endpoints for querying metadata about the versions recorded by the boilmaster system.
 * @see https://v2.xivapi.com/api/docs#tag/versions
 */
export class Versions {
  /**
   * List versions understood by the API.
   * @see https://v2.xivapi.com/api/docs#tag/versions/get/version
   */
  async all(): Promise<Models.VersionsResponse> {
    const { data, errors } = await request({ path: "/version" });
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.VersionsResponse;
  }
}
