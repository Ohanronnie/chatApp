import User from '../model/User.js';
import path from 'path';
import {Request,Response} from 'express';
import fileUpload from 'express-fileupload';
const upload = async (req: Request,res: Response): Promise<void> => {
  const file = req!.files!.file! as fileUpload.UploadedFile;
  const locate = path.join(process.cwd(),'files/')
  const date = Date.now();
  const ext = file.mimetype.split('/')[1];
  const location = `/OH-IMG-${date}.${ext}`;
  console.log(location);
  const result = await User.findOne({
    email: req.signedCookies.c_user.mail,
    pass: req.signedCookies.c_user.pass
  }).select('_id');
  console.log(result)
  const response = await User.updateOne({_id: result._id},{$set: {cover: `/images${location}`}});
  console.log(response)
/*  file!.mv(location,(...arg: any[]) => {
    console.log(arg)
  });*/
 if(file){
   file.mv(`${locate}${location}`,(...arg: any[]) => {
     console.log(arg)
   })
 }
  console.log(file)
}
export {
  upload as Profile
}
