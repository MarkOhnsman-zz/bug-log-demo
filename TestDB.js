import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from './server/db/DbConfig';
import { dbContext } from './server/db/DbContext';

const mockMongoose = new MockMongoose(mongoose);

export async function EstablishFakeDb() {
  try {
    await mockMongoose.prepareStorage()
    await DbConnection.connect('mongodb://test/db');
    await dbContext.Profile.create({ name: "Ted Testerson", email: "test@test.com" })
  } catch (e) {
    console.error(e)
  }
}