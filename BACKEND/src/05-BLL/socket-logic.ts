import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import Vacation from "../03-Models/interfaces/vacation-interface";

let socketIoServer: SocketIoServer;

function initSocketIo(httpServer: HttpServer): void {
    const options = {
        cors: { origin: "*" }
    };
    socketIoServer = new SocketIoServer(httpServer, options);
    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("One client has been connected...");
        socket.on("disconnect", () => {
            console.log("One client has been disconnected...");
        });
    });
}

function emitAddProduct(vacation: Vacation): void {
    socketIoServer.sockets.emit("admin-add-product", vacation);
}

function emitUpdateProduct(vacation: Vacation): void {
    socketIoServer.sockets.emit("admin-update-product", vacation);
}

function emitDeleteProduct(id: String): void {
    socketIoServer.sockets.emit("admin-delete-product", id);
}

function emitUseRegistered(token: String): void {
    socketIoServer.sockets.emit("user-registered", token);
}

function emitUseLogged(token: String): void {
    socketIoServer.sockets.emit("user-logged", token);
}


export default {
    initSocketIo, 
    emitAddProduct,
    emitUpdateProduct,
    emitDeleteProduct,
    emitUseRegistered,
    emitUseLogged,
}