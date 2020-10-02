import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors";

class BugsService {
  async findAll(query = {}) {
    let bugs = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
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
    let value = await dbContext.Bugs.findOne({ _id: body.id })
    if (!value) {
      throw new BadRequest("Invalid Id")
    }
    if (value.creatorEmail !== body.creatorEmail) {
      throw new UnAuthorized("Cannot edit a bug you did not create")
    }
    if (value.closed) {
      throw new Forbidden("Cannot edit closed bug")
    }
    let data = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { runValidators: true, new: true })
    return data;
  }
  async delete(query) {
    let value = await dbContext.Bugs.findOneAndUpdate(query, { closed: true }, { new: true })
    if (!value) {
      throw new BadRequest("Invalid Id")
    }
    return value;
  }
}

export const bugsService = new BugsService();
