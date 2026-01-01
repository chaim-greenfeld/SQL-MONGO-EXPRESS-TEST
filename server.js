import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import { getConn, initDb } from "./utils/dbOfMessageSQL.js";
import { getMongoDb, initMongoDb } from "./utils/dbOfUserMongo.js";
import usersMongo from "./roures/users.js"
import routMessage from "./roures/messagessql.js"
import routUserMe from "./roures/userMe.js"


dotenv.config()

const app = express();
const PORT = process.env.PORT 


app.use(express.json());

app.use(morgan('tiny'))

app.use(async (req, res, next) => {
  req.mongoConn = await getMongoDb();
  req.sqlconn = await getConn()
  next();
});


app.use("/api/auth", usersMongo)

app.use("/api/messages", routMessage)

app.use("/api/users/", routUserMe)






app.listen(PORT, async () => {
  await initDb();
  await initMongoDb()
  console.log(`Server is running on port ${PORT}...`);
});