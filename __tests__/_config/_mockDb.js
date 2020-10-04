import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from '../../server/db/DbConfig';

let done = false
async function buildStorage() {
  if (done) { return console.log("[STORAGE READY]") }
  const mockMongoose = new MockMongoose(mongoose);
  await mockMongoose.prepareStorage()
  await DbConnection.connect(`mongodb://127.0.0.1:27017/test`);
  done = true
}

export async function EstablishFakeDb() {
  console.log("Connecting to DB")
  let i = setInterval(() => {
    console.log('\x1b[31m', '  connecting....')
  }, 300)
  try {
    await buildStorage()
  } catch (e) {
    console.error('\x1b[31m', '[CONNECTION ERROR]', e)
  } finally {
    clearInterval(i)
  }
}


