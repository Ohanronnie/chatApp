import { useState } from 'react';
function Chats(){
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
    <div className="items-center hover:animate-pulse mb-1 border-solid border-slate-300 flex h-12">
        <img src="./image.jpg" className="rounded-full mx-2 h-10 w-10" alt=""/>
        <div className="flex flex-col">
            <strong className="text-slate-700 text-sm">John Doe</strong>
            <span className="text-sm text-slate-500">Lorem ipsun dolor sit amet</span>
        </div>
    </div>
    <div className="items-center hover:animate-pulse mb-2 border-solid border-slate-300 flex h-12">
        <img src="./image.jpg" className="rounded-full mx-2 h-10 w-10" alt=""/>
        <div className="flex flex-col">
            <strong className="text-slate-700 text-sm">John Doe</strong>
            <span className="text-sm text-slate-500">Lorem ipsun dolor sit amet</span>
        </div>
    </div>
    <footer className="bg-slate-200 h-10 w-full fixed flex  justify-center bottom-0">
        <button className="w-13 -mt-5 h-100 rounded-full mx-11 h-12 text-3xl hover:animate-bounce bg-pink-600 shadow-md text-white">+</button>
    </footer>
    </>
    )
}
export default Chats