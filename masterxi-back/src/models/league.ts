import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connection";

export class League extends Model {
  public id!: number;
  public name!: string;
}

League.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "leagues",
  }
);
