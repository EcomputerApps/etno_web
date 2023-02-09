import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import AdvertStore from "../../../viewmodels/advert/AdvertStore"
import TableAdvert from "./TableAdvert"

const adverStore = AdvertStore.getAdvertStore()

const Advert = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        adverStore.getRequestAdvert('Bolea', pageNumber, 5)//calcular cuantos eventos por pagina optimales
    }, [pageNumber])

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        if (pageNumber > 0)
            setPageNumber(pageNumber - 1)
    }
    return (
        <div className="w-full h-full  relative">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Anuncios</h2>
                    <div className="ml-auto">
                        <button onClick={() => navigate("/addAdvert")} type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-indigo-600 px-4 py-2 text-sm font-medium text-white    shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
                            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                            </svg>
                            Crear
                        </button>
                    </div>
                </div>
                <TableAdvert currentPage={pageNumber} headerList={['Título', 'Descripción', 'Enlace', 'Acciones']} />
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button  onClick={decrementPage} disabled={pageNumber < 1} className="inline-flex disabled:bg-gray-500 w-fit items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Anterior
                </button>
                <button onClick={incrementPage}  disabled={pageNumber == adverStore.getPaginatedAdverts.totalPages!! - 1 || adverStore.getPaginatedAdverts.content?.length == 0} className="inline-flex items-center rounded-md border  disabled:bg-gray-500 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
                    Siguiente
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>

    )
}
export default observer(Advert)