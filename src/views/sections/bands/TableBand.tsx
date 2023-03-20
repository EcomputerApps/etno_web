import { observer } from "mobx-react-lite"
import BandStore from "../../../viewmodels/band/BandsStore"
import "../../../index.css"

import { Band } from "../../../models/section/Section"
import { useState } from "react"
import EditBand from "./create/EditBand"

const bandStore = BandStore.getBandStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableBand = (prop: PropTable) => {

    const [confirm, setConfirm] = useState(false)
    const [delTitle, setDelTitle] = useState<string>("")

    const deleteBand = async (band: string) => {
        await bandStore.deleteBand('Bolea', band)
        setConfirm(false)
    }

    function deleteConfirmation(title: string) {
        setConfirm(true)
        setDelTitle(title)
    }

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
                            <div className="w-screen  flex justify-start ">
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
                            <th scope="row" className="tableCampl font-medium text-gray-900 whitespace-nowrap dark:text-white    ">
                                {bandMap.title}
                            </th>
                            <td className="tableCampl  max-w-prose">
                                {bandMap.description}
                            </td>
                            <td className="tableCampl">
                                {bandMap.issuedDate}
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center relative">
                                    {confirm ? (
                                        <div>
                                            <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                                                <div className="fixed inset-0 w-screen h-screen">
                                                    <div className=" flex justify-center mt-10 ">
                                                        <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                                            <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delTitle}?</label>
                                                            <div className="flex justify-center m-auto mt-5 mb-3">
                                                                <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteBand(delTitle)}>SI</button>
                                                                <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <></>}
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => saveBand(bandMap)}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(bandMap.title!!)}>Eliminar</a>
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