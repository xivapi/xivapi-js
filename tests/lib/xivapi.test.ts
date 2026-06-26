import { describe, expect, it } from "vitest";
import { type Models, XIVAPI } from "../../src";

describe("@xivapi/js", () => {
  const xiv = new XIVAPI();

  describe("client options", () => {
    it("can create client with custom options", async () => {
      const custom = new XIVAPI({
        language: "ja" as const,
        verbose: true,
        version: "latest",
      });

      const result = await custom.items.get(1, {
        fields: "Name",
      });

      expect(result).toBeDefined();
      expect(result.row_id).toBe(1);
      expect(result.fields.Name).toBe("ギル");
    });
  });

  const custom = new XIVAPI({ language: "fr", verbose: true });

  describe("search", () => {
    const validateResponse = (res: Models.SearchResponse) => {
      expect(res).toBeDefined();
      expect(res.results).toBeDefined();
      expect(Array.isArray(res.results)).toBe(true);
      expect(res.schema).toBeDefined();

      if (res.results.length > 0) {
        const firstResult = res.results[0];
        expect(firstResult.row_id).toBeDefined();
        expect(typeof firstResult.row_id).toBe("number");
        expect(firstResult.score).toBeDefined();
        expect(typeof firstResult.score).toBe("number");
        expect(firstResult.sheet).toBeDefined();
        expect(firstResult.fields).toBeDefined();
      }
    };

    const validateItemData = (res: Models.SearchResponse) => {
      expect(res.results.length).toBeGreaterThan(0);

      res.results.forEach((item) => {
        expect(item.sheet).toBe("Item");
        expect(item.fields).toBeDefined();
        expect(typeof item.fields).toBe("object");

        if (item.fields.Name) {
          expect(typeof item.fields.Name).toBe("string");
          expect((item.fields.Name as string).length).toBeGreaterThan(0);
        }

        if (item.fields.ID) {
          expect(typeof item.fields.ID).toBe("number");
          expect(item.fields.ID).toBeGreaterThan(0);
        }

        if (item.fields.LevelItem) {
          expect(typeof item.fields.LevelItem).toBe("number");
          expect(item.fields.LevelItem).toBeGreaterThanOrEqual(0);
        }
      });
    };

    const validateActionData = (res: Models.SearchResponse) => {
      expect(res.results.length).toBeGreaterThan(0);

      res.results.forEach((action) => {
        expect(action.sheet).toBe("Action");
        expect(action.fields).toBeDefined();
        expect(typeof action.fields).toBe("object");

        if (action.fields.Name) {
          expect(typeof action.fields.Name).toBe("string");
          expect((action.fields.Name as string).length).toBeGreaterThan(0);
        }

        if (action.fields.ID) {
          expect(typeof action.fields.ID).toBe("number");
          expect(action.fields.ID).toBeGreaterThan(0);
        }
      });
    };

    describe("error handling", () => {
      it("throws error for invalid query syntax", async () => {
        await expect(
          xiv.search({
            query: "invalid query syntax that should fail",
            sheets: "Item",
          })
        ).rejects.toThrow();
      });
    });

    describe("basic search operations", () => {
      it("can find items by via an exact name match", async () => {
        const result = await xiv.search({
          query: 'Name="Iron War Axe"',
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        const ironWarAxe = result.results.find(
          (item) => item.fields.Name === "Iron War Axe"
        );

        expect(ironWarAxe).toBeDefined();
        expect(ironWarAxe?.fields.Name).toBe("Iron War Axe");
      });

      it("can find items using partial text search", async () => {
        const result = await xiv.search({
          query: 'Name~"sword"',
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          expect((item.fields.Name as string).toLowerCase()).toContain("sword");
        });
      });

      it("can search actions by numeric properties", async () => {
        const result = await xiv.search({
          query: "Recast100ms>3000",
          sheets: "Action",
          limit: 5,
        });

        validateResponse(result);
        validateActionData(result);

        result.results.forEach((action) => {
          if (action.fields.Recast100ms) {
            expect(action.fields.Recast100ms).toBeGreaterThan(3000);
          }
        });
      });
    });

    describe("numeric comparisons", () => {
      it("can find high-level items (>=50)", async () => {
        const result = await xiv.search({
          query: "LevelItem>=50",
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.LevelItem) {
            expect(item.fields.LevelItem).toBeGreaterThanOrEqual(50);
          }
        });
      });

      it("can find low-level items (<10)", async () => {
        const result = await xiv.search({
          query: "LevelItem<10",
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.LevelItem) {
            expect(item.fields.LevelItem).toBeLessThan(10);
          }
        });
      });

      it("can find items in a level range", async () => {
        const result = await xiv.search({
          query: "LevelItem>=90 LevelItem<=99",
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.LevelItem) {
            expect(item.fields.LevelItem).toBeGreaterThanOrEqual(90);
            expect(item.fields.LevelItem).toBeLessThanOrEqual(99);
          }
        });
      });
    });

    describe("boolean and complex queries", () => {
      it("can filter by boolean properties", async () => {
        const result = await xiv.search({
          query: "IsUntradable=true",
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.IsUntradable !== undefined) {
            expect(item.fields.IsUntradable).toBe(true);
          }
        });
      });

      it("can combine multiple search criteria", async () => {
        const result = await xiv.search({
          query: ['Name~"sword"', "LevelItem>=10", "LevelItem<=50"],
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.Name) {
            expect((item.fields.Name as string).toLowerCase()).toContain(
              "sword"
            );
          }
          if (item.fields.LevelItem) {
            expect(item.fields.LevelItem).toBeGreaterThanOrEqual(10);
            expect(item.fields.LevelItem).toBeLessThanOrEqual(50);
          }
        });
      });
    });

    describe("multi-sheet searches", () => {
      it("can search across multiple sheets simultaneously", async () => {
        const result = await xiv.search({
          query: 'Name~"rainbow"',
          sheets: "Action,Item",
          limit: 5,
        });

        validateResponse(result);

        if (result.results.length > 0) {
          const sheets = new Set(result.results.map((r) => r.sheet));
          expect(sheets.size).toBeGreaterThanOrEqual(1);
        }
      });
    });

    describe("pagination", () => {
      it("can limit results and get pagination cursor", async () => {
        const result = await xiv.search({
          query: 'Name~"rainbow"',
          sheets: "Item",
          limit: 2,
        });

        expect(result).toBeDefined();
        expect(result.results).toBeDefined();
        expect(Array.isArray(result.results)).toBe(true);
        expect(result.results.length).toBeLessThanOrEqual(2);
        expect(result.schema).toBeDefined();

        if (result.next) {
          expect(typeof result.next).toBe("string");
          expect(result.next.length).toBeGreaterThan(0);
        }
      });

      it("can paginate through results using cursor", async () => {
        const firstPage = await xiv.search({
          query: 'Name~"sword"',
          sheets: "Item",
          limit: 2,
        });

        expect(firstPage).toBeDefined();
        expect(firstPage.results).toBeDefined();
        expect(Array.isArray(firstPage.results)).toBe(true);

        if (firstPage.next) {
          const secondPage = await xiv.search({
            cursor: firstPage.next,
            limit: 2,
          });

          expect(secondPage).toBeDefined();
          expect(secondPage.results).toBeDefined();
          expect(Array.isArray(secondPage.results)).toBe(true);
          expect(secondPage.schema).toBeDefined();
        }
      });
    });

    describe("customization", () => {
      it("can use custom language and verbose options", async () => {
        const result = await custom.search({
          query: 'Name~"sword"',
          sheets: "Item",
          limit: 3,
        });

        validateResponse(result);

        expect(result.results.length).toBeLessThanOrEqual(3);
        expect(result.schema).toBeDefined();
      });
    });

    describe("array-based queries", () => {
      it("can use string arrays for complex queries", async () => {
        const result = await xiv.search({
          query: ['Name~"sword"', "LevelItem>=10", "LevelItem<=50"],
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.Name) {
            expect((item.fields.Name as string).toLowerCase()).toContain(
              "sword"
            );
          }
          if (item.fields.LevelItem) {
            expect(item.fields.LevelItem).toBeGreaterThanOrEqual(10);
            expect(item.fields.LevelItem).toBeLessThanOrEqual(50);
          }
        });
      });

      it("can use string arrays for simple queries", async () => {
        const result = await xiv.search({
          query: ['Name~"sword"'],
          sheets: "Item",
          limit: 5,
        });

        validateResponse(result);
        validateItemData(result);

        result.results.forEach((item) => {
          if (item.fields.Name) {
            expect((item.fields.Name as string).toLowerCase()).toContain(
              "sword"
            );
          }
        });
      });
    });
  });

  describe("typed sheet accessors", () => {
    describe("achievements", () => {
      it("can get a specific achievement by ID", async () => {
        const result = await xiv.achievements.get(1, {
          fields: "Name",
          language: "en",
        });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);
        expect(result.fields.Name).toBe("To Crush Your Enemies I");
      });

      it("can list achievements with parameters", async () => {
        const result = await xiv.achievements.list({ limit: 3 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeLessThanOrEqual(3);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");
        });
      });
    });

    describe("actions", () => {
      it("can get a specific action by ID", async () => {
        const result = await xiv.actions.get(5);

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(5);
        expect(result.fields.Name).toBe("Teleport");
      });

      it("can list achievements with parameters", async () => {
        const result = await xiv.actions.list({ limit: 3 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeLessThanOrEqual(3);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");
        });
      });
    });

    describe("emotes", () => {
      it("can get a specific action by ID", async () => {
        const result = await xiv.emotes.get(11);

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(11);
        expect(result.fields.Name).toBe("Dance");
      });

      it("can list achievements with parameters", async () => {
        const result = await xiv.emotes.list({ limit: 3 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeLessThanOrEqual(3);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");
        });
      });
    });

    describe("items", () => {
      it("can get a specific item by ID", async () => {
        const result = await xiv.items.get(1, {
          fields: "Name",
          language: "en",
        });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);
        expect(result.fields.Name).toBe("Gil");
      });

      it("can list items with parameters", async () => {
        const result = await xiv.items.list({ limit: 3 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeLessThanOrEqual(3);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");
        });
      });
    });

    describe("minions", () => {
      it("can get a specific minion by ID", async () => {
        const result = await xiv.minions.get(1, {
          fields: "Singular",
          language: "en",
        });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);
        expect(result.fields.Singular).toBe("cherry bomb");
      });

      it("can list minions with parameters", async () => {
        const result = await xiv.minions.list({ limit: 3 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeLessThanOrEqual(3);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");

          if (row.fields.Singular) {
            expect(typeof row.fields.Singular).toBe("string");
            expect((row.fields.Singular as string).length).toBeGreaterThan(0);
          }
        });
      });
    });

    describe("mounts", () => {
      it("can get a specific mount by ID", async () => {
        const result = await xiv.mounts.get(1, {
          fields: "Singular",
          language: "en",
        });

        expect(result).toBeDefined();
        expect(result.row_id).toBeDefined();
        expect(typeof result.row_id).toBe("number");
        expect(result.schema).toBeDefined();
        expect(result.fields).toBeDefined();
        expect(result.row_id).toBe(1);
        expect(result.fields.Singular).toBe("company chocobo");
      });

      it("can list mounts with parameters", async () => {
        const result = await xiv.mounts.list({ limit: 3 });

        expect(result).toBeDefined();
        expect(result.rows).toBeDefined();
        expect(Array.isArray(result.rows)).toBe(true);
        expect(result.schema).toBeDefined();
        expect(result.rows.length).toBeLessThanOrEqual(3);

        result.rows.forEach((row) => {
          expect(row.row_id).toBeDefined();
          expect(typeof row.row_id).toBe("number");
          expect(row.fields).toBeDefined();
          expect(typeof row.fields).toBe("object");

          if (row.fields.Name) {
            expect(typeof row.fields.Name).toBe("string");
            expect((row.fields.Name as string).length).toBeGreaterThan(0);
          }
        });
      });
    });
  });
});
