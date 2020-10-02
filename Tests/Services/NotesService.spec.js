import ava from 'ava';
import { dbContext } from '../../server/db/DbContext';
import { notesService } from '../../server/services/NotesService';
import { EstablishFakeDb } from '../../TestDB';

const _sut = notesService;
let _bug = {}

ava.before('Setup DB', async t => {
  try {
    await EstablishFakeDb()
    t.pass();
    _bug = await dbContext.Bugs.create({ title: "Bug", description: "Here be bugs", creatorEmail: "test@test.com" })
  } catch (error) {
    console.error("[FAKEDB ERROR]", error)
    t.fail()
  }
});

ava("NoteService Functionality Adheres to Testing Requirements", (t) => {
  t.is(typeof _sut.findAll, "function", "findAll must be a function")
  t.is(typeof _sut.create, "function", "create must be a function")
  t.is(typeof _sut.edit, "function", "edit must be a function")
  t.is(typeof _sut.delete, "function", "delete must be a function")
})

ava("findAll Notes Returns an Array of notes", async (t) => {
  try {
    await dbContext.Notes.create({ bug: _bug.id, body: "Here be notes", creatorEmail: "test@test.com" })
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

ava("Can Create Notes", async (t) => {
  try {
    const bug = await _sut.create({ bug: _bug.id, body: "Here be notes", creatorEmail: "test@test.com" })
    t.truthy(bug.id)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("Can Edit Note", async (t) => {
  try {
    let note = await dbContext.Notes.create({ bug: _bug.id, body: "Here be notes", creatorEmail: "test@test.com" })
    let edited = await _sut.edit({ id: note._id, creatorEmail: "test@test.com", body: "Edited Note" })
    t.is(edited.body, "Edited Note", `Expected body to be 'Edited Note' but got ${edited.body}`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("Can Delete a Note", async (t) => {
  try {
    let bug = await dbContext.Notes.create({ bug: _bug.id, body: "Here be notes", creatorEmail: "test@test.com" })
    await _sut.delete({ _id: bug._id })
    let deleted = await dbContext.Notes.findById(bug._id)
    t.is(deleted, null, "Bug was not deleted from DB")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

ava("Can't edit Note you do not own", async (t) => {
  try {
    let note = await dbContext.Notes.create({ bug: _bug.id, body: "Here be notes", creatorEmail: "test@test.com" })
    note.creatorEmail = 'imposter'
    await t.throwsAsync(async () => {
      await _sut.edit(note)
    }, { instanceOf: Error }, "Service should throw an error when attempting to edit a note that is not yours")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error)
  }
})

ava("Can't delete Note you do not own", async (t) => {
  try {
    let note = await dbContext.Notes.create({ bug: _bug.id, body: "Here be notes", creatorEmail: "test@test.com" })
    await t.throwsAsync(async () => {
      await _sut.delete({ id: note._id, creatorEmail: "imposter" })
    }, { instanceOf: Error }, "Service should throw an error when attempting to delete a note that is not yours")
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})

