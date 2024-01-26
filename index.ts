import { Binary } from "bson";

/**
 * Converts an array of numbers to 32-bit floating point numbers in binary format.
 */
export function toBinary(array: number[]): Binary {
  const buffer = Buffer.alloc(array.length * 4);
  for (let i = 0; i < array.length; i++) {
    buffer.writeFloatLE(array[i], i * 4);
  }
  return new Binary(buffer);
}

/**
 * Converts binary data containing 32-bit floating point numbers to an array of numbers.
 */
export function toArray(binary: Binary): number[] {
  const array: number[] = [];
  const buffer = Buffer.from(binary.buffer);
  for (let i = 0; i < binary.length() / 4; i++) {
    const value = buffer.readFloatLE(i * 4);
    array.push(value);
  }
  return array;
}
