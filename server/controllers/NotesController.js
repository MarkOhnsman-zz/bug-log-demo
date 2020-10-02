import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete('/:id', this.delete)
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      res.send(await notesService.create(req.body))
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      req.body.id = req.params.id
      res.send(await notesService.edit(req.body))
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
      res.send(await notesService.delete(query))
    } catch (error) {
      next(error);
    }
  }
}
