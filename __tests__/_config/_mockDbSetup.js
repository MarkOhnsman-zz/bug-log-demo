const { MockMongoose } = require("mock-mongoose");
const mongoose = require('mongoose')
const mockMongoose = new MockMongoose(mongoose);


async function start() {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);

  await mockMongoose.prepareStorage()
  console.log("db setup");
  await mongoose.connect('mongodb://test/db');
  console.log("db connected");
  await mongoose.disconnect()
  mongoose.connection.close()
  console.log("db disconnected");
  process.exit()
}

start()
