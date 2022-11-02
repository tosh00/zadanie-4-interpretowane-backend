import express from "express";
import http from 'http';
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

const router = express();

mongoose.connect(config.mongo.url).then(() => {
    Logging.info("Connected")
    StartServer();
}).catch((e) => {
    Logging.error("Unable to connect to DB: ")
    Logging.error(e)

})

const StartServer = () => {
    
    router.use((req, res, next) => {
        res.on('finish', () => {
            Logging.info(`Incomming -> Url: [${req.url}] - Status: [${req.statusCode}] `)
            
        });
        next();

    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });


    router.get('/ping', (req, res, next) => {
        return res.status(200).json({ message: "pong" })
        

    })

    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    })

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port: ${config.server.port}`)
    })
}


// const router = express();

// //     router.use((req, res, next) => {
// //         res.on('finish', () => {
// //             Logging.info(`Incomming -> Url: [${req.url}] - Status: [${req.statusCode}] `)
// //             next();
// //         })
// //     });

//     router.get('/', (req, res, next) => {
//         return res.status(200).json({ message: "pong" })
        

//     })

//     http.createServer(router).listen(config.server.port, () => {
//         Logging.info(`Server is running on port: ${config.server.port}`)
//     })