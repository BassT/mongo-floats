"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const _1 = require(".");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.default)("should work correctly", () => {
    const array = new Array(100000).fill(0).map(() => Math.random());
    const binary = (0, _1.toBinary)(array);
    const resultArray = (0, _1.toArray)(binary);
    const epsilon = 0.0000001;
    for (let i = 0; i < array.length; i++) {
        (0, node_assert_1.default)(Math.abs(array[i] - resultArray[i]) < epsilon, new Error("Expected " +
            `Math.abs(${array[i]} - ${resultArray[i]}) < ${epsilon}, ` +
            `but was ${Math.abs(array[i] - resultArray[i])}`));
    }
});
