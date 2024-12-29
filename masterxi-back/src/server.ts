import express, { Application } from "express";
import routesUser from "./routes/user";
import routesLeagues from "./routes/league";
import cors from "cors";
import { User } from "./models/user";
import { League } from "./models/league";
import { UserLeagues } from "./models/users_leagues";

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
    const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000;
    return port;
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`);
    });
  }

  private routes(): void {
    this.app.use("/api/users", routesUser);
    this.app.use("/api/leagues", routesLeagues);
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private async dbConnect(): Promise<void> {
    try {
      await User.sync();
      await League.sync();
      await UserLeagues.sync();
      console.log("Database connection established and synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Server;
