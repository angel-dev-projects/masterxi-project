import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";
import { League } from "./league";

export class UserLeagues extends Model {
  public id!: number;
}

UserLeagues.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "user_leagues",
  }
);

User.belongsToMany(League, {
  through: UserLeagues,
});

League.belongsToMany(User, {
  through: UserLeagues,
});
