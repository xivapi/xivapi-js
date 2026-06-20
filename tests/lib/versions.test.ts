import { describe, it, expect } from "vitest";
import XIVAPI from "../../src";

describe("@xivapi/js", () => {
  const xiv = new XIVAPI();

  describe("data.versions", () => {
    it("should fetch all versions successfully", async () => {
      const result = await xiv.data.versions();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      result.forEach((version) => {
        expect(typeof version).toBe("string");
        expect(version.length).toBeGreaterThan(0);
      });
    });
  });
});
