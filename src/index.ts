require('dotenv').config();
import "reflect-metadata";//typeorm 
import cors from 'cors';
import {urlencoded, json} from 'body-parser';
import express from 'express';
import logger from './utils/logger';
import MainController from "./controllers";
import mongoose from 'mongoose';

const server = express()
server.use(json());
server.use(urlencoded({ extended: true }))
//server.use(cors());

// Add headers before the routes are defined
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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