import express from "express";
import { decryptMessage, encryptMessage, listMyMessages } from "../controllers/messagesSql.js";


const router = express.Router();

router.get("/", listMyMessages)
router.post("/encrypt", encryptMessage)
router.post("/decrypt", decryptMessage)


export default router