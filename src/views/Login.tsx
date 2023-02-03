import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import logoEtno from '../assets/logo_etno.png'
import 'tailwindcss/tailwind.css'
import UserStore from '../viewmodels/User/UserStore'

const userStore = UserStore.getUserStore()


const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async(e: any) => {
    e.preventDefault()
    await userStore.getUserLogin(username, password)
    if(!userStore.getError){
      navigate('/home')
    }
  }

    return(
      /** error era por linea 28 {userStore.getUserCredencials.error.toString()}*/ 
        <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-60 w-auto" src={logoEtno} alt="Your Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Entra a tu cuenta</h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true"/>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">Usuario</label>
                <input id="username" name="username" type="username" autoComplete="username" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" 
                onChange={(e) => {
                  setUsername(e.currentTarget.value)
                }}/>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Contraseña"
                onChange={(e) => {
                  setPassword(e.currentTarget.value)
                }}/>
              </div>
            </div>
            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={ handleLogin }>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}
export default observer(Login) 