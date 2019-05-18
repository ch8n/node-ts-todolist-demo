import { Request, Response, NextFunction, Router } from "express";
import Todo from "../models/todo";
import { json } from "body-parser";
class TodoRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  todoHome = (req: Request, res: Response) => {
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

  todoCreate = async (req: Request, res: Response) => {
    try {
      let { title, desc, proirty } = req.body;
      let todo = new Todo({ title, desc, proirty });
      await todo.save();
      res.json({
        message: "successfully created",
        todo: todo
      });
    } catch (e) {
      res.json(e);
    }
  };

  todoUpdate = (req: Request, res: Response) => {
    res.json(req.body);
  };

  todoDelete = (req: Request, res: Response) => {
    res.json(req.body);
  };

  todoAll = async (req: Request, res: Response) => {
    let todos = await Todo.find();
    res.json(todos);
  };

  routes() {
    console.log("Todo routes initalized");
    this.router.get("/", this.todoHome);
    this.router.get("/all", this.todoAll);
    this.router.post("/create", this.todoCreate);
    this.router.put("/update", this.todoUpdate);
    this.router.delete("/delete", this.todoDelete);
  }

  getApis = () => this.router;
}

const todoRoutes = new TodoRoutes();

export default todoRoutes;
