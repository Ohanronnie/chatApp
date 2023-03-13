import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../model/User.js";
import Chat from "../model/Chat.js";
/*mongoose.connect(
  process.env.MONGOURL!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected")
);*/
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
const message = async (req: Request, res: Response): Promise<void> => {
  const result = await Chat.findOne({ email: req.signedCookies.c_user.mail })!;
  console.log(result);
  const obj = result?.chats.message.forEach((e: any) => {
    if (e.hasOwnProperty(req.body.url)) {
      res.json(e[req.body.url]);
    }
  });
};
const update = async (req: Request, res: Response): Promise<void> => {
  const result = await Chat.findOne({ email: req.signedCookies.c_user.mail })!;
  let users: string[] = [];
  const userData: object[] = [];
  interface int {
    _id: string;
    firstName: string;
    lastName: string;
    lastMessage?: object;
    cover?: string;
  }
  const obj = result?.chats.message.forEach((e: any) => {
    users = (Object.keys(e) as unknown as string[]);
    console.log(Object.keys(e))
  });
  console.log(users)
  console.log(JSON.stringify(result,null,2));
  users.forEach(async (e: string, f: any, g: any) => {
    let data: {
      _id: string;
      firstName: string;
      lastName: string;
      lastMessage?: object;
      cover?: string;
    } = await User.findOne({ _id: e }).select("firstName lastName cover")!;
    let y: int;
    result.chats.message.forEach((e: any,a: number, b: any[]) => {
      if (e.hasOwnProperty(data!._id)) {
        //        data = {...data,lastMessage: e![data!._id][e![data!._id].length -}
        let x = e[data!._id][e[data!._id].length - 1];
        console.log(x)
        y = {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          lastMessage: x,
          cover: data.cover || "/images/OH-IMG.jpg"
        };
        console.log(y);
        userData.push(y);
        if(f === g.length - 1 && a === b.length - 1){
          res.json(userData);
          console.log(JSON.stringify(userData,null,2))
        }
      }
    });
    console.log(data);
    console.log(JSON.stringify(userData,null,2));
    /*if (f === g.length - 1) {
      res.json(userData);
    }*/
  });
  //  res.json(userData)
};
const idUser = async (req: Request, res: Response): Promise<void> => {
  const id = req!.body!.id;
  const result = await User.findOne({ _id: id }).select("firstName lastName cover");
  res.json(result);
};
const idImg = async (req: Request, res: Response): Promise<void> => {
  const id = req.body!.id;
  const result = await User.findOne({ _id: id}).select("cover");
  res.json(result);
}
const details = async (req: Request,res: Response): Promise<void> => {
  const mail = req.signedCookies.c_user.mail;
  const pass = req.signedCookies.c_user.pass;
  if(!mail && !pass){
    res.json({
      redirect: "login"
    })
    return;
  } else {
    const details: {
      firstName: string,
      lastName: string,
      _id: string,
      cover: string
    } = await User.findOne({email: mail,pass: pass}).select('firstName lastName cover');
    res.json({fname: details.firstName,lname: details.lastName,cover: details.cover})
  }
};
const setDetails = async (req: Request, res:Response): Promise<void> => {
  const data = req.body.details;
  const detail: {
    email: string,
    pass: string
  } = {
    email: req.signedCookies.c_user.mail,
    pass: req.signedCookies.c_user.pass
  };
  const me = await User.findOne(detail).select('_id');
  console.log('Wait'+me)
  const result = await User.updateOne({_id: me._id},data);
  console.log(result)
  res.json(result ? {
    status: "OK"
  } : {
    status: "BAD"
  });
}
export {
  chat as chat,
  me as me,
  message as message,
  update as update,
  idUser as user,
  details as details,
  setDetails as setDetails,
  idImg as idImg
};
