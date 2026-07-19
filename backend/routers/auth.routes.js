import express from "express";
import { apiTesting, loginUsers } from "../controller/auth.controller.js";

const authRouters = express.Router();

authRouters.get('/test', apiTesting)
authRouters.post('/login', loginUsers);

export default authRouters;