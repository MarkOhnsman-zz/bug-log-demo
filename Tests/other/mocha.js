import ava from 'ava';
import { EstablishFakeDb } from '../_config/_MockDB';

let mockMongoose = null

ava.before('Setup DB', async t => {
  try {
    mockMongoose = await EstablishFakeDb()
    t.pass();
  } catch (error) {
    console.error("[FAKEDB ERROR]", error)
    t.fail()
  }
});

ava("test disconnect", (t) => {
  mockMongoose.mockConnectCalls("disconnected")
  t.pass()
})