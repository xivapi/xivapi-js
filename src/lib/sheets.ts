import type { Models, XIVAPI } from ".."
import { CustomError, request } from "../utils"

export class Sheet<T extends Models.SchemaSpecifier> {
	private readonly type: T

	constructor(sheet: T) {
		this.type = sheet
	}

	/**
   * Gets a single row from the sheet.
   * @param {string | number} id The row to fetch.
   * @param {Models.RowReaderQuery} [params] The parameters to fetch the row with.
   * @returns {Promise<Models.RowResponse>} A single row with typed fields.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet/{sheet}/{row}
   */
	public get(
		id: string | number,
		params: Models.RowReaderQuery = {}
	): Promise<Models.RowResponse> {
		try {
			if (typeof id !== "string") id = id.toString()
			return new Sheets().get(this.type, id, params)
		} catch (error) {
			throw new CustomError(error instanceof Error ? error.message : "Unknown error")
		}
	}

	/**
   * Gets a list of rows from the sheet.
   * @param {Models.SheetQuery} [params] The parameters to fetch the rows with.
   * @returns {Promise<Models.SheetResponse>} A list of rows with typed fields.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet/{sheet}
   */
	public list(params: Models.SheetQuery = {}): Promise<Models.SheetResponse> {
		try {
			return new Sheets().list(this.type, params)
		} catch (error) {
			throw new CustomError(error instanceof Error ? error.message : "Unknown error")
		}
	}
}

export class Sheets {
	private readonly options: XIVAPI.Options

	/**
   * Endpoints for reading data from the game's static relational data store.
   * @param {XIVAPI.Options} [options] The options to fetch the sheets with.
   * @see https://v2.xivapi.com/api/docs#tag/sheets
   */
	public constructor(
		options: XIVAPI.Options = {
			language: "en",
			verbose: false,
		}
	) {
		this.options = options
	}

	/**
   * List known excel sheets that can be read by the API.
   * @returns {Promise<Models.ListResponse>} Response structure for the list endpoint.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet
   */
	async all(): Promise<Models.ListResponse> {
		const { data, errors } = await request({ path: "/sheet", params: {}, options: this.options })
		if (errors) throw new CustomError(errors[0].message)
		return data as Models.ListResponse
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
		const { data, errors } = await request({
			path: `/sheet/${sheet}`,
			params: params as Record<string, unknown>,
			options: this.options,
		})
		if (errors) throw new CustomError(errors[0].message)
		return data as Models.SheetResponse
	}

	/**
   * Read detailed, filterable information from a single sheet row and its related data.
   * @param {Models.SchemaSpecifier} sheet Name of the sheet to read.
   * @param {Models.RowSpecifier} row Row to read.
   * @returns {Promise<Models.RowResponse>} A list of rows with typed fields.
   * @see https://v2.xivapi.com/api/docs#tag/sheets/get/sheet/{sheet}/{id}
   */
	async get(
		sheet: Models.SchemaSpecifier,
		row: Models.RowSpecifier,
		params: Models.RowReaderQuery = {}
	): Promise<Models.RowResponse> {
		const { data, errors } = await request({
			path: `/sheet/${sheet}/${row}`,
			params: params as Record<string, unknown>,
			options: this.options,
		})
		if (errors) throw new CustomError(errors[0].message)
		return data as Models.RowResponse
	}
}
