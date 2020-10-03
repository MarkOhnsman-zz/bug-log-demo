const { MockMongoose } = require("mock-mongoose");
const mongoose = require('mongoose')
const mockMongoose = new MockMongoose(mongoose);


async function start() {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  
  console.log("Initializing Database");
  await mockMongoose.prepareStorage()
  await mongoose.connect('mongodb://test/db');
  console.log("db ready");
  process.exit()
}

start()
