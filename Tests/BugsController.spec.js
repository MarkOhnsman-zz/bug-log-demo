import ava from 'ava'
import express from 'express'
import supertest from 'supertest'
import { BugsController } from '../server/controllers/BugsController'

let controller = new BugsController()
const app = express()
app.use(controller.mount, controller.router)

ava("Has Router Instance", (t) => {
  t.is(typeof controller.router, 'function')
})

ava("Can Get Bugs", async (t) => {
  try {
    let server = supertest(app)
    console.log('Getting bugs')
    let res = await server.get('/api/bugs')
    console.log("response", res.body)
    t.pass(res.body)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail()
  }
})


  // it("Can Get Bugs", async () => {
  //   let res = await supertest(controller.router).get("/api/bugs")
  //   assert.isArray(res.body)
  // })

  // it("Can add controllers manually", (done) => {
  //   let x = new Area({
  //     name: "Adding Controllers",
  //   })
  //   x.AddControllers({ KittensController })
  //   session(x.expressApp)
  //     .request("get", "/kittens")
  //     .timeout(2000)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .end(done)
  // })

  // it("Register and Call controller methods with api call", (done) => {
  //   session(testArea.expressApp)
  //     .request("get", "/kittens")
  //     .timeout(2000)
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .end(done)
  // })
//})