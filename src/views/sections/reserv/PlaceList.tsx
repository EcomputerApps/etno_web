import { observer } from "mobx-react-lite"
import ReserveStore from "../../../viewmodels/reserv/ReserveStore";
import logoEtno from '../../../../src/assets/logo_etno.png'
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import CreatePlace from "./create/CreatePlace";
import { Place } from "../../../models/section/Section";
import { useEffect, useState } from "react";
import EditPlace from "./create/EditPlace";

const reserveStore = ReserveStore.getReserveStore()
interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const ReservPlaceList = (prop: PropTable) => {
    const [pageNumber, setPageNumber] = useState(0)
    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }
    useEffect(() => {
        reserveStore.getRequestPagiantedPlaces("Bolea", pageNumber, 5)
    }, [pageNumber])

    function savePlace(place: Place) {
        reserveStore.updatePlace(place)
        reserveStore.setModalEdit(true)
    }
    const deletePlace = async (idPlace: string) => {
        await reserveStore.deletePlace('Bolea', idPlace)
    }

    var lugares = new Array<Place>()
    reserveStore.getPaginatedPlaces.content?.map((item, index) => {
        lugares.push(item)
    })
    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-11/12 h-screen overflow-y-auto border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3 uppercase'>LISTA DE Lugares</p>
                </div>
            </div>
            {reserveStore.getModalCreatePlaces ? (
                <div>
                    <div className=" fixed inset-0 z-50  flex justify-center items-center"  >
                        <div className=" w-screen h-screen top-0 -left-1 fixed">
                            <div className="w-screen  flex justify-start ">
                                <CreatePlace />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {reserveStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50  flex justify-center items-center"  >
                        <div className=" w-screen h-screen top-0 -left-1 fixed">
                            <div className="w-screen  flex justify-start ">
                                <EditPlace />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
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
                        {lugares.map((placeMap, index) => (
                            lugares.length > 0 &&
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    <div className="tableCamp">
                                        {placeMap.name}
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <div className="tableCamp flex flex-col overflow-y-auto">
                                        {placeMap.halls?.map((item, index) => (
                                            <label key={index}>{item.name}</label>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-20 flex items-center justify-center">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => savePlace(placeMap)} >Editar</a>
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deletePlace(placeMap.idPlace!!)}>Eliminar</a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center lg:flex-row flex-col">
                <button className="btnStandard mr-3" disabled={pageNumber < 1} onClick={decrementPage}>
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <div>
                    <button name="bandBtnCancel" className="btnStandard mr-3" onClick={() => reserveStore.setModalCreatePlaces(true)}>Crear lugar</button>
                    <button name="bandBtnCancel" className="btnStandard " onClick={() => reserveStore.setModalPlaceList(false)}>Volver  </button>
                </div>

                <button onClick={incrementPage} disabled={pageNumber === reserveStore.getPaginatedPlaces.totalPages!! - 1 || reserveStore.getPaginatedPlaces.content?.length === 0}
                    className="btnStandard ml-3" >
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>

        </div>
    )
}
export default observer(ReservPlaceList)