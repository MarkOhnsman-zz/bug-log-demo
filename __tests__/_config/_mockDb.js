import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from '../../server/db/DbConfig';

const mockMongoose = new MockMongoose(mongoose);

export async function EstablishFakeDb() {
  try {
    await mockMongoose.prepareStorage()
    await DbConnection.connect('mongodb://test/db');
  } catch (e) {
    console.error(e)
  }
}


