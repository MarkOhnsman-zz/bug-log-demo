import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from '../../server/db/DbConfig';

let done = false
async function buildStorage() {
  if (done) { return console.log("[STORAGE READY]") }
  const mockMongoose = new MockMongoose(mongoose);
  await mockMongoose.prepareStorage()
  await DbConnection.connect(`mongodb://test/db-${~~(Math.random() * 5000)}`);
  done = true
}

export async function EstablishFakeDb() {
  try {
    console.log("Connecting to DB")
    let i = setInterval(() => {
      console.log('\x1b[31m', '  connecting....')
    }, 300)
    await buildStorage()
    clearInterval(i)
  } catch (e) {
    console.error(e)
  }
}


