import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async findAll(query = {}) {
    let bugs = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    return bugs;
  }
  async create(body) {
    return await dbContext.Notes.create(body);
  }
  async edit(body) {
    let value = await dbContext.Notes.findOneAndUpdate({ _id: body.id, creatorEmail: body.creatorEmail }, body, { runValidators: true, new: true })
    if (!value) {
      throw new BadRequest("Invalid Id")
    }
    return value;
  }
  async delete(query) {
    let value = await dbContext.Notes.findOneAndDelete(query)
    if (!value) {
      throw new BadRequest("Invalid Id")
    }
    return value;
  }
}

export const notesService = new NotesService();
