import { Request, Response, NextFunction, Router } from "express";

class TodoRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  notesHome = (req: Request, res: Response) => {
    res.send(
      "<h1>" +
        "<br>/api/todo=> description" +
        "<br>/api/todo/all=> all task" +
        "<br>/api/todo/create=> add a task" +
        "<br>/api/todo/delete=> delete a task" +
        "<br>/api/todo/update=> update a task" +
        "</h1>"
    );
  };

  routes() {
    console.log("Todo routes initalized");
    this.router.get("/", this.notesHome);
  }

  getApis = () => this.router;
}

const todoRoutes = new TodoRoutes();

export default todoRoutes;
