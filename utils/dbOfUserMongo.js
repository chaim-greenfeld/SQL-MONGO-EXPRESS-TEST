import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.MONGODB_URI 

const DB_NAME = "user";
const COLLECTION_NAME = "users"

let mongocClient = null;
let mongoConn = null;

export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(MONGO_URL);
    await mongocClient.connect();
    console.log('mongo connected')
    mongoConn = mongocClient.db(DB_NAME);
    
    const usersCollection = mongoConn.collection(COLLECTION_NAME);
    await usersCollection.createIndex({ username: 1 }, { unique: true })
    console.log("Database initialized and unique index created on 'username' ")
    } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  } finally {
    await closeConnection();
  }
}

export async function getMongoDb() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(MONGO_URL);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}

export async function closeConnection() {
  if (mongocClient) {
    await mongocClient.close();
    mongocClient = null;
    mongoConn = null;
  }
}
