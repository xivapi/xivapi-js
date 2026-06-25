import { describe, expect, it } from "vitest";
import XIVAPI from "../../src";

describe("@xivapi/js", () => {
  const xiv = new XIVAPI();

  describe("data.assets", () => {
    const assets = xiv.data.assets();

    it("should fetch an asset successfully", async () => {
      const result = await assets.get({
        path: "ui/icon/051000/051474_hr1.tex",
        format: "png",
      });

      expect(result).toBeDefined();
      expect(Buffer.isBuffer(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should handle map requests correctly", async () => {
      const result = await assets.map("s1d1", "00", { version: "latest" });

      expect(result).toBeDefined();
      expect(Buffer.isBuffer(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should throw CustomError when asset fetch fails", async () => {
      await expect(
        assets.get({
          path: "invalid/path/that/does/not/exist.tex",
          format: "png",
        })
      ).rejects.toThrow();
    });
  });
});
