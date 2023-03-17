import { observer, Observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pharmacy } from "../../../models/section/Section";
import PharmacyStore from "../../../viewmodels/pharmacy/PharmacyStore";
import EditPharmacy from "./create/EditPharmacy";
const pharmacyStore = PharmacyStore.getPharmacyStore()
interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}
const TablePharmacy = (prop: PropTable) => {
    const navigate = useNavigate()
    const deletePharmacy = async (pharmacy: string) => {
        await pharmacyStore.deletePharmacy('Bolea', pharmacy)
    }
    function savePharm(pharm: Pharmacy) {
        pharmacyStore.updatePharmacy(pharm)
        pharmacyStore.setModalEdit(true)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {pharmacyStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-start">
                                <EditPharmacy />
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
                                <div className="min-w-max">
                                    {item}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pharmacyStore.getPaginatedPharmacy.content?.map((pharmMap, index) => (
                        pharmacyStore.getPaginatedPharmacy.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                <div className="tableCamp">
                                    {pharmMap.type}
                                </div>
                            </th>
                            <td className="px-6 py-4 ">
                                <div className="tableCamp">
                                    {pharmMap.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 ">
                                <div className="tableCamp">
                                    {pharmMap.schedule}
                                </div>
                            </td>
                            <td className=" px-6 py-4">
                                <div className="tableCamp overflow-y-auto  min-w-full ">
                                    {pharmMap.description}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {pharmMap.phone}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    <a className=" text-blue-500 hover:text-blue-600" href={pharmMap.link}>{pharmMap.link}</a>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { savePharm(pharmMap) }}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deletePharmacy(pharmMap.name!!)}>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default observer(TablePharmacy)