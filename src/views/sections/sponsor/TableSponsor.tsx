import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { Sponsor } from "../../../models/section/Section"
import SposnsorStore from "../../../viewmodels/sponsor/SponsorStore"
import EditSponsor from "./create/EditSponsor"

const sponsorStore = SposnsorStore.getSponsorStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableSponsor = (prop: PropTable) => {
    const deleteSponsor = async (sponsor: string) => {
        await sponsorStore.deleteSponsor('Bolea', sponsor)
    }
    const navigate = useNavigate()
    function saveSponsor(sponsor: Sponsor) {
        sponsorStore.updateSponsor(sponsor)
        sponsorStore.setModalEdit(true)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                <div className="tableCamp">
                                    {sponsor.title}
                                </div>
                            </th>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp overflow-y-auto  min-w-full">
                                    {sponsor.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="tableCamp">
                                    {sponsor.phone}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { saveSponsor(sponsor) }}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteSponsor(sponsor.title!!)}>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default observer(TableSponsor)