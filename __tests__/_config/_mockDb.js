import DbConnection from '../../server/db/DbConfig';
import MockMongo from './_MockMongo';

async function buildStorage() {
  const mongo = new MockMongo()
  const connectionstring = await mongo.start()
  await DbConnection.connect(connectionstring);
  console.log("\x1b[36m%s\x1b[0m", "[CONNECTION ESTABLISHED]");
}

export async function EstablishFakeDb() {
  console.log("Connecting to DB")
  let i = setInterval(() => {
    console.log('\x1b[31m', '  connecting....')
  }, 300)
  try {
    await buildStorage()
  } catch (e) {
    console.error('\x1b[31m', '[CONNECTION ERROR]', e)
  } finally {
    clearInterval(i)
  }
}


