import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import fileupload from "express-fileupload";
import { user, chat, msgUser, message, me, update, details, setDetails, idImg } from "../controllers/Chat.js";
import { Profile } from '../controllers/UpdateProfile.js';
/*const express = require('express');
const cors = require('cors');*/
const app = express.Router();
app.use(fileupload({
    createParentPath: true,
}));
app.use(cookieparser());
/*const bodyparser = require('body-parser');
const mongo = require('mongodb').MongoClient;*/
/*require('dotenv').config();
const url = process.env.MONGOURL;*/
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
/*import {signup,login,user} from '../controllers/Signup.js';
app.post('/signup',signup)
app.post('/login',login)
app.post('/userlist', user)*/
app.post("/chats", chat);
app.post("/me", me);
app.post("/message", message);
app.post("/friends", update);
app.post("/userid", user);
app.post('/details', details);
app.post('/setDetails', setDetails);
app.post('/changeProfile', Profile);
app.post('/idImg', idImg);
app.post('/msgUser', msgUser);
export default app;
console.log(799);
