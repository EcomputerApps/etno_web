import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { Necrologue } from "../../../models/section/Section"
import NecrologueStore from "../../../viewmodels/necrologue/NecrologueStore"
import EditNecrologue from "./create/EditNecro"
const necrologueStore = NecrologueStore.getNecrologueStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableNecrologue = (prop: PropTable) => {
    const navigate = useNavigate()
    const deleteNecro = async (necro: string) => {
        await necrologueStore.deleteNecrologue('Bolea', necro)
    }
    function saveNecro(necro: Necrologue) {
        necrologueStore.updateNecro(necro)
        necrologueStore.setModalEdit(true)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {necrologueStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center mt-10">
                                <EditNecrologue />
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
                    {necrologueStore.getPaginatedNecro.content?.map((newNecro, index) => (
                        necrologueStore.getPaginatedNecro.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center ">
                                <div className="tableCamp">
                                    {newNecro.name}
                                </div>
                            </th>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp">
                                    {newNecro.deathDate}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center overflow-y-auto items-start min-w-full">
                                <div className="tableCamp">
                                    {newNecro.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 flex items-center justify-center ">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                        saveNecro(newNecro)
                                    }}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteNecro(newNecro.name!!)}>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default observer(TableNecrologue)