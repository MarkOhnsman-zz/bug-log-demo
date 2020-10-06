import { MockAuth0Provider } from '@bcwdev/auth0provider';
import ava from 'ava';
import supertest from 'supertest';
import { BugsController } from '../../server/controllers/BugsController';
import { dbContext } from '../../server/db/DbContext';
import { MockApp } from '../_config/_mockApp';
import { EstablishFakeDb, Teardown } from '../_config/_mockDb';
import { USERS } from '../_config/_users';

const app = MockApp(new BugsController())
const authMock = new MockAuth0Provider()
const request = supertest(app)

ava.before('Setup DB', async t => {
  try {
    await EstablishFakeDb()
    t.pass();
  } catch (error) {
    console.error("[FAKEDB ERROR]", error)
    t.fail()
  }
});

ava.serial("Must be logged in to Get Bugs", async (t) => {
  try {
    let res = await request.get('/api/bugs')
    t.is(res.status, 401, `Server responded with ${res.status}: ${res.error} instead of 401: Unauthorized`)
  } catch (error) {
    console.error('[ERROR]', error.body)
    t.fail(error.message)
  }
})

ava.serial("Logged in user Can Get Bugs", async (t) => {
  try {
    authMock.setMockUserInfo(USERS.standard)
    let res = await request.get('/api/bugs')
    t.is(res.statusType, 2, `Server responded with ${res.status}: ${res.error} instead of 200: Ok`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava.serial("Logged in user Can Create a Bug", async (t) => {
  try {
    authMock.setMockUserInfo(USERS.standard)
    let res = await request.post('/api/bugs').send({ title: "Bugs", description: "Here be bugs" })
    t.is(res.body.creatorEmail, USERS.standard.email, `Server attaches correct user email to bug`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava.serial("Logged in user Can Edit a Bug", async (t) => {
  try {
    let bug = await dbContext.Bugs.create({ title: "Bug", description: "editing", creatorEmail: USERS.standard.email })
    authMock.setMockUserInfo(USERS.standard)
    let res = await request.put('/api/bugs/' + bug.id).send({ title: "Edit" })
    t.is(res.body.title, "Edit", `Server edits correct bug`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava.after("Teardown", async t => {
  await delay()
  await Teardown()
  t.pass("BugsController Completed")
})

async function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}