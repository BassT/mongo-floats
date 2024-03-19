# mongo-floats

Small helper functions to store float32 data in MongoDB.

There are cases where you need to store a lot of floating point numbers but lower precision is acceptable. In such cases storing floating point numbers with single precision (32bit) will reduce data size significantly. MongoDB doesn't have native support for single precision floating point numbers. Floating point numbers are always stored as doubles (64bit).

But we can leverage the Binary data type to store arbitrary binary data including single precision floating point numbers. When storing numbers in a custom binary format, we have to take endianness into account. MongoDB stores all number-like data in little-endian byte order, but this doesn't apply or can be changed when implementing a custom binary representation of numbers.

However, storing the numbers as binary data will limit MongoDB functionality to storing and retrieving the array entirely only.
Array-specific operations like updating single elements or finding the biggest value of an array is not possible anymore.
Also, aggregating binary encoded values is not supported.

## Example usage

```js
const { toBinary, toArray } = require("mongo-floats");
const { MongoClient } = require("mongodb");

const values = new Array(1000).fill(0.5);

MongoClient.connect("mongodb://localhost:27017/test").then(async (client) => {
  const testColl = client.db("test").collection("test");
  
  // Save document with values converted to binary
  await testColl.updateOne(
    { _id: "foo" },
    { $set: { values: toBinary(values) } },
    { upsert: true }
  );

  // Find document and log values converted back from binary
  const doc = await testColl.findOne({ _id: "foo" });
  console.log(toArray(doc.values));
});
```

## Compare document sizes

This example document sizes comparison using $bsonSize shows a reduction of 70%.

```js
const { toBinary } = require("mongo-floats");
const { MongoClient } = require("mongodb");

const values = new Array(1000).fill(0.5);

MongoClient.connect("mongodb://localhost:27017/test").then(async (client) => {
  const testColl = client.db("test").collection("test");
  await testColl.drop();

  // Insert sample documents
  await testColl.insertMany([
    { _id: "foo", values },
    { _id: "bar", values: toBinary(values) },
  ]);

  // Add field containing BSON document size
  const result = await testColl
    .aggregate([
      { $addFields: { bsonSize: { $bsonSize: "$$ROOT" } } },
      { $project: { bsonSize: 1 } },
    ])
    .toArray();

  // [ { _id: 'foo', bsonSize: 12921 }, { _id: 'bar', bsonSize: 4031 } ]
  console.log(result);
});
```