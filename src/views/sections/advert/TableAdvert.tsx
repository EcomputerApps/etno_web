import { observer } from "mobx-react-lite"
import AdvertStore from "../../../viewmodels/advert/AdvertStore"
const advertStore = AdvertStore.getAdvertStore()

interface PropTable {
    headerList: string[],
    list?: any
}


const TableAdvert = (prop: PropTable) => {
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
                    {prop.list.map((advert: any, index: any) => (
                        prop.list.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {advert.title}
                            </th>
                            <td className="px-6 py-4">
                                {advert.description}
                            </td>
                            <td className="px-6 py-4">
                                {advert.link}
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => advertStore.deleteAdvert('Bolea', advert.title)}>Eliminar</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default observer(TableAdvert)