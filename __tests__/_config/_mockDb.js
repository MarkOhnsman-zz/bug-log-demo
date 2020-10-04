import DbConnection from '../../server/db/DbConfig';
import { COLORS } from './_ConsoleColors';
import MockMongo from './_MockMongo';

const mongo = new MockMongo()
async function buildStorage() {
  const connectionstring = await mongo.start()
  await DbConnection.connect(connectionstring);
  console.log(COLORS.Cyan, "[CONNECTION ESTABLISHED]");
}

export async function EstablishFakeDb() {
  console.log(COLORS.Green, "Connecting to DB")
  let i = setInterval(() => {
    console.log(COLORS.Red, '  connecting....')
  }, 300)
  try {
    await buildStorage()
  } catch (e) {
    console.error(COLORS.Red, '[CONNECTION ERROR]', e)
  } finally {
    clearInterval(i)
  }
}

export async function Teardown() {
  await DbConnection.disconnect()
  await mongo.stop()
}


