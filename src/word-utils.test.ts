import { describe, expect, it } from "vitest";
import { getRandomWord } from "./word-utils";

describe("Word-Utils", () => {
  it("Random Word", () => {
    expect(getRandomWord()).toBeTruthy();
  });
});
