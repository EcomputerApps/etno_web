import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import IncidentStore from "../../../viewmodels/incident/IncidentStore"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import TableIncident from "./TableIncident"
import { CSVLink } from 'react-csv';
import incidentRed from "../../../assets/menu/incidentRed.svg"
import Pencil from "../../../assets/menu/create.svg"

const incidentStore = IncidentStore.getIncidentStore()

const Incident = () => {
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    incidentStore.getPaginatedIncidentsRequest(localStorage.getItem('user_etno_locality')!, pageNumber, 6)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }

  const headers = [
    { label: 'FCM Token', key: 'fcmToken' },
    { label: 'Titulo', key: 'title' },
    { label: 'Descripción', key: 'description' },
    { label: 'Resuelta', key: 'isSolved' },
    { label: 'Solución', key: 'solution' }
  ]
  function deleteByGroup(){
    if(incidentStore.getIncidentsCheckedList.length > 0){
      incidentStore.deleteAllById(localStorage.getItem('user_etno_locality')!)
    }
  }
  return (
    <div className="w-full h-full min-w-max relative flex flex-col">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Incidencia</h2>
          <div className="mainButtonsDiv">
          <button onClick={deleteByGroup} type="button" className={`btnStandard ${incidentStore.getPaginatedIncident.totalElements! < 1 ? 'invisible' : 'visible'}`}>
              <img src={Pencil} alt="Create" />
              Eliminar
            </button>
            {incidentStore.getPaginatedIncident.content! && (
              <div hidden={incidentStore.getPaginatedIncident.content.length === 0}>
                <CSVLink
                  data={incidentStore.getPaginatedIncident.content!}
                  filename={'incidents.csv'}
                  enclosingCharacter={` `}
                  className={"btnStandard"}
                  target="_blank"
                  headers={headers}>Exportar a excel
                </CSVLink>
              </div>)}
          </div>
        </div>
        {incidentStore.getPaginatedIncident.content?.length === 0 ? (
          <div className="flex flex-row p-2 mt-2 rounded-md shadow-md">
            <img src={incidentRed} alt="BIG" />
            <label className="text-xl my-auto ml-4 mt-3.5 font-medium">No hay Incidencias</label>
          </div>
        ) : (
          <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg mt-1">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                <div className="flex md:w-1/3 w-full m-auto  p-5 shadow-xl  ">
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-y-auto flex-1">
        <div className="">
          <TableIncident currentPage={pageNumber} />
        </div>
      </div>
      <div className="flex  flex-2  items-center justify-center md:flex-row flex-col ">
        <button onClick={() => decrementPage()} disabled={pageNumber < 1}
          className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={() => incrementPage()} disabled={pageNumber === incidentStore.getPaginatedIncident.totalPages!! - 1 || incidentStore.getPaginatedIncident.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
    </div>
  )
}
export default observer(Incident)