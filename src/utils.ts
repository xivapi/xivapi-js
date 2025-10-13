import type { Models, XIVAPI } from ".";

export const endpoint = "https://v2.xivapi.com/api/";

export class CustomError extends Error {
  constructor(message: string, name: string | null = null) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = name || "XIVAPIError";
    this.message = message;
  }
}

export interface RequestPayload {
  path: string | URL;
  data?: unknown;
  params?: Record<string, any>;
  errors?: Models.ErrorResponse[];
  options?: XIVAPI.Options;
}

export const request = async (payload: RequestPayload): Promise<RequestPayload> => {
  const { path, params, options } = payload;

  const url = new URL(path instanceof URL ? path.toString() : path.replace(/^\/+/, ""), endpoint);
  if (params) {
    url.search = new URLSearchParams(params).toString();
    
    if (!params.language) {
      if (options && options.language) url.searchParams.set("language", options.language);
    }
  }
  
  const response = await fetch(url);
  if (options && options.verbose) console.debug(`Requesting ${path} with params:`, params);

  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      payload.data = await response.json();
    } else {
      // For binary data (images, etc.)
      payload.data = Buffer.from(await response.arrayBuffer());
    }
  } else {
    payload.errors = [(await response.json()) as Models.ErrorResponse];
  }

  return payload;
};
