"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const _1 = require(".");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.default)("should work correctly", () => {
    const array = new Array(1000).fill(0.5);
    const binary = (0, _1.toBinary)(array);
    node_assert_1.default.deepStrictEqual(array, (0, _1.toArray)(binary));
});
