import express, { Application } from "express";
import routesUser from "../routes/user";
import cors from "cors";
import { User } from "./user";

export class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = this.getPort();
    this.middlewares();
    this.routes();
    this.dbConnect();
    this.listen();
  }

  private getPort(): number {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    return port;
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`);
    });
  }

  private routes(): void {
    this.app.use("/api/users", routesUser);

    this.app.use(cors());
  }

  private middlewares(): void {
    this.app.use(express.json());

    this.app.use(cors())
  }

  private async dbConnect(): Promise<void> {
    try {
      await User.sync();
      console.log("Database connection established and synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Server;
