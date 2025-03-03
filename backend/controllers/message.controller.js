import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        //Blocking own messages
        // if(senderId == receiverId){
        //     return res.status(500).json({error: "Can't send message to yourself"});
        // }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        
        //Socket IO functionality
        const receiverSocketId = getReceiverSocketId(receiverId); // get the receivers socket id
        if(receiverSocketId){
            //io.to(socketid).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        //END


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessage = async (req, res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        if(!conversation) return res.status(200).json([]); 

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in get message controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}