import { observer } from "mobx-react-lite"
import { useState } from "react"
import resolved from "../../../assets/menu/resolved.svg"
import error from "../../../assets/menu/error.svg"
import IncidentStore from "../../../viewmodels/incident/IncidentStore"
import { toast, ToastContainer } from "react-toastify"


const incidentStore = IncidentStore.getIncidentStore()
interface PropTable {
    list?: any,
    currentPage?: number
}

const TableIncident = (prop: PropTable) => {
    const [showModal, setModal] = useState(false)
    const [emptySolution, setEmptySolution] = useState(false)

    function chekIfEmpty() {
        incidentSolution === "" || incidentSolution === null ? setEmptySolution(true) : setEmptySolution(false)
    }

    function showDescription(description: string, id: string,
        fcmToken: string, title: string, date: string, isSolved: boolean, solution: string) {
        setModal(true)
        setID(id)
        setIncidenTitle(title)
        setIncidentDescription(description)
        setIncidentDate(date)
        setFcmToken(fcmToken)
        setIcindentIsSolved(isSolved)
        setIncidentSolution(solution)
        incidentStore.updateDescription(description)
    }

    const [incidenTitle, setIncidenTitle] = useState("")
    const [incidentDescription, setIncidentDescription] = useState("")
    const [incidentDate, setIncidentDate] = useState("")
    const [id, setID] = useState("")
    const [fcmToken, setFcmToken] = useState("")
    const [incidentSolution, setIncidentSolution] = useState<string>("")
    const [insicentIsSolved, setIcindentIsSolved] = useState<boolean>(false)

    function solutionPositive(incidentId: string) {

        chekIfEmpty()
        incidentSolution === "" ||   incidentSolution === null ? 
        toast.error('Rellene el campo de solution', {
            position: 'bottom-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
        }) : incidentStore.solveSilution(localStorage.getItem('user_etno_locality')!, incidentId, incidentSolution)
        incidentSolution === "" || incidentSolution === null ?
            toast.error('Rellene el campo de solution', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            }) : incidentStore.solveSilution(localStorage.getItem('user_etno_locality')!, incidentId, incidentSolution)
    }

    function goBack() {
        setModal(false)
        setEmptySolution(false)
    }
    return (
        <div className="relative overflow-x-auto ">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <div>
                    {showModal ? (
                        <div>
                            <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                                <div className="lg:w-1/2 w-11/12 h-1/2 flex flex-col">
                                    <button className="  text-blue-600  font-medium place-self-end bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => goBack()}>X</button>
                                    <div className="w-full min-h-full max-h-full rounded-md flex flex-wrap bg-gray-100 ">
                                        <p className="font-bold text-xl uppercase underline p-3 w-full text-center underline-offset-4 ">Descripción detallada</p>
                                        <div className="flex flex-wrap md:h-40 h-1/2 max-h-40 overflow-y-scroll border-t-2 border-b-2 p-2 w-full " >
                                            {incidentStore.getDescription}
                                        </div>
                                        <div className="w-full flex flex-col ">
                                            <label className="text-xl pl-3">Solucion</label>
                                            <textarea defaultValue={incidentSolution} maxLength={100} className={`inputCamp disabled:bg-gray-200 ${emptySolution ? 'border-red-600' : ''}`}
                                                onChange={(e) => {
                                                    setIncidentSolution(e.currentTarget.value)
                                                    setEmptySolution(false)
                                                }}
                                                disabled={insicentIsSolved}></textarea>
                                        </div>
                                        <div className="flex w-full justify-center pt-5 pb-3 ">
                                            <button className="btnStandard disabled:bg-gray-500 border-gray-300" disabled={insicentIsSolved} onClick={() => solutionPositive(id)}>Resolver</button>
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
                                    <div key={index} id="divIndex" className="min-w-full relative flex flex-col m-1 p-1 border-2 rounded-md bg-gray-100 shadow-md max-w-min" onClick={() => {
                                        showDescription(incident.description!!, incident.idIncident!!, incident.fcmToken!!, incident.title!!, incident.issuedDate!!, incident.isSolved!!, incident.solution!!)
                                    }}>
                                        <div className=" flex flex-2 justify-between ">
                                            <p className="font-semibold p-1 underline underline-offset-4">{incident.issuedDate}</p>
                                            <img className="" src={incident.isSolved ? resolved : error} alt="error"></img>
                                        </div>
                                        <div className="bg-red-400">
                                        </div>
                                        <div className=" min-w-fit flex flex-1 flex-row m-auto md:items-center md:justify-center w-full ">
                                            <p className="font-bold md:text-xl  uppercase underline ml-3 underline-offset-4">{incident.title}</p>
                                        </div>
                                        <div className="flex flex-1 ">
                                            <p className="font-medium  leading-8 p-2 lg:line-clamp-2 line-clamp-1 overflow-y-auto">{incident.description}</p>
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
            </div>
            <ToastContainer style={{ margin: "50px" }} />
        </div>
    )
}
export default observer(TableIncident)