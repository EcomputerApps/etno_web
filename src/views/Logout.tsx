import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import logoEtno from '../assets/logo_etno.png'
import UserStore from '../viewmodels/User/UserStore'
const userStore = UserStore.getUserStore()

const Logout = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-60 w-auto" src={logoEtno} alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">¿Salir de la cuenta?</h2>
        </div>

        <div className="flex md:flex-row m-auto justify-center w-3/4 p-3">
          <button name="bandBtnSave" className="inline-flex justify-center w-full items-center rounded-md border mr-5  border-gray-300 bg-indigo-800 px-6 py-3 text-sm font-medium text-gray-300 shadow-sm  hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => {
            localStorage.clear()
            navigate("/")
          }}>Si</button>
          <button name="bandBtnCancel" className="inline-flex  justify-center w-full items-center rounded-md border  border-gray-300 bg-indigo-800 px-6 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>No</button>
        </div>
      </div>
    </div>
  )
}
export default observer(Logout)