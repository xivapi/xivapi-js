import { describe, it, expect, beforeEach } from "vitest";
import { Versions, Assets, Search, Sheets } from "../src/index";
import { CustomError } from "../src/utils";

describe("@xivapi/js", () => {
  const API_TIMEOUT = 10000;

  describe("versions", () => {
    it("should fetch all versions successfully", async () => {
      const versions = new Versions();
      const result = await versions.all();

      expect(result).toBeDefined();
      expect(result.versions).toBeDefined();
      expect(Array.isArray(result.versions)).toBe(true);
      expect(result.versions.length).toBeGreaterThan(0);
      
      result.versions.forEach(version => {
        expect(version.names).toBeDefined();
        expect(Array.isArray(version.names)).toBe(true);
        expect(version.names.length).toBeGreaterThan(0);
      });
    }, API_TIMEOUT);
  });

  describe("assets", () => {
    it("should fetch asset successfully", async () => {
      const assetParams = { 
        path: "ui/icon/051000/051474_hr1.tex", 
        format: "png" 
      };

      const assets = new Assets();
      const result = await assets.get(assetParams);

      expect(result).toBeDefined();
      expect(Buffer.isBuffer(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    }, API_TIMEOUT);

    it("should handle map requests correctly", async () => {
      const mapParams = { 
        territory: "invalid", 
        index: "00", 
        version: "latest",
        format: "png"
      };

      const assets = new Assets();
      
      await expect(assets.map(mapParams)).rejects.toThrow();
    }, API_TIMEOUT);

    it("should throw CustomError when asset fetch fails", async () => {
      const assets = new Assets();

      await expect(assets.get({ 
        path: "invalid/path/that/does/not/exist.tex", 
        format: "png" 
      })).rejects.toThrow();
    }, API_TIMEOUT);
  });

  describe("search", () => {
    it("should perform search successfully with default options", async () => {
      const searchParams = {
        query: 'Name="Iron Sword"',
        sheets: "Item",
        limit: 5,
      };

      const search = new Search();
      const result = await search.get(searchParams);

      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
      expect(result.schema).toBeDefined();

      if (result.results.length > 0) {
        const firstResult = result.results[0];
        expect(firstResult.row_id).toBeDefined();
        expect(typeof firstResult.row_id).toBe("number");
        expect(firstResult.score).toBeDefined();
        expect(typeof firstResult.score).toBe("number");
        expect(firstResult.sheet).toBeDefined();
        expect(firstResult.fields).toBeDefined();
      }
    }, API_TIMEOUT);

    it("should perform search successfully with custom options", async () => {
      const searchParams = {
        query: 'Name="Iron Sword"',
        sheets: "Item",
        limit: 3,
      };

      const customOptions = {
        language: "ja" as const,
        verbose: true,
      };

      const search = new Search(customOptions);
      const result = await search.get(searchParams);

      expect(result).toBeDefined();
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
      expect(result.schema).toBeDefined();
    }, API_TIMEOUT);

    it("should throw CustomError when search fails", async () => {
      const search = new Search();

      await expect(search.get({ 
        query: "invalid query syntax that should fail",
        sheets: "Item"
      })).rejects.toThrow();
    }, API_TIMEOUT);
  });

  describe("sheets", () => {
    it("should list all sheets successfully with default options", async () => {
      const sheets = new Sheets();
      const result = await sheets.all();

      expect(result).toBeDefined();
      expect(result.sheets).toBeDefined();
      expect(Array.isArray(result.sheets)).toBe(true);
      expect(result.sheets.length).toBeGreaterThan(0);
      
      result.sheets.forEach(sheet => {
        expect(sheet.name).toBeDefined();
        expect(typeof sheet.name).toBe("string");
      });
    }, API_TIMEOUT);

    it("should list all sheets successfully with custom options", async () => {
      const customOptions = {
        language: "fr" as const,
        verbose: true,
      };

      const sheets = new Sheets(customOptions);
      const result = await sheets.all();

      expect(result).toBeDefined();
      expect(result.sheets).toBeDefined();
      expect(Array.isArray(result.sheets)).toBe(true);
      expect(result.sheets.length).toBeGreaterThan(0);
    }, API_TIMEOUT);

    it("should list sheet rows successfully", async () => {
      const sheetParams = { limit: 5 };

      const sheets = new Sheets();
      const result = await sheets.list("Item", sheetParams);

      expect(result).toBeDefined();
      expect(result.rows).toBeDefined();
      expect(Array.isArray(result.rows)).toBe(true);
      expect(result.schema).toBeDefined();
      
      if (result.rows.length > 0) {
        const firstRow = result.rows[0];
        expect(firstRow.row_id).toBeDefined();
        expect(typeof firstRow.row_id).toBe("number");
        expect(firstRow.fields).toBeDefined();
      }
    }, API_TIMEOUT);

    it("should get specific sheet row successfully", async () => {
      const rowParams = {
        fields: "Name,ID",
        language: "en",
      };

      const sheets = new Sheets();
      const result = await sheets.get("Item", 1, rowParams);

      expect(result).toBeDefined();
      expect(result.row_id).toBeDefined();
      expect(typeof result.row_id).toBe("number");
      expect(result.schema).toBeDefined();
      expect(result.fields).toBeDefined();
    }, API_TIMEOUT);

    it("should use default parameters when none provided", async () => {
      const sheets = new Sheets();
      const result = await sheets.list("Item");

      expect(result).toBeDefined();
      expect(result.rows).toBeDefined();
      expect(Array.isArray(result.rows)).toBe(true);
      expect(result.schema).toBeDefined();
    }, API_TIMEOUT);

    it("should throw CustomError when sheet operation fails", async () => {
      const sheets = new Sheets();

      await expect(sheets.list("NonExistentSheetThatDoesNotExist")).rejects.toThrow();
    }, API_TIMEOUT);
  });
});
