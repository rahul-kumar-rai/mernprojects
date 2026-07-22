import express from "express";
import { apiTesting} from "../controller/auth.controller.js";
import {registerUsers } from "../controller/register.controller.js";

const authRouters = express.Router();

authRouters.get('/test', apiTesting)
// authRouters.post('/login',loginUsers );
authRouters.post("/register", registerUsers);

export default authRouters;