import express, { Application } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import todoRoutes from "./routes/todoRoutes";

class Server {
  private app: Application;
  private port: string | number;
  private dbUrl: string;
  constructor() {
    console.log("init constructor");
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.dbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/todo-db";
  }

  async config() {
    console.log("init config");
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    const db = await mongoose.connect(this.dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
    mongoose.connection.once("connecting", () => console.log("CONNECTING"));
    mongoose.connection.once("connected", connect => console.log(connect));
    mongoose.connection.once("error", err => console.error(err));
  }

  routes() {
    console.log("init routes");
    this.app.use("/api/todo", todoRoutes.getApis());
    this.app.use((req, res) => {
      res.send("hello world");
    });
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Serving @${this.port}`);
    });
  }
}

const server = new Server();
server.config();
server.routes();
server.start();
