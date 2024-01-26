"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.toBinary = void 0;
var bson_1 = require("bson");
/**
 * Converts an array of numbers to 32-bit floating point numbers in binary format.
 */
function toBinary(array) {
    var buffer = Buffer.alloc(array.length * 4);
    for (var i = 0; i < array.length; i++) {
        buffer.writeFloatLE(array[i], i * 4);
    }
    return new bson_1.Binary(buffer);
}
exports.toBinary = toBinary;
/**
 * Converts binary data containing 32-bit floating point numbers to an array of numbers.
 */
function toArray(binary) {
    var array = [];
    var buffer = Buffer.from(binary.buffer);
    for (var i = 0; i < binary.length() / 4; i++) {
        var value = buffer.readFloatLE(i * 4);
        array.push(value);
    }
    return array;
}
exports.toArray = toArray;
