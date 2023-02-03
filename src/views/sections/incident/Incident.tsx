import { observer } from "mobx-react-lite"
import { useEffect } from "react"

import IncidentStore from "../../../viewmodels/incident/IncidentStore"
import TableIncident from "./TableIncident"

const incidentStore = IncidentStore.getIncidentStore()

const Incident = () =>{
    

    useEffect(()=>{
        incidentStore.getRequestIncident('Bolea')
    },[])

    return(
        <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Incident</h2>
          <div className="ml-auto">
            
          </div>
        </div>
        <TableIncident list={incidentStore.getIncidentList} headerList={['Id Dispositivo', 'Título', 'Descripción']} />
      </div>
    )
}

export default observer(Incident)