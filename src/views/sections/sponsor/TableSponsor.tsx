import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Sponsor } from "../../../models/section/Section"
import SposnsorStore from "../../../viewmodels/sponsor/SponsorStore"
import EditSponsor from "./create/EditSponsor"
import sponsorRed from "../../../assets/menu/sponsorRed.svg"
const sponsorStore = SposnsorStore.getSponsorStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableSponsor = (prop: PropTable) => {

    const [confirm, setConfirm] = useState(false)
    const [deltitle, setDelTitle] = useState<string>("")

    function deleteConfirmation(Title: string) {
        setConfirm(true)
        setDelTitle(Title)
    }

    const deleteSponsor = async (sponsor: string) => {
        await sponsorStore.deleteSponsor('Bolea', sponsor)
        setConfirm(false)
    }

    function saveSponsor(sponsor: Sponsor) {
        sponsorStore.updateSponsor(sponsor)
        sponsorStore.setModalEdit(true)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {sponsorStore.getPaginatedSponsor.content?.length === 0 ? (
                <div className="flex flex-row m-1">
                    <img src={sponsorRed} alt="BIG" />
                    <label className="text-xl my-auto ml-5 font-medium">No hay Patrocinadores</label>
                </div>
            ) : (
                <div>
                    {sponsorStore.getModalEdit ? (
                        <div>
                            <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                                <div className="fixed inset-0 w-screen h-screen">
                                    <div className="w-screen  flex justify-start">
                                        <EditSponsor />
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
                            {sponsorStore.getPaginatedSponsor.content?.map((sponsor, index) => (
                                sponsorStore.getPaginatedSponsor.content!!.length > 0 &&
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="tableCamp font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {sponsor.title}
                                    </th>
                                    <td className="tableCamp">
                                        {sponsor.description}
                                    </td>
                                    <td className="tableCamp">
                                        {sponsor.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-20 flex items-center justify-center">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { saveSponsor(sponsor) }}>Editar</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(sponsor.title!!)}>Eliminar</a>
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
                                            <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {deltitle}?</label>
                                            <div className="flex justify-center m-auto mt-5 mb-3">
                                                <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteSponsor(deltitle)}>SI</button>
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
export default observer(TableSponsor)