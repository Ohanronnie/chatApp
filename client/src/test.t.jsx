import { useState,useReducer,useEffect,useRef } from 'react';
import axios from 'axios';
import './out.css';
axios.defaults.withCredentials = true;
//const me = await axios.post('/api/me',{key: Math.random()});
const reducer = (state,action) => {
      switch(action.type){
        case 'ME':
//          alert(77);
//          alert(JSON.stringify(state,null,2))
          return ([
            ...state,{
              to: new URL(window.location.href).pathname.split('/')[new URL(window.location.href).pathname.split('/').length -1],
              from: action._id,
              message: action.message
            }
          ]);
          break;
        case 'ALL':
          
  //        alert(JSON.stringify(action.body,null,2));
          return ([...action.body]);
          break;
        default:
    //      alert(88);
     //     alert(JSON.stringify(state,null,2))
          return ([
            ...state,{
              to: action._id,
              from: new URL(window.location.href).pathname.split('/')[new URL(window.location.href).pathname.split('/').length - 1],
              message: action.message
            }
          ])
        }
    
}
function SendMessage({ socket }){
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);
  const [allMessages,dispatch] = useReducer(reducer,messages);
  const [url,setUrl] = useState(new URL(window.location.href).pathname.split('/')[new URL(window.location.href).pathname.split('/').length - 1]);
  const sendBox = useRef(null);
  const msgBox = useRef(null);
  const box = useRef(null);
  useEffect(() => {
    (async function(){
      const temp = allMessages.length === 0 ? await axios.post('/api/message',{url: url}) : null;
      allMessages.length === 0 && msgBox.current?.scrollIntoView({ behavior: 'smooth' });
      allMessages.length === 0 && dispatch({type: 'ALL',body: temp.data})
  //    allMessages.length === 0 && alert(JSON.stringify(temp.data,null,2))
    })();
    socket.on('new_message',(data) => {
      sendBox.current.value = "";
//      setMessage("");
      axios.post('/api/me',{key: Math.random()})
        .then(r => {
      if(data.to === r.data._id || data.from === r.data._id){
      if(window.location.href.includes(data.from)){
        dispatch({type: 'OTHER',message: data.message,_id: r.data._id});
        msgBox.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        dispatch({type: 'ME',message: data.message,_id: r.data._id});
        msgBox.current?.scrollIntoView({ behavior: 'smooth' });
      }
        
      }
        });
    })
  },[socket])
  const handleSubmit = async (e) => {
    const me = await axios.post('/api/me',{key: Math.random()});
    const you = new URL(window.location.href).pathname.split('/');
    const other = you[you.length - 1];
    socket.emit('newMessage',{
      from: me.data._id,
      to: other,
      message: message
    });
    sendBox.current.value = "";
    setMessage("");
  }
  let messa = allMessages.map(e => {
    return !window.location.href.includes(e.from) ? (<><div className="p-2 max-w-200 mb-1 max-w-full w-max ml-auto mr-0 rounded-tl-md rounded-tr-md rounded-bl-md bg-dark-blue">
          <span ref={msgBox} className="text-white">{e.message}</span>
    </div></>) : (<><div className="p-2 mb-1 max-w-200 w-max bg-gray-400 rounded-tl-md rounded-tr-md rounded-br-md">
          <span ref={msgBox} className="text-white">{e.message}</span>
    </div></>)
    });
  return (
    <>
        <nav className="flex bg-dark-blue items-center h-12 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="h-8 w-8 -mr-5 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <h2 className="text-md text-white ml-11">
            Chats
        </h2>
    </nav>
  <div className="mx-2" style={{"padding-bottom": "4rem"}}>
    {/*    <div className="p-2 mb-1 max-w-200 w-max bg-gray-400 rounded-tl-md rounded-tr-md rounded-br-md">
          <span className="text-white">possim</span>
      </div>
      <div className="p-2 max-w-200 mb-11 max-w-full w-max float-right rounded-tl-md rounded-tr-md rounded-bl-md bg-dark-blue">
          <span className="text-white"> mediocritatem </span>
      </div>*/}
    {messa}
  <footer style={{width: "96vw", background: "lightgrey"}} ref={box} className="text-gray-600 flex mb-2 px-2 rounded-md my-0 fixed bottom-0">
    <input onChange={(e) => {setMessage(e.target.value)}} placeholder="message..." type="text" style={{background: "lightgrey"}} value={message} ref={sendBox} className="hover:outline-none outline-none w-11/12 h-8"/>
      <button onClick={handleSubmit}>
<svg className="h-6 mr-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </footer>
</div>
    {/*    <input ref={sendBox} style={{background: '#008FFF'}} type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="message..."/>
      <button style={{background: 'red'}} onClick={handleSubmit}>Submit</button>*/}
    </>
  )
}
export default SendMessage
