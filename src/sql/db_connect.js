import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function ensureDatabaseExists() {
    const connectionConfig = { host: process.env.DB_HOST, user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD };
    const connection = await mysql.createConnection(connectionConfig);

    try {
        const [databases] = await connection.query('SHOW DATABASES;');
        const dbExists = databases.some((db) => db.Database === process.env.DB_DATABASE); // sends true if matches else false

        if (!dbExists) {
            await connection.query(`CREATE DATABASE \`${process.env.DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE ${process.env.DB_COLLATION};`);
        } else {
            console.log(`Database "${process.env.DB_DATABASE}" already exists.`);
        }
    } finally {
        await connection.end();
    }
}
await ensureDatabaseExists();


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false,
    timezone: '+05:30',
    pool: {
        max: 20,
        min: 2,
        acquire: 30000,
        idle: 60000,
    },
});


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully ----------------------');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;