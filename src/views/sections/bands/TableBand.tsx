import { observer } from "mobx-react-lite"
import BandStore from "../../../viewmodels/band/BandsStore"
import "../../../index.css"
const bandStore = BandStore.getBandStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableBand = (prop: PropTable) => {
    const deleteBand = async (band: string) => {
        await bandStore.deleteBand('Bolea', band)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    {bandStore.getPaginatedBands.content?.map((band, index) => (
                        bandStore.getPaginatedBands.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white    ">
                                <div className="tableCamp">
                                    {band.title}
                                </div>
                            </th>
                            <td className="px-6 py-4">
                            <div className="tableCamp overflow-y-auto items-start min-w-full">
                                        {band.description}
                                 
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="tableCamp">
                                    {band.issuedDate}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteBand(band.title!!)}>Eliminar</a>
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