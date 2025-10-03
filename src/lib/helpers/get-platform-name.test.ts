import { expect, test } from "vitest";
import { getPlatformName } from "./get-platform-name.ts";

const testData: Array<[string, ReturnType<typeof getPlatformName>]> = [
  ["iOS", "macOS"],
  ["Windows", "Windows"],
  ["Android", "Linux"],
  ["Linux", "Linux"],
];

for (const [input, output] of testData) {
  const testName = `Get Platform Name: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(getPlatformName(input)).toBe(output);
  });
}