import { describe, expect, it } from "vitest";
import XIVAPI from "../../src";

describe("@xivapi/js", () => {
  const xiv = new XIVAPI();
  const custom = new XIVAPI({ language: "fr", verbose: true });

  describe("data.sheets", () => {
    const sheets = xiv.data.sheets();

    describe("error handling", () => {
      it("throws error for non-existent sheets", async () => {
        await expect(
          sheets.list("NonExistentSheetThatDoesNotExist")
        ).rejects.toThrow();
        await expect(
          sheets.get("NonExistentSheetThatDoesNotExist", 1)
        ).rejects.toThrow();
      });
    });

    describe("data.sheets.all", () => {
      it("can list all available sheets", async () => {
        const result = await sheets.all();

        expect(result).toBeDefined();
        expect(result.sheets).toBeDefined();
        expect(Array.isArray(result.sheets)).toBe(true);
        expect(result.sheets.length).toBeGreaterThan(0);

        result.sheets.forEach((sheet) => {
          expect(sheet.name).toBeDefined();
          expect(typeof sheet.name).toBe("string");
        });
      });

      it("can list all sheets with custom options", async () => {
        const sheets = custom.data.sheets();
        const result = await sheets.all();

        expect(result).toBeDefined();
        expect(result.sheets).toBeDefined();
        expect(Array.isArray(result.sheets)).toBe(true);
        expect(result.sheets.length).toBeGreaterThan(0);
      });
    });

    describe("data.sheets.list", () => {
      it("can list rows with default parameters", async () => {
        const result = await sheets.list("Item");

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);
      });

      it("can list rows from a specific sheet", async () => {
        const result = await sheets.list("Item", { limit: 5 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");

          if (row.fields.Name) {
            expect(typeof row.fields.Name).toBe("string");
            expect((row.fields.Name as string).length).toBeGreaterThan(0);
          }

          if (row.fields.ID) {
            expect(typeof row.fields.ID).toBe("number");
            expect(row.fields.ID).toBeGreaterThan(0);
          }
        });
      });

      it("can list rows with custom options", async () => {
        const sheets = custom.data.sheets();
        const result = await sheets.list("Item", { limit: 5 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);
      });
    });

    describe("data.sheets.get", () => {
      it("can get a specific row", async () => {
        const result = await sheets.get("Item", "1", { fields: "Name" });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);

        expect(result.fields.Name).toBeDefined();
        expect(result.fields.Name).toBe("Gil");
      });

      it("can get a specific row with array-based field filtering", async () => {
        const result = await sheets.get("Item", "1", {
          fields: ["Name", "LevelItem"],
        });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);

        expect(result.fields).toBeDefined();
        expect(typeof result.fields).toBe("object");
        expect(Object.keys(result.fields).length).toBe(2);
        expect(result.fields.Name).toBeDefined();
        expect(result.fields.Name).toBe("Gil");
      });

      it("can get a specific row with custom options", async () => {
        const sheets = custom.data.sheets();
        const result = await sheets.get("Item", "1", { fields: "Name" });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);

        expect(result.fields.Name).toBeDefined();
        expect(result.fields.Name).toBe("Gil");
      });
    });
  });
});
