import mysql from "mysql2/promise";
import dotenv from "dotenv"
dotenv.config()

export async function initDb() {
  const initConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    port: process.env.DB_PORT,
  });
  console.log("created database")
  const CREATE_DB_QUERY = `CREATE DATABASE IF NOT EXISTS message;`;

  const USE_DB_QUERY = "USE message;";

  const CREATE_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username  VARCHAR(255) NOT NULL,
        cipher_type TEXT,
        encrypted_text TEXT,
        inserted_at DATETIME
      )
    `;

  await initConnection.query(CREATE_DB_QUERY);
  await initConnection.query(USE_DB_QUERY);
  await initConnection.query(CREATE_TABLE_QUERY);

  await initConnection.end();
}
let conn = null;

export async function getConn() {
  if (conn) return conn;
  else {
    conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: "message",
    });
    return conn;
  }
}