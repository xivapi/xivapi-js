import { runtime } from "std-env";
import pkg from "../package.json" with { type: "json" };
import type { XIVAPIOptions } from "./index.js";
import type * as Models from "./models.js";

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
  params?: Record<string, unknown>;
  errors?: Models.ErrorResponse[];
  options?: XIVAPIOptions;
}

export const request = async (
  payload: RequestPayload
): Promise<RequestPayload> => {
  const { path, options } = payload;

  const params: Record<string, unknown> = {
    ...(payload.params ?? {}),
    language: payload.params?.language ?? options?.language ?? "en",
    version: payload.params?.version ?? options?.version ?? "latest",
  };

  /* v8 ignore start -- @preserve */
  if (options?.verbose && "verbose" in params) {
    options.verbose = Boolean(params.verbose);
    delete params.verbose;
  }
  /* v8 ignore stop -- @preserve */

  const url = new URL(
    path instanceof URL ? path.toString() : path.replace(/^\/+/, ""),
    endpoint
  );

  const joiners = { query: " ", fields: ",", transient: "," };
  for (const key in joiners) {
    if (Array.isArray(params[key])) {
      params[key] = params[key].join((joiners as Record<string, string>)[key]);
    }
  }

  url.search = new URLSearchParams(params as Record<string, string>).toString();

  const response = await fetch(url, {
    headers: {
      "User-Agent": `${pkg.name}/${pkg.version} (${runtime}; +${pkg.homepage})`,
    },
  });

  if (options?.verbose) {
    console.debug(`Requesting ${path} with params:`, params);
  }

  /* v8 ignore if -- @preserve */
  const contentType = response.headers.get("Content-Type") ?? "";
  if (response.ok) {
    if (contentType.includes("application/json")) {
      payload.data = await response.json();
    } else {
      payload.data = Buffer.from(await response.arrayBuffer());
    }

    if (options?.verbose) {
      console.debug(`Success on ${path} with params:`, params);
    }
  } else {
    /* v8 ignore start -- @preserve */
    if (contentType.includes("application/json")) {
      payload.errors = [(await response.json()) as Models.ErrorResponse];
    } else {
      payload.errors = [
        { code: response.status, message: response.statusText },
      ];
    }

    if (options?.verbose) {
      console.debug(`Error on ${path} with params:`, params);
    }
    /* v8 ignore stop -- @preserve */
  }

  return payload;
};
