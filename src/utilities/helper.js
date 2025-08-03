import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jwtConfig = process.env.JWT_SECRET_KEY

export const generateToken = async (user_id, is_admin, company_id, expTime) => {
  return jwt.sign({ user_id, is_admin, company_id }, jwtConfig, {
    expiresIn: expTime,
  });
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, jwtConfig);
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};

export const success = (res, statusCode, message, data = null) => {
  let result = {
    status: "1",
    status_text: "success",
    message: message,
  };

  if (data != null || data == []) {
    result["data"] = data;
  }

  return res.status(statusCode).json(result);
};

export const failed = (res, statusCode, message, data = null) => {
  let result = {
    status: 0,
    message: message || "something went wrong",
  };

  if (data != null || data == []) {
    result["data"] = data;
  }

  return res.status(statusCode).json(result);
};