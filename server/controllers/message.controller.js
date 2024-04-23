import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const senderId = req.user._id;  //get the user id
        const { id: receiverId } = req.params
        console.log(receiverId, "receiverId")

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {   //if there is no such a conversation between these two users create one
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            // console.log(conversation.participants, "participants")
            conversation.messages.push(newMessage._id)
            // console.log(conversation.messages)
        }
        await conversation.save()
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error.message)
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")

        if (!conversation) return res.status(404).json([])
        const messages = conversation.messages

        res.status(200).json({
            messages
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error)
    }
}