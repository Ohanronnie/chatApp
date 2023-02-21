import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(
  process.env.MONGOURL!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected")
);
const ChatSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  chats: {
    message: [
      {
        /*      String: {
        from: String,
        to: String,
        message: String,
        createdAt: {
          type: Date,
          default: Date.now()
        }
      }*/
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
