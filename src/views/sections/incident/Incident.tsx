import { observer } from "mobx-react-lite"
import { useEffect } from "react"

import IncidentStore from "../../../viewmodels/incident/IncidentStore"
import TableIncident from "./TableIncident"

const incidentStore = IncidentStore.getIncidentStore()

const Incident = () => {


  useEffect(() => {
    incidentStore.getRequestIncident('Bolea')
  }, [])

  return (
    <div className="w-full h-full  relative">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Incident</h2>
          <div className="ml-auto">

          </div>
        </div>
        <TableIncident list={incidentStore.getIncidentList} headerList={['Id Dispositivo', 'Título', 'Descripción']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button className="inline-flex disabled:bg-gray-500 w-fit items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
          <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Anterior
        </button>
        <button disabled={incidentStore.getIncidentList.length < 10} className="inline-flex items-center rounded-md border  disabled:bg-gray-500 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
          Siguiente
          <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default observer(Incident)