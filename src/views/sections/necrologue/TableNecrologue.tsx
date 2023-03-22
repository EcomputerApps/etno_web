import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Necrologue } from "../../../models/section/Section"
import NecrologueStore from "../../../viewmodels/necrologue/NecrologueStore"
import EditNecrologue from "./create/EditNecro"
import deathRed from "../../../assets/menu/deathRed.svg"

const necrologueStore = NecrologueStore.getNecrologueStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableNecrologue = (prop: PropTable) => {

    const [confirm, setConfirm] = useState(false)
    const [delName, setDelName] = useState<string>("")
    const [delId, setDelId] = useState<string>("")

    function deleteConfirmation(necro: Necrologue) {
        setConfirm(true)
        setDelName(necro.name!!)
        setDelId(necro.idDeath!!)
    }

    const deleteNecro = async (idNecro: string) => {
        await necrologueStore.deleteNecrologue('Bolea', idNecro)
        setConfirm(false)
    }
    function saveNecro(necro: Necrologue) {
        necrologueStore.updateNecro(necro)
        necrologueStore.setModalEdit(true)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {necrologueStore.getPaginatedNecro.content?.length === 0 ? (
                <div className="flex flex-row m-1">
                    <img src={deathRed} alt="BIG" />
                    <label className="text-xl my-auto ml-5 font-medium">No hay Fallesimientos</label>
                </div>
            ) : (
                <div>
                    {necrologueStore.getModalEdit ? (
                        <div>
                            <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                                <div className="fixed inset-0 w-screen h-screen">
                                    <div className="w-screen  flex justify-start">
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
                                    <th scope="row" className="tableCamp font-medium text-gray-900 whitespace-nowrap dark:text-white text-center ">
                                        <div className="overflow-y-auto max-h-20">
                                            {newNecro.name}
                                        </div>
                                    </th>
                                    <td className="tableCamp">
                                        {newNecro.deathDate}
                                    </td>
                                    <td className="tableCamp">
                                        <div className="overflow-y-auto max-h-20">
                                            {newNecro.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex items-center justify-center ">
                                        <div className="h-20 flex items-center justify-center">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                                saveNecro(newNecro)
                                            }}>Editar</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(newNecro)}>Eliminar</a>
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
                                            <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delName}?</label>
                                            <div className="flex justify-center m-auto mt-5 mb-3">
                                                <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteNecro(delId)}>SI</button>
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
export default observer(TableNecrologue)