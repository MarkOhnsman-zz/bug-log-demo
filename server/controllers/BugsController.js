import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import BaseController from "../utils/BaseController";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/comments", this.getCommentsByBugId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete('/:id', this.delete)
  }
  async getAll(req, res, next) {
    try {
      let data = await bugsService.findAll(req.query)
      res.send(data)
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByBugId(req, res, next) {
    try {
      res.send(await bugsService.findAll({ bug: req.params.id }))
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      res.send(await bugsService.create(req.body))
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      req.body.id = req.params.id
      res.send(await bugsService.edit(req.body))
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const query = {
        creatorEmail: req.userInfo.email,
        _id: req.params.id
      }
      res.send(await bugsService.delete(query))
    } catch (error) {
      next(error);
    }
  }
}
