
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //remove whitespace from both ends of a string
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true //convert the email to lowercase before saving it to the database
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    read:{

        type: Boolean,
        default: false
    }

},
{ timestamps: true }//time created and updated
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
export{};//make this file a module to avoid TypeScript errors about isolated modules