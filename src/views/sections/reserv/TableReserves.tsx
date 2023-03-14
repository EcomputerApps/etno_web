import { observer } from "mobx-react-lite";
import ReserveStore from "../../../viewmodels/reserv/ReserveStore";
import { Reserve, ReserveUser } from "../../../models/section/Section";
import ClientInfo from "./create/ClienInfo";
import moment from "moment";

const reserveStore = ReserveStore.getReserveStore()
interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableReserves = (prop: PropTable) => {

    const deleteReserva = async (reserve: string) => {
        await reserveStore.deleteReserve("Bolea", reserve)
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
                <tbody >
                    {reserveStore.getPaginatedReserve.content?.map((reservMap, index) => (
                        reserveStore.getPaginatedReserve.content!!.length > 0 &&

                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

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
                                <div className="tableCamp flex flex-col overflow-y-auto">
                                    {reservMap.reserveSchedules?.map((item, index) => (
                                        <label key={index}>{item.date}</label>
                                    ))}
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
                                    {reservMap.reserveUsers!![0].isReserved ? (
                                        <div>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteReserva(reservMap.idReserve!!)}>Cancelar</a>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <a href="#" className="font-medium text-green-600 dark:text-red-500 hover:underline m-2" onClick={() => saveClient(reservMap)}>Procesar</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteReserva(reservMap.idReserve!!)}>Rechazar</a>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default observer(TableReserves)