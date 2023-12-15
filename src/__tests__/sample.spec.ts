import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { greeting } from "../sample";

describe("Sample tests", () => {
  it("should correctly greet", async () => {
    expect(greeting("World")).toBe("Hello World");
  });
});
