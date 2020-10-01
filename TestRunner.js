import ava from 'ava';
import { MockMongoose } from 'mock-mongoose';
import mongoose from 'mongoose';
import DbConnection from './server/db/DbConfig';
var mockMongoose = new MockMongoose(mongoose);

console.log("me first")
ava.serial.before(async (t) => {
  try {
    await mockMongoose.prepareStorage()
    await DbConnection.connect('mongodb://test/db');
    t.pass()
  } catch (e) {
    console.error(e)
  }
})

ava('Init Tests', t => {
  t.pass();
});