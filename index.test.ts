import assert from "node:assert";
import test from "node:test";
import { toArray, toBinary } from ".";

test("should work correctly", () => {
  const array = new Array(100000).fill(0).map(() => Math.random());
  const binary = toBinary(array);
  const resultArray = toArray(binary);
  const epsilon = 0.0000001;

  for (let i = 0; i < array.length; i++) {
    assert(
      Math.abs(array[i] - resultArray[i]) < epsilon,
      new Error(
        "Expected " +
          `Math.abs(${array[i]} - ${resultArray[i]}) < ${epsilon}, ` +
          `but was ${Math.abs(array[i] - resultArray[i])}`
      )
    );
  }
});
