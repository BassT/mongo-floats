import test from "node:test";
import { toArray, toBinary } from ".";
import assert from "node:assert";

test("should work correctly", () => {
  const array = new Array(1000).fill(0.5);
  const binary = toBinary(array);
  assert.deepStrictEqual(array, toArray(binary));
});
