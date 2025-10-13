import type {Models, XIVAPI} from "..";
import { CustomError, request } from "../utils";

export class Sheets {
  private readonly options: XIVAPI.Options;
  
  /**
   * Endpoints for reading data from the game's static relational data store.
   * @param {XIVAPI.Options} [options] The options to fetch the sheets with.
   * @see https://v2.xivapi.com/api/docs#tag/sheets
   */
  public constructor(options: XIVAPI.Options = {
    language: "en",
    verbose: false,
  }) {
    this.options = options;
  }

  /**
   * List known excel sheets that can be read by the API.
   * @returns {Promise<Models.ListResponse>} Response structure for the list endpoint.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet
   */
  async all(): Promise<Models.ListResponse> {
    const { data, errors } = await request({ path: "/sheet", options: this.options });
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.ListResponse;
  }

  /**
   * Read information about one or more rows and their related data.
   * @param {Models.SchemaSpecifier} sheet The sheet to fetch the rows from.
   * @param {Models.SheetQuery} [params] The parameters to fetch the rows with.
   * @returns {Promise<Models.SheetResponse>} A list of rows with typed fields.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet/{sheet}
   */
  async list(
    sheet: Models.SchemaSpecifier,
    params: Models.SheetQuery = {}
  ): Promise<Models.SheetResponse> {
    const { data, errors } = await request({ path: `/sheet/${sheet}`, params, options: this.options });
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.SheetResponse;
  }

  /**
   * Read detailed, filterable information from a single sheet row and its related data.
   * @param {Models.SchemaSpecifier} sheet Name of the sheet to read.
   * @param {number} row Row to read.
   * @returns {Promise<Models.RowResponse>} A list of rows with typed fields.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet/{sheet}/{id}
   */
  async get(
    sheet: Models.SchemaSpecifier,
    row: number,
    params: Models.RowReaderQuery = {}
  ): Promise<Models.RowResponse> {
    const { data, errors } = await request({ path: `/sheet/${sheet}/${row}`, params, options: this.options });
    if (errors) throw new CustomError(errors[0].message);
    return data as Models.RowResponse;
  }
}
