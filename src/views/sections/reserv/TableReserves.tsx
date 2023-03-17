import { observer } from "mobx-react-lite";
import ReserveStore from "../../../viewmodels/reserv/ReserveStore";
import { Reserve } from "../../../models/section/Section";
import ClientInfo from "./create/ClienInfo";
import moment from "moment";
import { useState } from "react";
import { CSVLink } from 'react-csv';

const reserveStore = ReserveStore.getReserveStore()
interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableReserves = (prop: PropTable) => {

    const hourHeader = [
        { label: 'id', key: 'idReserveSchedule' },
        { label: 'hora', key: 'date' },
    ]

    const [confirm, setConfirm] = useState(false)
    const [delId, setDelId] = useState<string>("")
    const [delName, setDelName] = useState<string>("")
    function deleteConfirmation(reserve: Reserve) {
        setConfirm(true)
        setDelId(reserve.idReserve!!)
        setDelName(reserve.name!!)
    }

    const deleteReserva = async (reserveId: string) => {
        await reserveStore.deleteReserve("Bolea", reserveId)
        setConfirm(false)
    }

    function fillDates(dates: string): Date[] {
        var arrayAux = dates.split(",")
        var arrayDate = new Array()
        arrayAux.map((item, index) => {
            arrayDate.push(new Date(item))
        })
        return arrayDate
    }
    function saveClient(reserve: Reserve) {
        console.log(reserve.reserveUsers?.length)
        if (reserve.reserveUsers?.length !== 0) {
            reserveStore.updateReserve(reserve)
            reserveStore.setModalClientInfo(true)
        }
    }
    return (
        <div className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            {reserveStore.getModalClientInfo ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center">
                        <ClientInfo />
                    </div>
                </div>
            ) : <></>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase  bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr >
                        {prop.headerList.map((item, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                <div className="">
                                    {item}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {reserveStore.getPaginatedReserve.content?.map((reservMap, index) => (
                        reserveStore.getPaginatedReserve.content!!.length > 0 &&

                        <tr onClick={() => console.log(reservMap.name)} key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="px-6 py-4">
                                <div className="tableCamp flex flex-col">
                                    {reservMap.name}
                                </div>
                            </th>
                            <td className="px-6 py-4" >
                                <div className="tableCamp ">
                                    {reservMap.place?.name}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {reservMap.hall}
                                </div>
                            </td>
                            <td className="px-6 py-4" >
                                <div className="tableCamp flex flex-col overflow-y-auto">
                                    {fillDates(reservMap.date!!).map((item, index) => (
                                        <label>{moment(item).format("dd, DD MMMM")}</label>
                                    ))}

                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    
                                    <div className="tableCamp flex flex-col overflow-y-auto">
                                        {reservMap.reserveSchedules?.map((item, index) => (
                                            <label key={index}>{item.date}</label>
                                        ))}
                                    </div>
                                    <div className=" flex justify-center w-full">
                                        <CSVLink
                                            data={reservMap.reserveSchedules}
                                            filename={'reserves.csv'}
                                            enclosingCharacter={` `}
                                            className={"btnStandard mr-3 h-5"}
                                            target="_blank"
                                            headers={hourHeader} >Exportar horario
                                        </CSVLink>
                                    </div>


                                </div>
                            </td>
                            <td className=" px-6 py-4" >
                                <div className="tableCamp overflow-y-auto  min-w-full ">
                                    {reservMap.isPrivate ? "Privado" : "Publico"}
                                </div>
                            </td>
                            <td className="px-6 py-4" >
                                <div className="tableCamp">
                                    {reservMap.isReserved ? <label className="text-green-600 font-bold">Confirmado</label> : <label className="text-gray-600 font-bold">Pendiente</label>}
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-20 flex flex-col items-center justify-center">
                                    {reservMap.reserveUsers?.length === 0 ? (
                                        <div>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(reservMap)}>Cancelar</a>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <a href="#" className="font-medium text-green-600 dark:text-red-500 hover:underline m-2" onClick={() => saveClient(reservMap)}>Procesar</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(reservMap)}>Rechazar</a>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delName}?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteReserva(delId)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
        </div>
    )
}
export default observer(TableReserves)