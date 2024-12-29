import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
} from "sequelize";
import sequelize from "../db/connection";
import { League } from "./league";

export class User extends Model {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public getLeagues!: BelongsToManyGetAssociationsMixin<League>;
  public addLeague!: BelongsToManyAddAssociationMixin<League, number>;
  public removeLeague!: BelongsToManyRemoveAssociationMixin<League, number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
