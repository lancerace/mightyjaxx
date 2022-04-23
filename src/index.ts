require('dotenv').config();
import "reflect-metadata";//typeorm 
import { json, urlencoded } from "body-parser";
import cors from 'cors';
import express from 'express';
import logger from './utils/logger';
import MainController from "./controllers";
import mongoose from 'mongoose';
const server = express()
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(cors());

server.listen(process.env.PORT || 4200, async () => {
    logger.info(`Server started at PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);

    mongoose.connect(process.env.MONGODB_URI, { maxPoolSize: 10 }).then(
        (connection) => { logger.info("MongoDB connected") },
        err => { logger.error("error:",err); });
})

server.use("/api", MainController);