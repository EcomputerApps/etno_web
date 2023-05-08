import { observer } from "mobx-react-lite"
import "react-big-calendar/lib/css/react-big-calendar.css";
import Pencil from "../../../assets/menu/create.svg"
import 'moment/locale/es';
import { useEffect, useState } from "react";
import ReserveStore from "../../../viewmodels/reserv/ReserveStore";
import CreateReserve from "./create/CreateReserv";
import PlaceList from "./PlaceList";
import TableReserves from "./TableReserves";
import { ToastContainer } from "react-toastify";
import ReservesCalendar from "./ReservesCalendar";
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { CSVLink } from 'react-csv';

const reserveStore = ReserveStore.getReserveStore()

const Reserve = () => {

    const headers = [
        { label: 'Nombre', key: 'name' },
        { label: 'Lugar', key: 'place.name' },
        { label: 'Sala', key: 'hall' },
        { label: 'Fecha', key: 'date' },
        { label: 'Tipo', key: 'isPrivate' },
        { label: 'Status', key: 'isReserved' }
    ]
    const [pageNumber, setPageNumber] = useState(0)
    const [searchFilter, setSearchFilter] = useState<string>('')

    useEffect(() => {
        reserveStore.getPaginatedReserveRequest(localStorage.getItem('user_etno_locality')!, searchFilter, pageNumber, 5)
    }, [])

    useEffect(() => {
        reserveStore.getRequestPlaces(localStorage.getItem('user_etno_locality')!)
    }, [])

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }
    function deleteByGroup() {
        if (reserveStore.getReservesCheckedList.length > 0) {
            reserveStore.deleteAllReserveById(localStorage.getItem('user_etno_locality')!)
        }
    }
    return (
        <div className="w-full h-full  relative">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl  sm:tracking-tight">Reservas</h2>
                    <div className="mainButtonsDiv">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative w-96">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input onChange={(value) => setSearchFilter(value.currentTarget.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Título de noticia" required />
                            <button onClick={() => reserveStore.getPaginatedReserveRequest(localStorage.getItem('user_etno_locality')!, searchFilter, pageNumber, 5)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                        </div>
                        {reserveStore.getPaginatedReserve.content! && (
                            <div hidden={reserveStore.getPaginatedReserve.content.length === 0}>
                                <CSVLink
                                    data={reserveStore.getPaginatedReserve.content!}
                                    filename={'reserves.csv'}
                                    enclosingCharacter={` `}
                                    target="_blank"
                                    className={"btnStandard mr-3 h-12"}
                                    headers={headers} >Exportar reservas a excel
                                </CSVLink>
                            </div>
                        )}
                        <button type="button"
                            className="btnStandard mr-3 h-12"
                            onClick={() => reserveStore.setModalCalendar(true)}>
                            Calendario
                        </button>
                        <button type="button"
                            className="btnStandard mr-3 h-12"
                            onClick={() => reserveStore.setModalPlaceList(true)}>
                            Lugares
                        </button>
                       
                        <button type="button"
                            className={`btnStandard ${reserveStore.getPaginatedReserve.totalElements! < 1 ? 'invisible' : 'visible'}`}
                            onClick={deleteByGroup}>
                            <img src={Pencil} alt="create" />
                            Eliminar
                        </button>
                        <button type="button"
                            className="btnStandard h-12"
                            onClick={() => reserveStore.setModalCreate(true)}>
                            <img src={Pencil} alt="create" />
                            Crear
                        </button>
                    </div>
                </div>
                <TableReserves currentPage={pageNumber} headerList={["Selección", "Nombre", "Lugar", "Sala", "Fecha", "Hora", "Tipo", "Status", "Acciones"]} />
                {reserveStore.getModalPlaceList ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className=" w-screen h-screen top-0 -left-1 fixed">
                                <div className="w-screen  flex justify-start">
                                    <PlaceList headerList={["Nombre", "Salas", "Acciones"]} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
                {reserveStore.getModalCalendar ? (
                    <div>
                        <div className="fixed inset-0 z-50  bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className=" w-screen h-screen top-0 -left-1 fixed">
                                <div className="flex w-full aspect-square">
                                    <ReservesCalendar />
                                </div>
                            </div>

                        </div>
                    </div>
                ) : <></>}
                {reserveStore.getModalCreate ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >
                            <div className=" w-screen h-screen top-0 -left-1 fixed">
                                <div className="w-screen  flex justify-start">
                                    <CreateReserve />
                                </div>
                            </div>
                        </div>

                    </div>
                ) : <></>}
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button onClick={decrementPage} disabled={pageNumber < 1} className="btnStandard mr-10">
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button onClick={incrementPage}
                    disabled={pageNumber === reserveStore.getPaginatedReserve.totalPages!! - 1 || reserveStore.getPaginatedReserve.content?.length === 0}
                    className="btnStandard">
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
            <ToastContainer style={{ margin: "50px" }} />
        </div>
    )
}
export default observer(Reserve)