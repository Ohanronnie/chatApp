 import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import Chats from './Chats';
import Test from './Test';
import AddChat from './AddChats';
import SendMessage from './SendMessage';
import Profile from './Profile';
import './index.css';
import './output.css';
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom";
import App from './App';
import io  from 'socket.io-client';
import axios from 'axios';
const socket = io.connect('https://chat-end.onrender.com');
//import axios from 'axios';
export default function Note(){
//  const navigate = useNavigate();
(async ()=>{
  let resp = await axios.get('/');
  if(resp.data?.status === "BAD" && window.location.href !== 'http://localhost:3000/register/login' && window.location.href !== 'http://localhost:3000/register/signup' && window.location.href !== 'http://localhost:3000/'){
    window.location = '/register/login';
  }
})();
	return (
	<BrowserRouter>
	    <Routes>
	        <Route path="/">
	        <Route index element={<Menu socket={socket} />}/>
	      
	        <Route path="register/login" element={<Login socket={socket} />}/>
	              <Route path="register/signup" element={<Register socket={socket} />}/>
	        <Route path="chats" element={<Chats socket={socket}/>}/>
            <Route path="chats/add" element={ <AddChat socket={socket}/>} />
            <Route path="chats/message/*" element={<SendMessage socket={socket}/>} />
            <Route path="profile/me" element={<Profile />} />
	            </Route>
	    </Routes>
	 </BrowserRouter>
   )
//   return <App socket={socket}/>
}
ReactDOM.render(
  <React.StrictMode>
    <Note />
  </React.StrictMode>,
  document.getElementById('root')
);
