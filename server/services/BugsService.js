import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async findAll(query = {}) {
    console.log('service request for bugs')
    let bugs = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    console.log("bugs:", bugs)
    return bugs;
  }
  async findById(id) {
    let value = await dbContext.Bugs.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  async create(body) {
    return await dbContext.Bugs.create(body);
  }
  async edit(body) {
    let value = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorEmail: body.creatorEmail }, body, { runValidators: true, new: true })
    if (!value) {
      throw new BadRequest("Invalid Id")
    }
    return value;
  }
  async delete(query) {
    let value = await dbContext.Bugs.findOneAndDelete(query)
    if (!value) {
      throw new BadRequest("Invalid Id")
    }
    return value;
  }
}

export const bugsService = new BugsService();
