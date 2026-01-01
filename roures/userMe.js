import express from "express";
import { myProfile } from "../controllers/usersMongoMe.js";


const router = express.Router();

router.get("/me", myProfile)


export default router