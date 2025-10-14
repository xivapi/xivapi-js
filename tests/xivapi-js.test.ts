import { describe, it, expect } from "vitest";
import xivapiClient from "../src/index";

describe("@xivapi/js", () => {
  const API_TIMEOUT = 10000;
  const xivapi = new xivapiClient();

  const validateSearchResponse = (result: any) => {
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
  };

  const validateItemData = (result: any, expectedSheet: string = "Item") => {
    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((item: any) => {
      expect(item.sheet).toBe(expectedSheet);
      expect(item.fields).toBeDefined();
      expect(typeof item.fields).toBe("object");

      if (item.fields.Name) {
        expect(typeof item.fields.Name).toBe("string");
        expect(item.fields.Name.length).toBeGreaterThan(0);
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

  const validateActionData = (result: any) => {
    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((action: any) => {
      expect(action.sheet).toBe("Action");
      expect(action.fields).toBeDefined();
      expect(typeof action.fields).toBe("object");

      if (action.fields.Name) {
        expect(typeof action.fields.Name).toBe("string");
        expect(action.fields.Name.length).toBeGreaterThan(0);
      }

      if (action.fields.ID) {
        expect(typeof action.fields.ID).toBe("number");
        expect(action.fields.ID).toBeGreaterThan(0);
      }
    });
  };

  const createSearch = (options = {}) => {
    const client = new xivapiClient(options);
    return client.data.search();
  };

  describe("versions", () => {
    it(
      "should fetch all versions successfully",
      async () => {
        const result = await xivapi.data.versions();

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);

        result.forEach((version) => {
          expect(typeof version).toBe("string");
          expect(version.length).toBeGreaterThan(0);
        });
      },
      API_TIMEOUT
    );
  });

  describe("assets", () => {
    it(
      "should fetch asset successfully",
      async () => {
        const assetParams = {
          path: "ui/icon/051000/051474_hr1.tex",
          format: "png",
        };

        const assets = xivapi.data.assets();
        const result = await assets.get(assetParams);

        expect(result).toBeDefined();
        expect(Buffer.isBuffer(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      },
      API_TIMEOUT
    );

    it(
      "should handle map requests correctly",
      async () => {
        const mapParams = {
          territory: "invalid",
          index: "00",
          version: "latest",
          format: "png",
        };

        const assets = xivapi.data.assets();

        await expect(assets.map(mapParams)).rejects.toThrow();
      },
      API_TIMEOUT
    );

    it(
      "should throw CustomError when asset fetch fails",
      async () => {
        const assets = xivapi.data.assets();

        await expect(
          assets.get({
            path: "invalid/path/that/does/not/exist.tex",
            format: "png",
          })
        ).rejects.toThrow();
      },
      API_TIMEOUT
    );
  });

  describe("search", () => {
    describe("basic search operations", () => {
      it(
        "can find items by exact name match",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: 'Name="Iron War Axe"',
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          const ironWarAxe = result.results.find(
            (item: any) => item.fields.Name === "Iron War Axe"
          );
          expect(ironWarAxe).toBeDefined();
          if (ironWarAxe) {
            expect((ironWarAxe.fields as any).Name).toBe("Iron War Axe");
          }
        },
        API_TIMEOUT
      );

      it(
        "can find items using partial text search",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: 'Name~"sword"',
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.Name) {
              expect(item.fields.Name.toLowerCase()).toContain("sword");
            }
          });
        },
        API_TIMEOUT
      );

      it(
        "can search actions by numeric properties",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: "Recast100ms>3000",
            sheets: "Action",
            limit: 5,
          });

          validateSearchResponse(result);
          validateActionData(result);

          result.results.forEach((action: any) => {
            if (action.fields.Recast100ms) {
              expect(action.fields.Recast100ms).toBeGreaterThan(3000);
            }
          });
        },
        API_TIMEOUT
      );
    });

    describe("numeric comparisons", () => {
      it(
        "can find high-level items (>=50)",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: "LevelItem>=50",
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.LevelItem) {
              expect(item.fields.LevelItem).toBeGreaterThanOrEqual(50);
            }
          });
        },
        API_TIMEOUT
      );

      it(
        "can find low-level items (<10)",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: "LevelItem<10",
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.LevelItem) {
              expect(item.fields.LevelItem).toBeLessThan(10);
            }
          });
        },
        API_TIMEOUT
      );

      it(
        "can find items in a level range",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: "LevelItem>=90 LevelItem<=99",
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.LevelItem) {
              expect(item.fields.LevelItem).toBeGreaterThanOrEqual(90);
              expect(item.fields.LevelItem).toBeLessThanOrEqual(99);
            }
          });
        },
        API_TIMEOUT
      );
    });

    describe("boolean and complex queries", () => {
      it(
        "can filter by boolean properties",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: "IsUntradable=true",
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.IsUntradable !== undefined) {
              expect(item.fields.IsUntradable).toBe(true);
            }
          });
        },
        API_TIMEOUT
      );

      it(
        "can combine multiple search criteria",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: 'Name~"sword" LevelItem>=10 LevelItem<=50',
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.Name) {
              expect(item.fields.Name.toLowerCase()).toContain("sword");
            }
            if (item.fields.LevelItem) {
              expect(item.fields.LevelItem).toBeGreaterThanOrEqual(10);
              expect(item.fields.LevelItem).toBeLessThanOrEqual(50);
            }
          });
        },
        API_TIMEOUT
      );
    });

    describe("multi-sheet searches", () => {
      it(
        "can search across multiple sheets simultaneously",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: 'Name~"rainbow"',
            sheets: "Action,Item",
            limit: 5,
          });

          validateSearchResponse(result);

          if (result.results.length > 0) {
            const sheets = new Set(result.results.map((r) => r.sheet));
            expect(sheets.size).toBeGreaterThanOrEqual(1);
          }
        },
        API_TIMEOUT
      );
    });

    describe("pagination", () => {
      it(
        "can limit results and get pagination cursor",
        async () => {
          const search = createSearch();
          const result = await search.get({
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
        },
        API_TIMEOUT
      );

      it(
        "can paginate through results using cursor",
        async () => {
          const search = createSearch();

          const firstPage = await search.get({
            query: 'Name~"sword"',
            sheets: "Item",
            limit: 2,
          });

          expect(firstPage).toBeDefined();
          expect(firstPage.results).toBeDefined();
          expect(Array.isArray(firstPage.results)).toBe(true);

          if (firstPage.next) {
            const secondPage = await search.get({
              cursor: firstPage.next,
              limit: 2,
            });

            expect(secondPage).toBeDefined();
            expect(secondPage.results).toBeDefined();
            expect(Array.isArray(secondPage.results)).toBe(true);
            expect(secondPage.schema).toBeDefined();
          }
        },
        API_TIMEOUT
      );
    });

    describe("customization", () => {
      it(
        "can use custom language and verbose options",
        async () => {
          const search = createSearch({
            language: "ja" as const,
            verbose: true,
          });

          const result = await search.get({
            query: 'Name~"sword"',
            sheets: "Item",
            limit: 3,
          });

          validateSearchResponse(result);

          expect(result.results.length).toBeLessThanOrEqual(3);
          expect(result.schema).toBeDefined();
        },
        API_TIMEOUT
      );
    });

    describe("array-based queries", () => {
      it(
        "can use string arrays for complex queries",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: ['Name~"sword"', "LevelItem>=10", "LevelItem<=50"],
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.Name) {
              expect(item.fields.Name.toLowerCase()).toContain("sword");
            }
            if (item.fields.LevelItem) {
              expect(item.fields.LevelItem).toBeGreaterThanOrEqual(10);
              expect(item.fields.LevelItem).toBeLessThanOrEqual(50);
            }
          });
        },
        API_TIMEOUT
      );

      it(
        "can use string arrays for simple queries",
        async () => {
          const search = createSearch();
          const result = await search.get({
            query: ['Name~"sword"'],
            sheets: "Item",
            limit: 5,
          });

          validateSearchResponse(result);
          validateItemData(result);

          result.results.forEach((item: any) => {
            if (item.fields.Name) {
              expect(item.fields.Name.toLowerCase()).toContain("sword");
            }
          });
        },
        API_TIMEOUT
      );
    });

    describe("error handling", () => {
      it(
        "throws error for invalid query syntax",
        async () => {
          const search = createSearch();

          await expect(
            search.get({
              query: "invalid query syntax that should fail",
              sheets: "Item",
            })
          ).rejects.toThrow();
        },
        API_TIMEOUT
      );
    });
  });

  describe("sheets", () => {
    describe("listing sheets", () => {
      it(
        "can list all available sheets",
        async () => {
          const sheets = xivapi.data.sheets();
          const result = await sheets.all();

          expect(result).toBeDefined();
          expect(result.sheets).toBeDefined();
          expect(Array.isArray(result.sheets)).toBe(true);
          expect(result.sheets.length).toBeGreaterThan(0);

          result.sheets.forEach((sheet) => {
            expect(sheet.name).toBeDefined();
            expect(typeof sheet.name).toBe("string");
          });
        },
        API_TIMEOUT
      );

      it(
        "can list sheets with custom language options",
        async () => {
          const client = new xivapiClient({
            language: "fr" as const,
            verbose: true,
          });
          const sheets = client.data.sheets();
          const result = await sheets.all();

          expect(result).toBeDefined();
          expect(result.sheets).toBeDefined();
          expect(Array.isArray(result.sheets)).toBe(true);
          expect(result.sheets.length).toBeGreaterThan(0);
        },
        API_TIMEOUT
      );
    });

    describe("reading sheet data", () => {
      it(
        "can list rows from a specific sheet",
        async () => {
          const sheets = xivapi.data.sheets();
          const result = await sheets.list("Item", { limit: 5 });

          expect(result).toBeDefined();
          expect(result.rows).toBeDefined();
          expect(Array.isArray(result.rows)).toBe(true);
          expect(result.schema).toBeDefined();
          expect(result.rows.length).toBeGreaterThan(0);

          result.rows.forEach((row: any) => {
            expect(row.row_id).toBeDefined();
            expect(typeof row.row_id).toBe("number");
            expect(row.fields).toBeDefined();
            expect(typeof row.fields).toBe("object");

            if (row.fields.Name) {
              expect(typeof row.fields.Name).toBe("string");
              expect(row.fields.Name.length).toBeGreaterThan(0);
            }

            if (row.fields.ID) {
              expect(typeof row.fields.ID).toBe("number");
              expect(row.fields.ID).toBeGreaterThan(0);
            }
          });
        },
        API_TIMEOUT
      );

      it(
        "can get a specific row with field filtering",
        async () => {
          const sheets = xivapi.data.sheets();
          const result = await sheets.get("Item", "1", {
            fields: "Name",
            language: "en",
          });

          expect(result).toBeDefined();
          expect(result.row_id).toBeDefined();
          expect(typeof result.row_id).toBe("number");
          expect(result.schema).toBeDefined();
          expect(result.fields).toBeDefined();
          expect(result.row_id).toBe(1);

          expect((result.fields as any).Name).toBeDefined();
          expect((result.fields as any).Name).toBe("Gil");
        },
        API_TIMEOUT
      );

      it(
        "can get a specific row with array-based field filtering",
        async () => {
          const sheets = xivapi.data.sheets();
          const result = await sheets.get("Item", "1", {
            fields: ["Name", "LevelItem"],
            language: "en",
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
          expect((result.fields as any).Name).toBeDefined();
          expect((result.fields as any).Name).toBe("Gil");
        },
        API_TIMEOUT
      );

      it(
        "can list rows with default parameters",
        async () => {
          const sheets = xivapi.data.sheets();
          const result = await sheets.list("Item");

          expect(result).toBeDefined();
          expect(result.rows).toBeDefined();
          expect(Array.isArray(result.rows)).toBe(true);
          expect(result.schema).toBeDefined();
        },
        API_TIMEOUT
      );
    });

    describe("error handling", () => {
      it(
        "throws error for non-existent sheets",
        async () => {
          const sheets = xivapi.data.sheets();

          await expect(sheets.list("NonExistentSheetThatDoesNotExist")).rejects.toThrow();
        },
        API_TIMEOUT
      );
    });
  });

  describe("typed sheet accessors", () => {
    describe("items", () => {
      it(
        "can get a specific item by ID",
        async () => {
          const result = await xivapi.items.get(1, {
            fields: "Name",
            language: "en",
          });

          expect(result).toBeDefined();
          expect(result.row_id).toBeDefined();
          expect(typeof result.row_id).toBe("number");
          expect(result.schema).toBeDefined();
          expect(result.fields).toBeDefined();
          expect(result.row_id).toBe(1);
          expect((result.fields as any).Name).toBe("Gil");
        },
        API_TIMEOUT
      );

      it(
        "can list items with parameters",
        async () => {
          const result = await xivapi.items.list({ limit: 3 });

          expect(result).toBeDefined();
          expect(result.rows).toBeDefined();
          expect(Array.isArray(result.rows)).toBe(true);
          expect(result.schema).toBeDefined();
          expect(result.rows.length).toBeLessThanOrEqual(3);

          result.rows.forEach((row: any) => {
            expect(row.row_id).toBeDefined();
            expect(typeof row.row_id).toBe("number");
            expect(row.fields).toBeDefined();
            expect(typeof row.fields).toBe("object");
          });
        },
        API_TIMEOUT
      );

      it(
        "can get item with string ID",
        async () => {
          const result = await xivapi.items.get("1", {
            fields: "Name",
            language: "en",
          });

          expect(result).toBeDefined();
          expect(result.row_id).toBe(1);
          expect((result.fields as any).Name).toBe("Gil");
        },
        API_TIMEOUT
      );
    });

    describe("achievements", () => {
      it(
        "can get a specific achievement by ID",
        async () => {
          const result = await xivapi.achievements.get(1, {
            fields: "Name",
            language: "en",
          });

          expect(result).toBeDefined();
          expect(result.row_id).toBeDefined();
          expect(typeof result.row_id).toBe("number");
          expect(result.schema).toBeDefined();
          expect(result.fields).toBeDefined();
          expect(result.row_id).toBe(1);
          expect((result.fields as any).Name).toBe("To Crush Your Enemies I");
        },
        API_TIMEOUT
      );

      it(
        "can list achievements with parameters",
        async () => {
          const result = await xivapi.achievements.list({ limit: 3 });

          expect(result).toBeDefined();
          expect(result.rows).toBeDefined();
          expect(Array.isArray(result.rows)).toBe(true);
          expect(result.schema).toBeDefined();
          expect(result.rows.length).toBeLessThanOrEqual(3);

          result.rows.forEach((row: any) => {
            expect(row.row_id).toBeDefined();
            expect(typeof row.row_id).toBe("number");
            expect(row.fields).toBeDefined();
            expect(typeof row.fields).toBe("object");
          });
        },
        API_TIMEOUT
      );
    });

    describe("client options", () => {
      it(
        "can create client with custom options",
        async () => {
          const client = new xivapiClient({
            language: "ja" as const,
            verbose: true,
            version: "latest",
          });

          const result = await client.items.get(1, {
            fields: "Name",
          });

          expect(result).toBeDefined();
          expect(result.row_id).toBe(1);
          expect((result.fields as any).Name).toBe("Gil");
        },
        API_TIMEOUT
      );
    });
  });
});
