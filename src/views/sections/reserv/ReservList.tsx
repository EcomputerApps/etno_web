import { observer } from "mobx-react-lite";
import ReserveStore from "../../../viewmodels/reserv/ReservStore";
import logoEtno from '../../../../src/assets/logo_etno.png'
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import EditReserv from "./create/EditReserv";

const reserveStore = ReserveStore.getReserveStore()
interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}
const ReservList = (prop: PropTable) => {
    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-max h-screen overflow-y-auto border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3 uppercase'>Lista de reservas</p>
                </div>
            </div>
            {reserveStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center">
                        <EditReserv />
                    </div>
                </div>
            ) : <></>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase  bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        {prop.headerList.map((item, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                <div className="min-w-max">
                                    {item}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reserveStore.getPaginatedReserv.content?.map((reservMap, index) => (
                        reserveStore.getPaginatedReserv.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                <div className="tableCamp">
                                    {reservMap.name}
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {reservMap.place}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {reservMap.hall}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {reservMap.date}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {reservMap.time}
                                </div>
                            </td>
                            <td className=" px-6 py-4">
                                <div className="tableCamp overflow-y-auto  min-w-full ">
                                    {reservMap.isPrivate ? "Privado" : "Publico"}
                                </div>
                            </td>
                            <td className="px-6 py-4 ">
                                <div className="tableCamp">
                                    {reservMap.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 ">
                                <div className="tableCamp">
                                    {reservMap.phone}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>reserveStore.setModalEdit(true)}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2">Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1 ">
                <button className="btnStandard mr-3">
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => reserveStore.setModalReservList(false)}>Volver</button>
                <button
                    className="btnStandard ml-3">
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
        </div>
    )
}
export default observer(ReservList)