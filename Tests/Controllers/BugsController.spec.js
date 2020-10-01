import ava from 'ava';
import express from 'express';
import supertest from 'supertest';
import { BugsController } from '../../server/controllers/BugsController';
import { dbContext } from '../../server/db/DbContext';
import { EstablishFakeDb } from '../../TestDB';

let controller = new BugsController()
const app = express()
app.use(controller.mount, controller.router)

ava.before('Setup DB', async t => {
  await EstablishFakeDb()
  t.pass();
});

ava("Has Router Instance", (t) => {
  t.is(typeof controller.router, 'function')
})


ava("Can Get Bugs", async (t) => {
  try {
    let server = supertest(app)
    let res = await server.get('/api/bugs')
    t.truthy(Array.isArray(res.body))
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail()
  }
})

ava("Can Post Bug", async (t) => {
  let bug = await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
  t.assert(bug.id)
})