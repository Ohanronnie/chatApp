 import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import Chats from './Chats';
import Test from './Test';
import AddChat from './AddChats';
import SendMessage from './SendMessage';
import './index.css';
import './output.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from './App';
import io  from 'socket.io-client';
const socket = io.connect('http://localhost:8080');

export default function Note(){
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
