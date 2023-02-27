import { observer } from "mobx-react-lite"
import { useState } from "react"
import resolved from "../../../assets/menu/resolved.svg"
import error from "../../../assets/menu/error.svg"
import IncidentStore from "../../../viewmodels/incident/IncidentStore"
const incidentStore = IncidentStore.getIncidentStore()

interface PropTable {
    list?: any,
    currentPage?: number
}

const deleteIncident = async (incident: string) => {
    await incidentStore.deleteIncident('Bolea', incident)
}

const TableIncident = (prop: PropTable) => {
    const [showModal, setModal] = useState(false)
    function showDescription(description: string) {
        setModal(true)
        incidentStore.updateDescription(description)
    }
    return (
        <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <div>
                    {showModal ? (
                        <div>
                            <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                                <div className="w-1/2 h-1/2 flex flex-col">
                                    <button className="  text-blue-600  font-medium place-self-end bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => setModal(false)}>X</button>
                                    <div className="w-full  max-h-96 rounded-md flex flex-wrap bg-gray-100 ">
                                        <p className="font-bold text-xl uppercase underline p-3 w-full text-center underline-offset-4 ">Descripción detallada</p>
                                        <div className="flex flex-wrap md:h-40 h-1/2 max-h-40 overflow-y-scroll border-t-2 border-b-2 p-2 w-full">
                                            <p className="font-medium">{incidentStore.getDescription}</p>
                                        </div>
                                        <div className="flex w-full justify-center p-5">
                                            <button className="inline-flex items-center rounded-md border 
         disabled:bg-gray-500 border-gray-300 bg-indigo-800
          px-4 py-3 text-sm font-medium text-gray-300 
          shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">Resolver</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <></>}
                    <div className="w-full md:h-5/6 h-4/6  lg:p-3  p-5 " >
                        <div className="container h-full  mx-auto ">
                            <div className="grid md:grid-cols-2 md:grid-rows-3 grid-cols-1 grid-rows-none h-full" >
                                {incidentStore.getPaginatedIncident.content?.map((incident, index) => (
                                    incidentStore.getPaginatedIncident.content!!.length > 0 &&
                                    <div key={index} id="divIndex" className="min-w-fit relative flex flex-col m-1 border-2 rounded-md bg-gray-100 shadow-md" onClick={() => { showDescription(incident.description!!) }}>
                                        <div className=" flex flex-2 justify-between ">
                                            <p className="font-semibold p-1 underline underline-offset-4">{incident.issuedDate}</p>
                                            <img className="" src={incident.resolution ? resolved : error} alt="error"></img>
                                        </div>
                                        <div className="bg-red-400">
                                        </div>
                                        <div className=" min-w-fit flex flex-1 flex-row m-auto md:items-center md:justify-center w-full ">
                                            <p className="font-bold md:text-xl  uppercase underline ml-3 underline-offset-4">{incident.title}</p>
                                        </div>
                                        <div className="flex flex-1">
                                            <p className="font-medium  leading-8 p-2 md:line-clamp-2 line-clamp-1">{incident.description}</p>
                                        </div>
                                        <div className="flex flex-1 w-full items-center justify-center ">
                                            <p className="line-clamp-1 text-gray-700 font-medium hover:text-gray-500 cursor-pointer">Pulse para ver detalles</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </table>
        </div>
    )
}

export default observer(TableIncident)