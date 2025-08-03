import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import router from './src/routers/routes.js';
import cors from "cors";
import sequelize from './src/sql/db_connect.js';
dotenv.config();

const app = express();
const port = process.env._PORT;
let corsMiddleware = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(router);
app.use(cors(corsMiddleware));


// Start server
app.listen(port, () => {
  console.log(`Server running at http://${ip.address()}:${port}`);
});
