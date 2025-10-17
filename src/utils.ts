import type { Models, XIVAPI } from "."

export const endpoint = "https://v2.xivapi.com/api/"

export class CustomError extends Error {
	constructor(message: string, name: string | null = null) {
		super()
		Error.captureStackTrace(this, this.constructor)
		this.name = name || "XIVAPIError"
		this.message = message
	}
}

export interface RequestPayload {
  path: string | URL;
  data?: unknown;
  params?: Record<string, unknown>;
  errors?: Models.ErrorResponse[];
  options?: XIVAPI.Options;
}

export const request = async (payload: RequestPayload): Promise<RequestPayload> => {
	const { path, params, options } = payload

	if (!params?.verbose) {
    options!.verbose = params?.verbose as boolean
    delete params?.verbose
	}

	const url = new URL(path instanceof URL ? path.toString() : path.replace(/^\/+/, ""), endpoint)
	if (params) {
		const array: Record<string, string> = { query: " ", fields: ",", transient: "," }
		for (const key in array) {
			if (Object.prototype.hasOwnProperty.call(params, key) && Array.isArray(params[key])) {
				params[key] = (params[key] as string[]).join(array[key])
			}
		}

		url.search = new URLSearchParams(params as Record<string, string>).toString()

		if (!params.language) {
			if (options && options.language) url.searchParams.set("language", options.language)
		}

		if (!params.version) {
			if (options && options.version) url.searchParams.set("version", options.version)
		}
	}

	const response = await fetch(url)
	if (options && options.verbose) console.debug(`Requesting ${path} with params:`, params)

	if (response.ok) {
		const contentType = response.headers.get("content-type")
		if (contentType && contentType.includes("application/json")) {
			payload.data = await response.json()
		} else {
			payload.data = Buffer.from(await response.arrayBuffer())
		}
	} else {
		payload.errors = [(await response.json()) as Models.ErrorResponse]
	}

	if (options && options.verbose)
		console.debug(`${response.ok ? "Success" : "Error"} on ${path} with params:`, params)

	return payload
}
