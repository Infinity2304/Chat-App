import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: ["https://sendit-pcv3.onrender.com"],
        methods: ["GET","POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; //{userId: socketId}

io.on('connection', (socket) =>{
    console.log('a user connected',socket.id);

    const userId = socket.handshake.query.userId; // getting the userId from the query params

    if(userId != "undefined") userSocketMap[userId] = socket.id; // adding the user to the userSocketMap

    io.emit('getOnlineUsers',Object.keys(userSocketMap)); // sending the userSocketMap to all the users if any new users connects

    // socket.on() is used to listen to the events. can be used both on the server and client side
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
        delete userSocketMap[userId]; // removing the user from the userSocketMap
        io.emit('getOnlineUsers',Object.keys(userSocketMap)); // sending the userSocketMap to all the users again if a user disconnects
    })
})

export {app,io,server};