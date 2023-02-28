import { observer, Observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PharmacyStore from "../../../viewmodels/pharmacy/PharmacyStore";
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
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    {pharmacyStore.getPaginatedPharmacy.content?.map((pharmacy, index) => (
                        pharmacyStore.getPaginatedPharmacy.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                <div className="tableCamp">
                                    {pharmacy.type}
                                </div>
                            </th>
                            <td className="px-6 py-4 ">
                                <div className="tableCamp">
                                    {pharmacy.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 ">
                                <div className="tableCamp">
                                    {pharmacy.schedule}
                                </div>
                            </td>
                            <td className=" px-6 py-4">
                                <div className="tableCamp overflow-y-auto  min-w-full ">
                                    {pharmacy.description}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {pharmacy.phone}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    <a className=" text-blue-500 hover:text-blue-600" href={pharmacy.link}>{pharmacy.link}</a>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                        pharmacyStore.updatePharmacy(pharmacy)
                                        navigate('/editPharmacy')
                                    }}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deletePharmacy(pharmacy.name!!)}>Eliminar</a>
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