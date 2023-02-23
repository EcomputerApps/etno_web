import { observer } from "mobx-react-lite"
import SposnsorStore from "../../../viewmodels/sponsor/SponsorStore"

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
                                {sponsor.phoneNumber}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="h-20 flex items-center justify-center">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
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