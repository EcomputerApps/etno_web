import { observer } from "mobx-react-lite"
import NewsStore from "../../../viewmodels/news/NewsStore"
const newsStore = NewsStore.getNewsStore()

interface PropTable{
    headerList : string[],
    list?:any
}

const TableNews = (prop : PropTable) =>{
    return(
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
                {prop.list.map((news: any, index: any) => (
                        prop.list.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {news.category}
                        </th>
                        <td className="px-6 py-4">
                            {news.title}
                        </td>
                        <td className="px-6 py-4">
                            {news.newsDate}
                        </td>
                        <td className="px-6 py-4">
                            {news.description}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => newsStore.deleteNews('Bolea', news.title)}>Eliminar</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default observer (TableNews)