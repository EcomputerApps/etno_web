import React from "react"
import 'tailwindcss/tailwind.css'
const Login = ()=>{
    return(
        <div className=" flex  justify-center min-h-screen">
        <div className="flex flex-col">
            <div className="flex-1  text-white items-center bg-[url('C:\Users\valentynstopkevych\Desktop\typescript\test-app\public\logo-ECOMPUTER.jpg')] bg-no-repeat bg-center">
            </div>

            <div className="flex-1">
            <div className="block mt-10  text-xl md:text-3xl text-whit font-semibold">
                <h1>Entrar en la cuenta</h1>
            </div>
            <form className="block mt-10" >
            <div className="flex flex-col text-left">
                <label className="font-semibold text-xl">Usuario</label>
                <input name="loginUsername" placeholder="Usuario" className="pt-3 rounded-md  border-2 placeholder:pt-3"></input>
            </div>
            <div className="flex flex-col text-left">
                <label className="font-semibold text-xl">Contraseña</label>
                <input type="password" placeholder="Contraseña" name="loginPassword" className="pt-3 rounded-md  border-2"></input>
            </div>
            </form>
                        
            <div className="mt-10 block bg-red-500 hover:text-black text-white font-bold py-2 px-4 rounded w-fit m-auto">
                <button>Login to Your Account</button>
            </div>
            </div>

            <div className="flex flex-row items-center  m-auto flex-1">
                <h1>Dont Have An Account?</h1>
                <a href="#" className="text-purple-500 hover:text-purple-700 underline pl-2">Sing Up</a>
            </div>
            
            </div>
        </div>
    )
}

export default Login

