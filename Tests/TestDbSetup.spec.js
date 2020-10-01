import ava from 'ava';
import { MockMongoose } from 'mock-mongoose';
import mongoose from "mongoose";
import DbConnection from '../server/db/DbConfig';
import { dbContext } from '../server/db/DbContext';
let m = null
export const mockMongoose = new MockMongoose(mongoose);

async function setup() {
  try {
    await mockMongoose.prepareStorage()
    m = await DbConnection.connect('mongodb://test/db');
    await dbContext.Profile.create({ "name": "ted", email: "testbug@test.com" })
    let bug = await dbContext.Bugs.create({ title: "test", description: "test bug", creatorEmail: "testbug@test.com" })
    let bugs = await dbContext.Bugs.find({}).populate(
      "creator",
      "name picture"
    );
    console.log("bugs", bugs)
  } catch (e) {
    console.error(e)
  }
}

ava('Init Tests', async t => {
  await setup()
  t.pass();
});

ava('Validate Connection', async t => {
  console.log("status", m)
  t.pass();
});