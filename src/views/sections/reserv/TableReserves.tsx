import { observer } from "mobx-react-lite";
import ReserveStore from "../../../viewmodels/reserv/ReserveStore";
import { Reserve } from "../../../models/section/Section";
import ClientInfo from "./create/ClienInfo";
import moment from "moment";
import { useState } from "react";
import { CSVLink } from 'react-csv';
import reserveRed from "../../../assets/menu/reserveRed.svg"

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
        await reserveStore.deleteReserve(localStorage.getItem('user_etno_locality')!, reserveId)
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
            {reserveStore.getPaginatedReserve.content?.length === 0 ? (
                <div className="flex flex-row m-1">
                    <img src={reserveRed} alt="BIG" />
                    <label className="text-xl my-auto ml-5 font-medium">No hay Reservas</label>
                </div>
            ) : (
                <div> {reserveStore.getModalClientInfo ? (
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
                                    <th scope="row" className="tableCamp">
                                        <div className="overflow-y-auto max-h-20">
                                        <input type="checkbox" onChange={(value) => {
                                        if (value.currentTarget.checked) {
                                          reserveStore.reserveListChecked.push(reservMap);
                                        } else {
                                           reserveStore.reserveListChecked.splice(reserveStore.getReservesCheckedList.indexOf(reservMap), 1)
                                        }
                                        console.log(value.currentTarget.checked)}
                                    } ></input>
                                        </div>
                                    </th>
                                    <th scope="row" className="tableCamp">
                                        <div className="overflow-y-auto max-h-20">
                                            {reservMap.name}
                                        </div>
                                    </th>
                                    <td className="tableCamp" >
                                        <div className="overflow-y-auto max-h-20">
                                            {reservMap.place?.name}
                                        </div>
                                    </td>
                                    <td className="tableCamp">
                                        <div className="overflow-y-auto max-h-20">
                                            {reservMap.hall}
                                        </div>
                                    </td>
                                    <td className="tableCamp" >
                                        <div className="overflow-y-auto max-h-20">
                                            <div className=" flex flex-col overflow-y-auto">
                                                {fillDates(reservMap.date!!).map((item, index) => (
                                                    <label>{moment(item).format("dd, DD MMMM")}</label>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableCamp">
                                        <div className="overflow-y-auto max-h-20">
                                            <div className="flex flex-col">
                                                <div className=" flex justify-center w-full">
                                                    <CSVLink
                                                        data={reservMap.reserveSchedules}
                                                        filename={'reserves.csv'}
                                                        enclosingCharacter={` `}
                                                        className={"btnStandard w-3/5 h-9"}
                                                        target="_blank"
                                                        headers={hourHeader} >Exportar horario
                                                    </CSVLink>
                                                </div>
                                                <div className=" flex flex-col overflow-y-auto">
                                                    {reservMap.reserveSchedules?.map((item, index) => (
                                                        <label key={index}>{item.date}</label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableCamp" >
                                        {reservMap.isPrivate ? "Privado" : "Publico"}
                                    </td>
                                    <td className="tableCamp" >
                                        {reservMap.isReserved ? <label className="text-green-600 font-bold">Confirmado</label> : <label className="text-gray-600 font-bold">Pendiente</label>}
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
            )}
        </div>
    )
}
export default observer(TableReserves)