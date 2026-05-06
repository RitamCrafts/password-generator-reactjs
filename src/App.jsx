import { useState, useCallback, useEffect, useRef } from "react";
import React from 'react'

function App() {
  const [length,setlength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(true);
  const [specialAllowed,setSpecialAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef=useRef(null);
  
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str+="0123456789";
    if (specialAllowed) str+="-_.@#$%^&*!,+-";

    for (let i = 1; i <= length; i++) {
      let chIndex=Math.floor(Math.random()*str.length+1);
      pass=pass+str.charAt(chIndex);
    }

    setPassword(pass);

  },[length,numberAllowed,specialAllowed,setPassword] )

  useEffect(()=>{passwordGenerator()},[passwordGenerator])

  const copyPasswordToClipboard=()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className="min-h-screen h-full w-full bg-slate-950 p-2">
      
      <div className=" bg-gray-900 container rounded-lg w-full max-w-md mx-auto mt-1 py-6 px-4 text-orange-400 shadow-md">
        <p className="text-center mb-2">Password Generator</p>
        <div className="searchAndCopy flex rounded-lg shadow mb-4 overflow-hidden h-10">
          <input 
          type="text"
          value={password}
          className="py-1 px-3 w-full outline-none bg-gray-800"
          placeholder="password"
          ref={passwordRef}
          readOnly
          />
          <button onClick={()=>copyPasswordToClipboard()} className="text-white bg-orange-400 outline-none px-3 cursor-pointer hover:opacity-80 active:opacity-55">Copy</button>
        </div>

        <div className="line2 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <div className="left-side flex gap-1 mr-1">
            <input 
            type="range" 
            className="cursor-pointer accent-orange-500"
            value={length}
            max={40}
            min={3}
            onChange={(e)=>setlength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="right-side flex gap-1 ml-1 items-center">
            <input 
            type="checkbox"
            checked={numberAllowed}
            className="accent-amber-500 cursor-pointer"
            onChange={()=>setNumberAllowed((prev)=>!prev)}
            id="number-allowed"
            />
            <label htmlFor="number-allowed" className="mr-1">Numbers</label>

            <input 
            type="checkbox"
            checked={specialAllowed}
            className="accent-amber-500 cursor-pointer"
            onChange={()=>setSpecialAllowed((prev)=>!prev)}
            id="special-allowed"
            />
            <label htmlFor="special-allowed" className="mr-1">Special</label>
          </div>


        </div>
      </div>
      
    </div>
  )
}

export default App
