# mongo-floats

Small helper functions to store float32 data in MongoDB.

There are cases where you need to store a lot of floating point numbers but lower precision is acceptable. In such cases storing floating point numbers with single precision (32bit) will reduce data size significantly. MongoDB doesn't have native support for single precision floating point numbers. Floating point numbers are always stored as doubles (64bit).

But we can leverage the Binary data type to store arbitrary binary data including single precision floating point numbers. When storing numbers in a custom binary format, we have to take endianness into account. MongoDB stores all number-like data in little-endian byte order, but this doesn't apply or can be changed when implementing a custom binary representation of numbers.

