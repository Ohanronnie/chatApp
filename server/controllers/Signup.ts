import { config } from "dotenv";
import mongoose from "mongoose";
import User from "../model/User.js";
import { Request, Response } from "express";
config();
mongoose.connect(
  process.env.MONGOURL!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected")
);
//config();
//const url: string = process.env.MONGOURL;
const toArray = (e: string[], a: string[]) => {
  const _: any = {};
  e.forEach((i, j) => {
    _[a[j]] = i;
  });
  return _;
};

const signup = async (req: Request, res: Response): Promise<void> => {
  let [fname, lname, mail, pass]: any[] = Object.values(req.body).map(
    (e?: any) => e.trim()
  );
  let objArr = toArray([fname, lname, mail, pass], Object.keys(req.body));
  console.log(objArr);
  console.log([fname, lname, mail, pass]);
  /* mongo.connect(url,function(err,db){
     if(err) throw err;
     let dbo = db.db('capp');
     dbo.collection('user').insertOne(objArr, function (err,result){
         if(err) throw err;
         console.log(result)
     })
   });*/
  let result = new User(objArr);
  let results = await result.save();
  console.log(results);
};
const login = async (req: Request, res: Response): Promise<void> => {
  let mail = req.body.mail;
  let pass = req.body.pass;
  console.log(req.body);
  const result = await User.findOne({ email: mail, pass: pass });
  /*  mongo.connect(url, function (err,db){
        if(err) throw err;
        let dbo = db.db('capp');
        dbo.collection('user').findOne({email: mail,pass: pass}, function (err,result){*/
  console.log(result);
  if (result) {
    try {
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true, // The cookie only accessible by the web server
        signed: true, // Indicates if the cookie should be signed
      };
      res.cookie(
        "c_user",
        {
          mail: mail,
          pass: pass,
        },
        options
      );
      console.log(req.signedCookies);
    } catch (e) {
      console.error(e);
    }
    res.json("valid");
  } else {
    res.json("err");
  }
  //   result ? res.json('valid') : res.json('err')
};
const user = async (req: Request, res: Response): Promise<void> => {
  /* mongo.connect(url, function (err,db){
	if(err) throw err;
        let dbo = db.db('capp');
        dbo.collection('user').find({},{projection: {email: 1, _id:0}}).toArray(function (err,result){
        console.log(result);
            res.json([result[0].email]);
        })
    })*/
  console.log(req.cookies);
  let result = await User.find({}).select("email");
  console.log(result);
  result.length !== 0 && res.json([result[0].email]);
};
export { signup as signup, login as login, user as user, toArray as toArray };
