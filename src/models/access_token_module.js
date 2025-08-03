import { DataTypes } from "sequelize";
import sequelize from "../sql/db_connect";

export const access_token = sequelize.define(
  "access_tokens",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_time: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    underscored: false,
  }
);

export const createAccessToken = async (userId, token, expireTime, dbTransaction) => {
  try {
    const accessTokenData = await access_token.create(
      {
        user_id: userId,
        token: token,
        expiry_time: expireTime,
      },
      { transaction: dbTransaction }
    );
    return accessTokenData;
  } catch (error) {
    console.error("Error creating access token:", error.message);
    throw error;
  }
};

// await accessToken.sync({alter:1})