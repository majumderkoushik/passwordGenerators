import { useState , useCallback, useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(0);
  const[uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword]= useState("");


  const passswordRef= useRef(null)

  const passwordGenerator= useCallback(() => {
    let pass= "";
    let str =
    "abcdefghijklmnopqurstuvwxyz";
    if(uppercaseAllowed) str+= "ABCDEFGHIJKLMNOPQURSTUVWXYZ"
   if(numberAllowed) str += "0123456789"
   if(charAllowed) str += "!@#$%^&*"

   for (let i = 0; i <length; i++){
    let char =Math.floor(Math.random() * str.length+1);
   
    pass += str.charAt(char)
   }
   setPassword(pass) 

  }, [length,uppercaseAllowed,numberAllowed, charAllowed, setPassword])
  const copyPasswordToClip =useCallback(() =>{
    passswordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className="p-24 box">
     <h1 className="text-4xl text-center p-8">Password Generators</h1>
     <div className='flex px-40 justify-center flex-col space-y-4'>
     <div className="flex flex-col space-y-3">
     <label>Enter Length of the password</label>
    <input
      type="number"
      min={0}
      max={500}
      value={length}
      className="py-1 px-3 w-full"
      placeholder="length"
      onChange={(e) => {setLength(e.target.value)}}
      />
      </div>
      <div className="flex space-x-4 justify-center">
      <div className="flex items-center gap-x-1">
      <label>Include Uppercase</label>
        <input
        type="checkbox"
        defaultChecked={uppercaseAllowed}
        id="uppercaseInput"
        onChange={() => {
          setUppercaseAllowed((prev) => !prev);
        }} />
      </div>
      
      <div className="flex items-center gap-x-1">
      <label>Include Numbers</label>
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
          setnumberAllowed((prev) => !prev);
        }} />
      </div>
      <div className="flex items-center gap-x-1">
      <label>Include Symbols</label>
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="charcterInput"
        onChange={() => {
          setCharAllowed((prev) => !prev);
        }} />
      </div>
      </div>
      <div className="flex justify-center flex-col items-center space-y-3">
      <button className="bg-blue-500 w-56 p-1 hover:bg-blue-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline-blue scale-100 hover:scale-110 " onClick={passwordGenerator}>Generate Password</button>
      
      </div>
      <div className="flex">
        <input
        type="text"
        value={password}
        placeholder="Generated Password"
        readOnly
        className="outline w-full py-1 px-3"
        ref={passswordRef} />
        <button
        onClick={copyPasswordToClip} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 transform scale-100 hover:scale-110  hover:bg-blue-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>copy</button>
      </div>
     </div> 
     </div>
  )
}

export default App
