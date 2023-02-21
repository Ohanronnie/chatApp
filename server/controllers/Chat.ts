import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../model/User.js";
import Chat from '../model/Chat.js';
mongoose.connect(
  process.env.MONGOURL!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected")
);
const chat = async (req: Request, res: Response): Promise<void> => {
  const result = await User.findOne({ email: req.body.email }).select("_id");
  console.log(result);
  result
    ? res.json({ status: "OK", _id: result._id || result })
    : res.json({ status: "ERR" });
};
const me = async (req: Request, res: Response): Promise<void> => {

  const result = await User.findOne({
    email: req.signedCookies.c_user.mail,
    pass: req.signedCookies.c_user.pass,
  }).select("_id");
  console.log([
    req.signedCookies.c_user,
    Object.keys(req.signedCookies),
    result,
  ]);
  res.json(result);
};
const message = async (req: Request,res: Response): Promise<void> => {
  const result = await Chat.findOne({email: req.signedCookies.c_user.mail})!;
  console.log(result);
  const obj = result?.chats.message.forEach((e: any) => {
    if(e.hasOwnProperty(req.body.url)){
      res.json(e[req.body.url])
    }
  })
}
const update = async (req: Request,res: Response): Promise<void> => {
  const result = await Chat.findOne({email: req.signedCookies.c_user.mail})!;
  const users: string[] = [];
  const userData: object[] = []; 
  interface int{
    _id: string,                                                            firstName: string,                                                            lastName: string,                                                             lastMessage?: object
  }
  const obj = result?.chats.message.forEach((e: any) => {
    users.push((Object.keys(e) as unknown) as string)
  });
  users.forEach(async (e: string,f: any,g: any) => {
    let data: {
      _id: string,
      firstName: string,
      lastName: string,
      lastMessage?: object
    } = await User.findOne({_id: e}).select("firstName lastName")!;
    let y: int;
    result.chats.message.forEach((e: any) => {
      if(e.hasOwnProperty(data!._id)){
//        data = {...data,lastMessage: e![data!._id][e![data!._id].length -}
      let x = e[data!._id][e[data!._id].length-1];
      y = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        lastMessage: x
      }
      console.log(y);
      userData.push(y)
      }
    });
    console.log(data);
    console.log(userData);
    if(f === g.length-1){
      res.json(userData)
    }
  });
//  res.json(userData)
}
const idUser = async (req: Request,res: Response): Promise<void> => {
  const id = req!.body!.id;
  const result = await User.findOne({_id: id}).select("firstName lastName");
  res.json(result)
}
export { chat as chat, me as me, message as message, update as update, idUser as user};
