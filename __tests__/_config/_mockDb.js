import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from '../../server/db/DbConfig';

const mockMongoose = new MockMongoose(mongoose);

export async function EstablishFakeDb() {
  try {
    console.log("Connecting to DB")
    let i = setInterval(() => {
      console.log('connecting....')
    }, 300)
    await mockMongoose.prepareStorage()
    await DbConnection.connect('mongodb://test/db');
    clearInterval(i)
  } catch (e) {
    console.error(e)
  }
}


