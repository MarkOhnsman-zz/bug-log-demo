import bp from 'body-parser';
import express from 'express';
import Startup from './server/Startup';
import BaseController from './server/utils/BaseController';


export function MockApp(controller) {
  if (!(controller instanceof BaseController)) {
    throw new Error("Invalid Controller, Must provide instance of BaseController")
  }
  let app = express()
  // process.env.AUTH_DOMAIN = "TEST"
  // process.env.AUTH_CLIENT_ID = "TEST"
  // process.env.AUTH_AUDIENCE = "TEST"
  // Startup.ConfigureGlobalMiddleware(app)
  app.use(bp.json({ limit: "50mb" }))
  console.log(controller)
  app.use(controller.mount, controller.router)
  Startup.registerErrorHandlers(app)
  return app
}