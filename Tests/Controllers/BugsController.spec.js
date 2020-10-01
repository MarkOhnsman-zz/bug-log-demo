import ava from 'ava';
import bp from "body-parser";
import express from 'express';
import supertest from 'supertest';
import { BugsController } from '../../server/controllers/BugsController';
import { EstablishFakeDb } from '../../TestDB';


let controller = new BugsController()
const app = express()
app.use(bp.json())
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
    let request = supertest(app)
    let res = await request.get('/api/bugs')
    console.log("bugs original", res.body);
    t.true(Array.isArray(res.body))
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail()
  }
})

ava("Can Post Bug", async (t) => {
  let request = supertest(app)
  let res = await request.post('/api/bugs')
    .send({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    .set('Accept', 'application/json')
  t.truthy(res.body.id)
})


ava("Can Delete Bug", async (t) => {
  let request = supertest(app)
  let res = await request
    .post('/api/bugs')
    .send({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
  let deleted = await request.delete('/api/bugs/' + res.body.id)
  console.log(deleted.body)
  t.true(deleted.body.closed)
})

