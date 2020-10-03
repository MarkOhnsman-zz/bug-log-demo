import ava from 'ava'
import express from 'express'
import Startup from '../server/Startup'

ava("application startup", (t) => {
  try {
    let server = express()
    Startup.ConfigureGlobalMiddleware(server)
    Startup.ConfigureRoutes(server)
    t.pass("Great Success")
  } catch (error) {
    console.error(error)
    t.fail("Server failed to build")
  }
})