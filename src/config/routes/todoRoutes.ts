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

  todoUpdate = async (req: Request, res: Response) => {
    let { id } = req.body;
    await Todo.findByIdAndUpdate(id, req.body, (err, doc) => {
      if (err)
        res.json({
          message: "failed",
          err
        });
      else res.json(doc);
    });
  };

  todoDelete = async (req: Request, res: Response) => {
    let { id } = req.body;
    await Todo.findByIdAndDelete(id, (err, doc) => {
      if (err)
        res.json({
          message: "failed",
          err
        });
      else res.json(doc);
    });
  };

  todoAll = async (req: Request, res: Response) => {
    let todos = await Todo.find();
    res.json(todos);
  };
  todoOfId = async (req: Request, res: Response) => {
    let todoId: string = req.params.id;
    let todos = await Todo.findById(todoId);
    res.json(todos);
  };

  routes() {
    console.log("Todo routes initalized");
    this.router.get("/", this.todoHome);
    this.router.get("/all", this.todoAll);
    this.router.get("/:id", this.todoOfId);
    this.router.post("/create", this.todoCreate);
    this.router.put("/update", this.todoUpdate);
    this.router.delete("/delete", this.todoDelete);
  }

  getApis = () => this.router;
}

const todoRoutes = new TodoRoutes();

export default todoRoutes;
