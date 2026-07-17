import express from "express";
import { Error } from "mongoose";
import { apiTesting } from "../controller/auth.controller.js";

const authRouters = express.Router();

authRouters.get('/test', apiTesting)

export default authRouters;