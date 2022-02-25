import express from "express";
import cors from "cors";
import errorsHandler from "./02-Middleware/errors-handler";
import bodyParser from 'body-parser';
import authController from "./06-Controllers/auth-controller";
import vacationController from "./06-Controllers/vacation-controller";
import userController from "./06-Controllers/users-controller";
import db from './04-DAL/dal';
import verifyToken from "./02-Middleware/verify-token";

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
server.use(express.json());
db();

server.use( "/api/auth", authController);
server.use( "/api/user", userController);
server.use( "/api/vacation",verifyToken ,vacationController);

server.use(errorsHandler);

export default server;
 

