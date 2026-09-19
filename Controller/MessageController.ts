const Message = require("../Model/messageModel");
import type { Request, Response } from "express";
 const createMessage = async (req: Request, res: Response) => {
    try {
    const { name, email,subject, message } = req.body;
  //check if all fields are provided and not empty
   if (
  typeof name !== "string" || !name.trim() ||
  typeof email !== "string" || !email.trim() ||
  typeof subject !== "string" || !subject.trim() ||
  typeof message !== "string" || !message.trim()
) {
  return res.status(400).json({
    message: "Please provide all the necessary fields"
  });
}
//validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

   const newMessage = new Message({
        name,
        email,
        subject,
        message
    });
    await newMessage.save();
    res.status(201).json({
        message: "Message received successfully",newMessage
    });
} catch (error: unknown) {
  console.error("Error creating message:", error);
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error
  ) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid message data"
      });
    }
  }
  return res.status(500).json({
    message: "Internal server error"
  });
}
};

/* Get all messages from the database*/

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Successfully fetched messages",
      messages
    });
  } catch (error: unknown) {
    console.error("Error fetching messages:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

/*find by id and update the read status of a message*/

const markMessageAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { read: true },
            { new: true, runValidators: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        return res.status(200).json({
            message: "Message marked as read",
            updatedMessage
        });

    } catch (error: unknown) {
        console.error("Error marking message as read:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "name" in error &&
            error.name === "CastError"
        ) {
            return res.status(400).json({
                message: "Invalid message ID"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
/*find message by id and delete*/

const deleteMessageById = async (req: Request, res: Response) =>{

    try{
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);

        if(!deletedMessage){
            return res.status(404).json({
                message: "Message not found"
            });
        }
        return res.status(200).json({
            message: "Message deleted successfully",
            deletedMessage
        });
    } catch (error: unknown) {
        console.error("Error deleting message:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "name" in error &&
            error.name === "CastError"
        ) {
            return res.status(400).json({
                message: "Invalid message ID"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }

}
module.exports = {
    createMessage,
    getMessages,
    markMessageAsRead,
    deleteMessageById
};