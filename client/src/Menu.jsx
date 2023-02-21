import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
//document.body.style = `background-color: rgb(226 232 240 / 1)`;
function Menu({ socket }){
    
    const navigate = useNavigate();
    return (
    <>
        <div className="h-full bg-slat-200">
             <div className="mx-9 my-9">
        <img className="shadow-xl rounded-lg mb-10 w-full" src={logo} alt=""/>
        <h3 className="text-slate-800 text-2xl font-sans font-base">Welcome!</h3>
        <p className="text-slate-600 text-sm">
            Login with the data you entered during your registration 
        </p>
        <button onClick={()=>{navigate('/register/signup')}} style={{borderWidth: "1.5px"}} className="mt-5 text-sm text-white rounded-2xl h-9 w-full bg-gradient-to-r from-great-blue-50 to-great-blue-100 hover:bg-slate-200 hover:from-slate-200 hover:to-slate-200 hover:text-slate-500 hover:border-solid hover:border-2 hover:border-great-blue-100">Sign up</button>
        <button onClick={()=>{navigate('/register/login')}} style={{borderWidth: "1.5px"}} className="hover:bg-gradient-to-r hover:from-great-blue-50 text-sm hover:border-slate-200 hover:to-great-blue-100 text-slate-500 hover:text-white rounded-2xl mt-3 h-9 w-full border-solid border-2 border-great-blue-100">Sign in</button>
    </div>

        </div>
        </>
    )
}
export default Menu
