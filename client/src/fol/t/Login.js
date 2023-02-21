import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './output.css';
document.body.style.backgroundColor="#FFFFFF"
function Login(){
   // const [to,setTo] = useState('/register/login')
    const [value,setValue] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function handleChange(e){
        const name = e.target.name;
        const val = e.target.value;
        setValue(e => ({...e,[name]: val}));
    }
    function handleSubmit(e){
        e.preventDefault();
        axios ({url: '/register/login', method: "post", data: value}).then(response => {
            switch (response.data) {
                case "err":
                   setError("Incorrect password");
                   break;
                default:
                    setError(null);
                    navigate('/chats')
                    break;
            }
        })
    }
    return (
    <>
         <div className="rounded-br-4xl pt-7 pl-5 h-28 shadow-xl">
        <h3 className="text-3xl text-great-blue-10">Welcome!</h3>
        <p className="text-slate-900">
            Sign in and get started 
        </p>
    </div>
    <form onSubmit={handleSubmit} className="mt-10 px-9" action="">
        <label className="mb-5 text-slate-600 text-sm" htmlFor="mail">
            Email
        </label>
        <input onChange={handleChange} id="mail" style={{borderWidth: "1.5px"}} name="mail" placeholder="Enter your mail" className="w-full text-sm mt-1 border-great-blue-1 p-3 text-slate-500 border-2 border-solid drop-shadow-lg focus:outline-none rounded-2xl h-10 mb-5" type="mail"/>
        <label className="mb-5 text-slate-600 text-sm" htmlFor="pass">
            Password 
        </label>
        <input onChange={handleChange} id="pass" style={{borderWidth: "1.5px"}} name="pass" placeholder="Enter your password" className="w-full text-sm mt-1 border-great-blue-1 p-3 text-slate-500 border-2 mb-1 border-solid drop-shadow-lg focus:outline-none rounded-2xl h-10" type="password"/>
        {error ? (<p className="text-m ml-1 font-base text-red-600 w-full">{error}</p>) : null}

     <button type="submit" style={{borderWidth: "1.5px"}} className="text-sm mt-5 text-white rounded-2xl h-9 w-full bg-gradient-to-r from-great-blue-50 to-great-blue-100 hover:bg-slate-200 hover:from-slate-200 hover:to-slate-200 hover:text-slate-500 hover:border-solid hover:border-2 hover:border-great-blue-100">Sign In</button>

    </form>
    <p className="text-sm text-center text-great-blue-100 mt-3">
        <a href="#">
        Forgot password?           
        </a>
    </p>
    <hr className="w-1/2 mx-auto mt-5"/>    
    <div className="px-10">
          <button onClick={()=>{navigate('/register/signup')}} style={{borderWidth: "1.5px"}} className="text-sm hover:bg-gradient-to-r hover:from-great-blue-50 hover:border-slate-200 hover:to-great-blue-100 text-great-blue-100 bg-slate-200 hover:text-white rounded-2xl mt-3 h-9 w-full border-solid border-2 border-great-blue-100">Sign Up</button>
</div>
</>
    )
}
export default Login
