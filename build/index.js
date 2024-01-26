"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.toBinary = void 0;
const bson_1 = require("bson");
/**
 * Converts an array of numbers to 32-bit floating point numbers in binary format.
 */
function toBinary(array) {
    const buffer = Buffer.alloc(array.length * 4);
    for (let i = 0; i < array.length; i++) {
        buffer.writeFloatLE(array[i], i * 4);
    }
    return new bson_1.Binary(buffer);
}
exports.toBinary = toBinary;
/**
 * Converts binary data containing 32-bit floating point numbers to an array of numbers.
 */
function toArray(binary) {
    const array = [];
    const buffer = Buffer.from(binary.buffer);
    for (let i = 0; i < binary.length() / 4; i++) {
        const value = buffer.readFloatLE(i * 4);
        array.push(value);
    }
    return array;
}
exports.toArray = toArray;
