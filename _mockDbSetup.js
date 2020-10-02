const { MockMongoose } = require("mock-mongoose");
const mongoose = require('mongoose')

const mockMongoose = new MockMongoose(mongoose);

async function start() {
  await mockMongoose.prepareStorage()
  console.log("db setup");
}

start()
