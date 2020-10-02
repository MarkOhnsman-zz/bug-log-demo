import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from '../../server/db/DbConfig';
import { dbContext } from '../../server/db/DbContext';


export async function EstablishFakeDb() {
  try {
    const mockMongoose = new MockMongoose(mongoose);
    mockMongoose.helper.setDbVersion("3.2.1")
    await mockMongoose.prepareStorage()
    await DbConnection.connect('mongodb://test/db');
    await dbContext.Profile.create({ name: "Ted Testerson", email: "test@test.com" })
    return mockMongoose
  } catch (e) {
    console.error(e)
  }
}


