import { MockAuth0Provider } from '@bcwdev/auth0provider';
import ava from 'ava';
import bp from 'body-parser';
// import { MockApp } from '../../ControllerUnderTest';
import express from 'express';
import supertest from 'supertest';
import { BugsController } from '../../server/controllers/BugsController';
import { EstablishFakeDb } from '../../TestDB';

// const _sut = MockApp(new BugsController())
let app = express()
const _sut = new BugsController()
app.use(bp.json())
app.use(_sut.mount, _sut.router)
app.use("*", (req, res, next) => {
  res.send("Default fail")
})
app.use((err, req, res, next) => {
  res.status(err.status || 400).send(err.message)
})




const authMock = new MockAuth0Provider()
const _users = {
  standard: { email: "test@test.com", sub: "1234345", permissions: [], roles: [] },
  admin: { email: "test@test.com", sub: "1234345", permissions: [], roles: ["admin"] },
}

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
    let request = supertest(app)
    let res = await request.get('/api/bugs')
    t.is(res.status, 401, `Server responded with ${res.status}: ${res.error} instead of 401: Unauthorized`)
  } catch (error) {
    console.error('[ERROR]', error.body)
    t.fail(error.message)
  }
})


ava.serial("Logged in user Can Get Bugs", async (t) => {
  try {
    let request = supertest(app)
    authMock.setMockUserInfo(_users.standard)
    let res = await request.get('/api/bugs')
    t.is(res.statusType, 2, `Server responded with ${res.status}: ${res.error} instead of 200: Ok`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})