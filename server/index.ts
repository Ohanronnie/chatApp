import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { message } from "./message";
import signup from "./routes/signup.js";
import cookieparser from "cookie-parser";
import api from "./routes/api.js";
import Chat from "./model/Chat.js";
import User from "./model/User.js";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(cookieparser("tp07089314662"));
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
(async () => {
  let y = await Chat.find({});
  console.log(JSON.stringify(y, null, 2));
})();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`${socket.id} just connected`);
  socket.on("disconnect", (data?: any) => {
    console.log("a user just disconnect");
  });
  socket.on("message", (data: message) => {
    console.log(data);
    socket.emit("messages", data);
  });
  socket.on("newMessage", async (data: any) => {
    const mail = await User.findOne({ _id: data.to }).select("email");
    const senderMail = await User.findOne({ _id: data.from }).select("email");
    const senderUser = await Chat.findOne({ email: senderMail.email });
    const user = await Chat.findOne({ email: mail.email });
    console.log(user);
    const date = new Date();
    if (!user) {
      const result = new Chat({
        email: mail.email,
        chats: {
          message: [
            {
              [data.from]: [
                {
                  from: data.from,
                  to: data.to,
                  message: data.message,
                  createdAt: date,
                },
              ],
            },
          ],
        },
      });

      const response = await result.save();
      
    }
    if (!senderUser) {
      const result = new Chat({
        email: senderMail.email,
        chats: {
          message: [
            {
              [data.to]: [
                {
                  from: data.from,
                  to: data.to,
                  message: data.message,
                  createdAt: date,
                },
              ],
            },
          ],
        },
      });

      const response = await result.save();
      return;
    }

    user!.chats!.message.forEach(async (e: any) => {
      if (e.hasOwnProperty(data.from)) {
        e[data.from].push({
          ...data,
          createdAt: date,
        });
        socket.emit('new_message',{...data,createdAt: date})
      }
    });
    senderUser!.chats!.message.forEach(async (e: any) => {
      if (e.hasOwnProperty(data.to)) {
        e[data.to].push({
          ...data,
          createdAt: date,
        });
      }
    });
    try {
      await Chat.updateOne({ email: mail.email }, user);
      await Chat.updateOne({ email: senderMail.email }, senderUser);
    } catch (err) {
      console.log(err);
    }
  });
});
app.get("/", (req, res) => {
  res.json({
    name: "Hello world",
    c: req.cookies,
  });
});
app!.use("/register", signup);
app!.use("/api", api);
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
