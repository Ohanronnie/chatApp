import { useEffect , useState } from 'react';
//import Register from './Register';
//import Login from './Login'
//import './App.css';
//import io from 'socket.io-client';
//const socket = io.connect('http://localhost:8080');
export default function App({ socket }){
  const [message,setMessage] = useState({
    from: "noone",
    to: "noone",
    message: ""
  });
  const [response,setResponse] = useState([]);
  useEffect(() => {
    socket.on('messages',(data) => {
      setResponse(e => [...e,data])
    })
  },[socket])
  const handleChange = (e) => {
    setMessage(data => ({...data,message: e.target.value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message',message);
    setMessage(data => ({...data,message: ""}));
  }
  const messages = response.map(e => {
    return (<>
      <p>{e?.message}</p>
    </>
    )
  });
	return (
    <div className="test">
      <div style={{color: "black"}}>
        {messages || ""}
      </div>
      <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={message.message} />
        <button type="submit">Submit</button>
      </form> 
    </div>
  );
}
