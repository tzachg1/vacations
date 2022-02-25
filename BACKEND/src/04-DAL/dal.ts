import server from "../app";
import mongoose from "mongoose";
import socketLogic from "../05-BLL/socket-logic";
const port = process.env.PORT || 3000;

function db():void {
    mongoose.connect("mongodb+srv://tzachag:0527464756@codename.2p6jt.mongodb.net/vacationProject?retryWrites=true&w=majority").then(result => {
        const httpServer = server.listen(port,() => {
            socketLogic.initSocketIo(httpServer);
            console.log('server is up on port ' + port)
            
        })
    }).catch(err => {console.log(err)})
}

export default db;