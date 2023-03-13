import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
export default function Profile(){
  const [details,setDetails] = useState({});
  const [file,setFile] = useState("");
  const navigate = useNavigate();
  const center = {
    display: "flex",
    justifyContent: 'center'
  };
  useEffect(() => {
    (async function(){
      try{
      const response = await axios.post('/api/details');
      setDetails(response.data);
      }
      catch(err){
        alert(err)
      }
    })()
  },[]);
  function handleChange(e){
    setDetails(prev => ({...prev,[e.target.name]: e.target.value}))
  };
  async function handleFile(e){
    if(!e.target.files[0]){
      return;
    }
    const formData = new FormData();
 //   alert(JSON.stringify(file,null,2));
     formData.append('file',e.target.files[0]);
     formData.append('fileName',e.target.files[0].name);
     // data.append('file',e.target.files[0]);
//      data.append('hello',777)
      //alert(JSON.stringify(data,null,2));
      /*let a = await axios({url:'/api/changeProfile',method: "post",body: {hi: 7}
      // 👇 Set headers manually for single file upload
      /*headers: {
        'content-type': e.target.files[0].type,
        'content-length': `${e.target.files[0].size}`, // 👈 Headers need to be a string
      }})*/
      await axios.post('/api/changeProfile',formData)
    //axios.post('/api/changeProfile',data)
  }
  async function handleSubmit(e){
    e.preventDefault();
    if(details.fname.length >= 4 && details.lname.length >= 4){
    try{
      const response = await axios.post('/api/setDetails',details);
      navigate('/chats')
      }
    catch(err){
      alert(err)
    }
  }
  }
  return (
    <>
<nav className="flex bg-dark-blue items-center h-12 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="h-8 w-8 -mr-5 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <h2 className="text-md text-white ml-11">
            Profile 
        </h2>
    </nav>
<div className="">
    <img className="w-[5rem] mt-3 rounded-full h-[5rem] mx-auto" src={details.cover || "/images/OH-IMG.jpg"}/>
    <label style={center} htmlFor="file" className="mt-2 text-center text-sm text-slate-600">Change your profile picture </label>
    <input type="file" id="file" name="file" onChange={handleFile} style={{display: "none"}} />
    <form onSubmit={handleSubmit} method="post">
    <div className="mt-6 bg-slate-300 mx-2 rounded-md">
        <label className="w-full text-sm font-sans ml-2 pt-2 text-slate-700">First name</label>
        <input value={details.fname || ""} name="fname" onChange={handleChange} className="pl-2 h-8 text-slate-600 font-sans font-bold bg-slate-300 rounded-md w-full hover:outline-none focus:outline-none outline-none "/>
    </div>
    <div className="mt-2 bg-slate-300 mx-2 rounded-md">
        <label className="w-full text-sm font-sans ml-2 pt-2 text-slate-700">Last name</label>
        <input value={details.lname || ""} name="lname" onChange={handleChange} className="pl-2 h-8 text-slate-600 font-sans font-bold bg-slate-300 rounded-md w-full hover:outline-none focus:outline-none outline-none "/>
    </div>
    <div className="bg-slate-500 mt-2 mx-2 rounded-md">
      <button type="submit" className="text-white h-10 rounded-md  bg-slate-700 w-full">Save</button>

    </div>
    </form>
</div>
    </>
  )
}
