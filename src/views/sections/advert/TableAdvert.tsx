import { observer } from "mobx-react-lite"
import { useState } from "react"
import "../../../index.css"
import { Ad } from "../../../models/section/Section"
import AdvertStore from "../../../viewmodels/advert/AdvertStore"
import EditAdvert from "./create/EditAdvert"
import advertRed from "../../../assets/menu/advertRed.svg"

const advertStore = AdvertStore.getAdvertStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableAdvert = (prop: PropTable) => {
    const [confirm, setConfirm] = useState(false)
    const [delTitle, setDelTitle] = useState<string>("")

    function deleteConfirmation(title: string) {
        setConfirm(true)
        setDelTitle(title)
    }

    const deleteAdvert = async (advert: string) => {
        await advertStore.deleteAdvert("Bolea", advert)
        setConfirm(false)
    }
    function saveNews(advert: Ad) {
        advertStore.updateAdvert(advert)
        advertStore.setModalEdit(true)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {advertStore.getPaginatedAdverts.content?.length === 0 ? (
                <div className="flex flex-row m-1">
                    <img src={advertRed} alt="BIG" />
                    <label className="text-xl my-auto ml-5 font-medium">No hay Anuncios</label>
                </div>
            ) : (<div>
                {advertStore.getModalEdit ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-start">
                                    <EditAdvert />
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
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {advertStore.getPaginatedAdverts.content?.map((advert, index) => (
                            advertStore.getPaginatedAdverts.content!!.length > 0 &&
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                <th scope="row" className="tableCamp font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="overflow-y-auto max-h-20">
                                        {advert.title}
                                    </div>
                                </th>
                                <td className="tableCamp">
                                    <div className="overflow-y-auto max-h-20">
                                        {advert.description}
                                    </div>
                                </td>
                                <td className="tableCamp">
                                    <div className="overflow-y-auto max-h-20">
                                        < a className=" text-blue-500 hover:text-blue-600" href={advert.webUrl}>{advert.webUrl}</a>
                                    </div>
                                </td>
                                <td className="tableCamp">
                                    <div className="h-20 flex items-center justify-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => saveNews(advert)}>Editar</a>
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(advert.title!!)}>Eliminar</a>
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
                                            <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteAdvert(delTitle)}>SI</button>
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
export default observer(TableAdvert)