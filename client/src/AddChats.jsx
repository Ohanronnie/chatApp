import { useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
function AddChats({ socket }){
  const [details,setDetails] = useState({
    email: "",
    message: ""
  });
  const navigate = useNavigate();
  const submit = useRef(null);
  const handleChange = (e) => {
    setDetails(a => ({...a,[e.target.name]: e.target.value}));
  }
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if(details.email.length <= 1){
      alert('Enter a valid mail')
      alert(details.email)
      return;
      
    } else if (details.message.length <= 0){
      alert('Message too short');
      return;
    } else {
      submit.current.disabled = true;
//    if(details.name.length !== 0 && details.message.length !== 0){
    const data = await axios.post('/api/chats',details);
    const response = await axios.post('/api/me',{key: Math.random()});
    switch (data.data.status){
       case "OK":
         submit.current.disabled = true;
         navigate(`/chats/message/${data.data._id}`);
         socket.emit('newMessage',{
           from: response.data._id,
           to: data.data._id,
           message: details.message
         });
         break;

       default:
        alert("Invalid mail");
        submit.current.disabled = false;
      }
    }
  //  } else {
   //   alert("all fields must be filled")
    //}
  }
  return (
   <>
  <nav style={{background: '#2B3595'}} className="flex items-center h-12 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="mr-13 ml-2 w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
    </svg>
    <h2 className="text-lg text-white ml-7">
      Add friend
    </h2>
  </nav>
  <div className="mx-3 my-4">
    <input onChange={handleChange} value={details.email} name="email" type="mail" placeholder="Email address...." className="bg-slate-300 focus:outline-0 hover:outline-0 placeholder-slate-700 text-slate-600 rounded-md w-full px-2 h-12" />
    <input value={details.message} onChange={handleChange} name="message" placeholder="Message....." className="bg-slate-300 focus:outline-0 placeholder-slate-700 mt-2 text-slate-600 rounded-md w-full h-28 hover:outline-0 px-2" />
    <button ref={submit} onClick={handleSubmit} className="bg-dark-blue hover:mt-4 hover:animate-bounce text-slate-300 h-8 w-full mt-2 rounded-md">
      Send
    </button>
  </div>
</>
  )
}
export default AddChats;
