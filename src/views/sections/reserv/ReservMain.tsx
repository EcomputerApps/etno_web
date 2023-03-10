import { observer } from "mobx-react-lite"
import { Calendar, DateLocalizer, momentLocalizer, Navigate } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import Pencil from "../../../assets/menu/create.svg"
import 'moment/locale/es';
import { useEffect, useMemo, useState } from "react";
import ReserveStore from "../../../viewmodels/reserv/ReservStore";
import CreateReserve from "./create/CreateReserv";
import PlaceList from "./PlaceList";
import TableReserves from "./TableReserves";
import { ToastContainer } from "react-toastify";
import ReservesCalendar from "./ReservesCalendar";
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"

const reserveStore = ReserveStore.getReserveStore()

const Reserve = () => {
    const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        reserveStore.getRequestPagiantedReserves("Bolea", pageNumber, 5)
    }, [])
    useEffect(() => {
        reserveStore.getRequestPlaces()
    }, [])

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }


    return (
        <div className="w-full h-full  relative">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Reservas</h2>
                    <div className="ml-auto  flex">
                        <button type="button"
                            className="btnStandard mr-5 h-12"
                            onClick={() => reserveStore.setModalCalendar(true)}>
                            Calendario
                        </button>
                        <button type="button"
                            className="btnStandard mr-5 h-12"
                            onClick={() => reserveStore.setModalPlaceList(true)}>
                            Lugares
                        </button>
                        <button type="button"
                            className="btnStandard h-12"
                            onClick={() => reserveStore.setModalCreate(true)}>
                            <img src={Pencil} alt="create" />
                            Crear
                        </button>
                    </div>
                </div>
                <TableReserves currentPage={pageNumber} headerList={["Nombre", "Lugar", "Sala", "Fecha", "Hora", "Tipo", "Status", "Acciones"]} />
                {reserveStore.getModalPlaceList ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-center mt-10">
                                    <PlaceList headerList={["Nombre", "Salas", "Acciones"]} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
                {reserveStore.getModalCalendar ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >

                            <ReservesCalendar />
                        </div>
                    </div>
                ) : <></>}
                {reserveStore.getModalCreate ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >
                            <CreateReserve />
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