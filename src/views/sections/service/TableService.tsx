import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { Service } from "../../../models/section/Section"
import ServiceStore from "../../../viewmodels/service/ServiceStore"
import EditService from "./create/EditService"
const serviceStore = ServiceStore.getServiceStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableService = (prop: PropTable) => {
    const deleteService = async (owner: string) => {
        await serviceStore.deleteService('Bolea', owner)
    }
    const navigate = useNavigate()
    function saveService(service: Service) {
        serviceStore.updateService(service)
        serviceStore.setModalEdit(true)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {serviceStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center mt-10">
                                <EditService />
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
                    {serviceStore.getPaginatedService.content?.map((service, index) => (
                        serviceStore.getPaginatedService.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                <div className="tableCamp">
                                    {service.category}
                                </div>
                            </th>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp">
                                    {service.owner}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp">
                                    {service.number}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center ">
                                <div className="tableCamp">
                                    {service.schedule}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp overflow-y-auto  min-w-full">
                                    {service.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp">
                                    {service.urlWeb}
                                </div>
                            </td>

                            <td className="flex items-center justify-center px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                        saveService(service)
                                    }}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteService(service.owner!!)}>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default observer(TableService)