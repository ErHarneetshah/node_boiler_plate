import { DataTypes } from "sequelize";
import sequelize from "../../Database/db_connection.js";

export const user = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    emp_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    socket_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    emp_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emp_country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: " 0 => No, 1 => Yes"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);

// await User.sync({alter:1});