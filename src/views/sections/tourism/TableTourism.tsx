import { observer } from "mobx-react-lite"
import TourismStore from "../../../viewmodels/tourism/TourismStore"
import "../../../index.css"
import EditTourism from "./create/EditTourism"
import { useState } from "react"
import tourismRed from "../../../assets/menu/tourismRed.svg"

const tourismStore = TourismStore.getTourismStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableTourism = (prop: PropTable) => {
    const [confirm, setConfirm] = useState(false)
    const [delTitle, setDelTitle] = useState<string>("")
    function deleteConfirmation(title: string) {
        setConfirm(true)
        setDelTitle(title)
    }
    const deleteTourism = async (event: string) => {
        await tourismStore.deleteTourism('Bolea', event)
        setConfirm(false)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {tourismStore.getPaginatedTourism.content?.length === 0 ? (
                <div className="flex flex-row m-1">
                    <img src={tourismRed} alt="BIG" />
                    <label className="text-xl my-auto ml-5 font-medium">No hay Turismo</label>
                </div>
            ) : (
                <div>
                    {tourismStore.getModalEdit ? (
                        <div>
                            <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                                <div className="fixed inset-0 w-screen h-screen">
                                    <div className="w-screen  flex justify-start">
                                        <EditTourism />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <></>}
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase  bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                            <tr>
                                {prop.headerList.map((item, index) => (
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tourismStore.getPaginatedTourism.content?.map((tourism, index) => (
                                tourismStore.getPaginatedTourism.content!!.length > 0 &&
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                                    <th scope="row" className="tableCampfont-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {tourism.type}
                                    </th>
                                    <td className="tableCamp">
                                        <div className="overflow-y-auto max-h-20">
                                            {tourism.title}
                                        </div>
                                    </td>
                                    <td className="tableCamp">
                                    <div className="overflow-y-auto max-h-20">
                                            {tourism.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-20 flex items-center justify-center">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                                tourismStore.updateTourism(tourism)
                                                tourismStore.setModalEdit(true)
                                            }}>Editar</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(tourism.title!!)}>Eliminar</a>
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
                                            <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delTitle}?</label>
                                            <div className="flex justify-center m-auto mt-5 mb-3">
                                                <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteTourism(delTitle)}>SI</button>
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
export default observer(TableTourism)