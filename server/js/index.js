import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import signup from "./routes/signup.js";
import cookieparser from "cookie-parser";
import api from "./routes/api.js";
import Chat from "./model/Chat.js";
import User from "./model/User.js";
const app = express();
app.use('/images', express.static('files'));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
}));
app.use(cookieparser("tp07089314662"));
app.use(async (req, res, next) => {
    let mail = req.signedCookies?.c_user?.mail;
    let pass = req.signedCookies?.c_user?.pass;
    let auth = await User.findOne({ email: mail, pass: pass });
    if (req.originalUrl === '/') {
        if (!mail || !pass) {
            res.json({
                status: "BAD"
            });
            console.log(899999);
        }
        else if (!mail && !pass) {
            //    res.redirect('/register/login');
            console.log(Date.now());
        }
        else if (mail && pass && auth) {
            next();
        }
    }
    else if (req.originalUrl === '/register/userlist' || req.originalUrl === '/register/login' || req.originalUrl === '/register/signup') {
        next();
    }
    else if (mail && pass && auth) {
        next();
    }
});
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
    cookie: true
});
io.on("connection", (socket) => {
    console.log(`${socket.id} just connected`);
    //  var cookief = socket.handshake.headers.cookie; 
    socket.on("disconnect", (data) => {
        console.log("a user just disconnect");
    });
    socket.on("message", (data) => {
        console.log(data);
        socket.emit("messages", data);
    });
    socket.on("newMessage", async (data) => {
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
            socket.emit('new_message', { ...data, createdAt: date });
            const response = await result.save();
            return;
        }
        console.log(user.chats.message);
        user.chats.message.forEach(async (e) => {
            if (e.hasOwnProperty(data.from)) {
                e[data.from].push({
                    ...data,
                    createdAt: date,
                });
                //socket.emit("new_message", { ...data, createdAt: date });
            }
            else if (!e.hasOwnProperty(data.from)) {
                e[data.from] = [{
                        ...data,
                        createdAt: date
                    }];
                //socket.emit("new_message", {...data, createdAt: date})
            }
        });
        senderUser.chats.message.forEach(async (e) => {
            if (e.hasOwnProperty(data.to)) {
                e[data.to].push({
                    ...data,
                    createdAt: date,
                });
                socket.emit("new_message", { ...data, createdAt: date });
            }
            else if (!e.hasOwnProperty(data.to)) {
                e[data.to] = [{
                        ...date,
                        createdAt: date
                    }];
                socket.emit("new_message", { ...data, createdAt: date });
            }
        });
        try {
            await Chat.updateOne({ email: mail.email }, user);
            await Chat.updateOne({ email: senderMail.email }, senderUser);
        }
        catch (err) {
            console.log(err);
        }
    });
});
/*app.get("/", (req, res) => {
  res.json({
    name: "Hello world",
    c: req.cookies,
  });
});*/
app.use("/register", signup);
app.use("/api", api);
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
