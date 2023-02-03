import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PharmacyStore from "../../../viewmodels/pharmacy/PharmacyStore"
import TablePharmacy from "./TablePharmacy"

const pharmacyStore = PharmacyStore.getPharmacyStore()

const Pharmacy = () =>{
    const navigate = useNavigate()

    useEffect(()=>{
        pharmacyStore.getRequestPharmacy('Bolea')
    },[])
    return(
        <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Farmacias</h2>
          <div className="ml-auto">
            <button onClick={() => navigate("/pharmacy")} type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-indigo-600 px-4 py-2 text-sm font-medium text-white    shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              Crear
            </button>
          </div>
        </div>
        <TablePharmacy list={pharmacyStore.getPharmacyList} headerList={['tipo', 'nombre', 'enlace', 'Teléfono', 'horario' , 'Descripción']} />
      </div>
    
  )
}
export default observer(Pharmacy)
