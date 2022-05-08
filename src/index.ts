require('dotenv').config();
import "reflect-metadata";//typeorm 
import cors from 'cors';
import express from 'express';
import logger from './utils/logger';
import MainController from "./controllers";
import mongoose from 'mongoose';

const server = express()
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(cors());
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.listen(process.env.PORT || 4200, async () => {
    logger.info(`Server started at PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);

    mongoose.connect(process.env.MONGODB_URI, { maxPoolSize: 10 }).then(
        (connection) => { logger.info("MongoDB connected") },
        err => { logger.error("error:",err); });
})

server.use("/api", MainController);

server.use('/', (err, req, res, next) => {
console.log(err);
    if (err?.includes('duplicate key error'))
        res.status(400).send({ message: 'it already exist. please use different value' });
})