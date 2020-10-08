import ava from 'ava';
import { dbContext } from '../../server/db/DbContext';
import { bugsService } from '../../server/services/BugsService';
import { EstablishFakeDb, Teardown } from '../_config/_mockDb';

const _sut = bugsService;

ava.before('Setup DB', async t => {
  try {
    await EstablishFakeDb()
    t.pass();
  } catch (error) {
    console.error("[FAKEDB ERROR]", error)
    t.fail()
  }
});

ava.serial("BugService Functionality Adheres to Testing Requirements", (t) => {
  t.is(typeof _sut.findAll, "function", "findAll must be a function")
  t.is(typeof _sut.findById, "function", "findById must be a function")
  t.is(typeof _sut.create, "function", "create must be a function")
  t.is(typeof _sut.edit, "function", "edit must be a function")
  t.is(typeof _sut.delete, "function", "delete must be a function")
})

ava("findAll Bugs Returns an Array of bugs", async (t) => {
  try {
    await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    let data = await _sut.findAll({})
    if (!Array.isArray(data)) {
      throw new Error("findAll is not returning an array")
    }
    t.true(data.length > 0, "Find returning empty array")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("findById Bugs Returns A Specific bug", async (t) => {
  try {
    const bug = await dbContext.Bugs.create({ title: "Single Bug", description: "Here be bugs", creatorEmail: "test@test.com" })
    let data = await _sut.findById(bug.id)
    if (typeof data !== 'object') {
      throw new Error("findById is not returning an object")
    }
    // @ts-ignore
    t.is(bug.title, "Single Bug", "findById not returning the right bug")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("findById Bugs Throws an Error when Given a Bad Id", async (t) => {
  try {
    await t.throwsAsync(_sut.findById("5f4ec55a9d87ed001709822a"), { instanceOf: Error }, "Did not throw an error with a bad Id")
    // @ts-ignore
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("Can Create Bugs", async (t) => {
  try {
    const bug = await _sut.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    t.truthy(bug.id)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("Can Edit Bug", async (t) => {
  try {
    let bug = await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    let edited = await _sut.edit({ id: bug._id, creatorEmail: "test@test.com", title: "Edited Title" })
    // @ts-ignore
    t.is(edited.title, "Edited Title", `Expected title to be 'Edited Title' but got ${edited.title}`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})


ava("Deleting a bug changes status to 'closed'", async (t) => {
  try {
    let bug = await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    const deleted = await _sut.delete({ _id: bug.id })
    if (!deleted) {
      throw new Error("Bug was not returned")
    }
    // @ts-ignore
    t.true(deleted.closed, "The closed property should be set to true instead of deleting the data")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("Can't edit Deleted Bug", async (t) => {
  try {
    let bug = await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com", closed: true })
    await t.throwsAsync(
      _sut.edit(bug),
      { instanceOf: Error },
      "Service should throw an error when attempting to edit a closed bug")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error)
  }
})

ava("Can't edit Bug you do not own", async (t) => {
  try {
    let bug = await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    // @ts-ignore
    bug.creatorEmail = 'imposter'
    await t.throwsAsync(
      _sut.edit(bug),
      { instanceOf: Error },
      "Service should throw an error when attempting to edit a bug that is not yours"
    )
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error)
  }
})

ava("Can't delete Bug you do not own", async (t) => {
  try {
    let bug = await dbContext.Bugs.create({ title: "Bugs", description: "Here be bugs", creatorEmail: "test@test.com" })
    await t.throwsAsync(
      _sut.delete({ id: bug._id, creatorEmail: "imposter" }),
      { instanceOf: Error },
      "Service should throw an error when attempting to delete a bug that is not yours")
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