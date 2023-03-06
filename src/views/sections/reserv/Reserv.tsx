import { observer } from "mobx-react-lite"
import { Calendar, DateLocalizer, momentLocalizer, Navigate } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import 'moment/locale/es';
import { useMemo } from "react";
import ReserveStore from "../../../viewmodels/reserv/ReservStore";
import CreateReserva from "./create/CreateReserv";
import ReservPlaceList from "./ReservPlaceList";
import ReservList from "./ReservList";





const reserveStore = ReserveStore.getReserveStore()
const Reserv = () => {
    const localizer = momentLocalizer(moment)
    const { defaultDate, views, } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: {
                month: true,
                week: true,
                day: true
            },
        }),
        []
    )
    const reservasFalsas = [{
        name: "Juan",
        email: "talEmail",
        phone: "123456",
        isPrivate: true,
        place: "Futbol",
        hall: "Sala 1",
        date: ['2023-03-11', '2023-03-12', '2023-03-18', '2023-03-19'],
        time: ['9:00-10:00', '10:00-11:00']
    },
    {
        name: "Pedro",
        email: "talEmail",
        phone: "123456",
        isPrivate: true,
        place: "Restaurante",
        hall: "mesa 32",
        date: ['2023-03-14', '2023-03-11'],
        time: ['12:00-13:00', '13:00-15:00']
    }
    ]
    const events = new Array()
    reservasFalsas.map((item) => {
        for (var i = 0; i < item.date.length; i++) {
            for (var j = 0; j < item.time.length; j++) {
                events.push({
                    title: item.name,
                    start: new Date(item.date[i] + "," + item.time[j].split("-")[0]),
                    end: new Date(item.date[i] + "," + item.time[j].split("-")[1]),
                    allday: true
                })
            }

        }
    })

    return (
        <div className="w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Reservas</h2>
                <div className="ml-auto">
                    <button type="button"
                        className="btnStandard mr-5 h-12" onClick={() => reserveStore.setModalReservList(true)}>
                        Lista de reservas
                    </button>
                    <button type="button"
                        className="btnStandard mr-5 h-12" onClick={() => reserveStore.setModalReservPlaces(true)}>
                        Lugares
                    </button>
                    <button type="button"
                        className="btnStandard" onClick={() => reserveStore.setModalCreate(true)}>
                        Reserva
                    </button>
                </div>
            </div>
            {reserveStore.getModalReservPlaces ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center">
                        <ReservPlaceList headerList={["Nombre", "Salas", "Acciones"]} />
                    </div>
                </div>
            ) : <></>}
            {reserveStore.getModalReservList ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >
                        <ReservList headerList={["Nombre", "Lugar", "Sala", "Fecha", "Hora", "Tipo", "Email", "Telefono", "Acciones"]} />

                    </div>
                </div>
            ) : <></>}
            {reserveStore.getModalCreate ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >
                        <CreateReserva />
                    </div>
                </div>
            ) : <></>}
            <div>
                <div className="rounded-md mt-3 border-2 bg-indigo-50">
                    <Calendar
                        localizer={localizer}
                        className=" bg-indigo-50 p-1"
                        events={events}
                        messages={{
                            week: 'Semana',
                            work_week: 'Semana de trabajo',
                            day: 'Día',
                            month: 'Mes',
                            previous: 'Anterior',
                            next: 'Siguiente',
                            today: 'Hoy',
                            agenda: 'El Diario',
                            showMore: total => `+${total} mas`,
                        }}
                        defaultView="month"
                        popup
                        style={{ height: "90vh" }}
                        views={views}
                    />
                </div>
            </div>
        </div>

    )
}
export default observer(Reserv)