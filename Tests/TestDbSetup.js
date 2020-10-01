import ava from 'ava';
import { MockMongoose } from 'mock-mongoose';
import mongoose from 'mongoose';
import DbConnection from '../server/db/DbConfig';
var mockMongoose = new MockMongoose(mongoose);

ava.serial.before(async () => {
  try {
    await mockMongoose.prepareStorage()
    await DbConnection.connect('mongodb://test/db');
  } catch (e) {
    console.error(e)
  }
})

ava('Init Tests', t => {
  t.pass();
});