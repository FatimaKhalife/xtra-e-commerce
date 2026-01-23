import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();


export const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export const testDB = async () => {
    try {
        const connection = await dbPool.getConnection();
        console.log("MySQL connected.");
        connection.release();
    } catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
    
};

testDB();