"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bcryptjs from "bcryptjs";
import { dbConnection } from "./mongo.js";
import postRoutes from "../src/post/post.routes.js";
import commentRoutes from "../src/comment/comment.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.postPath = "/programmers-diary/v1/post";
    this.commentPath = "/programmers-diary/v1/comment";

    this.middlewares();
    this.connectDB();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.postPath, postRoutes);
    this.app.use(this.commentPath, commentRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }
}

export default Server;
