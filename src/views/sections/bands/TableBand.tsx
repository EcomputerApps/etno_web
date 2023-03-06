import { observer } from "mobx-react-lite"
import BandStore from "../../../viewmodels/band/BandsStore"
import "../../../index.css"
import { useNavigate } from "react-router-dom"
import { Band } from "../../../models/section/Section"
import { useState } from "react"
import EditPharmacy from "../pharmacy/create/EditPharmacy"
import EditBand from "./create/EditBand"

const bandStore = BandStore.getBandStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableBand = (prop: PropTable) => {

    const navigate = useNavigate()

    const deleteBand = async (band: string) => {
        await bandStore.deleteBand('Bolea', band)
    }
    const [showModal, setModal] = useState(false)
    function saveBand(band: Band) {
        bandStore.updateBand(band)
        bandStore.setModalEdit(true)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {bandStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center mt-10">
                                <EditBand />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
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
                    {bandStore.getPaginatedBands.content?.map((bandMap, index) => (
                        bandStore.getPaginatedBands.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white    ">
                                <div className="tableCamp">
                                    {bandMap.title}
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <div className="tableCamp overflow-y-auto  min-w-full">
                                    {bandMap.description}

                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {bandMap.issuedDate}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center relative">

                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => saveBand(bandMap)}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteBand(bandMap.title!!)}>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default observer(TableBand)