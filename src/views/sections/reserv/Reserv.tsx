import { observer } from "mobx-react-lite"
import { Calendar, DateLocalizer, momentLocalizer, Navigate } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import 'moment/locale/es';
import { useMemo } from "react";
import ReserveStore from "../../../viewmodels/reserv/ReservStore";
import CreateReserva from "./create/CreateReserva";

const reserveStore = ReserveStore.getReserveStore()
const Reserv = () => {
    const localizer = momentLocalizer(moment)
    const { defaultDate, views, } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: {
                month: true,
                week : true,
                day: true
                

            },
        }),
        []
    )
    return (
        <div className="w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Reservas</h2>
                <div className="ml-auto">
                    <button type="button"
                        className="btnStandard mr-5 h-12">
                        Lugares
                    </button>
                    <button type="button"
                        className="btnStandard" onClick={()=>reserveStore.setModalCreate(true)}>
                        Reserva
                    </button>
                </div>
            </div>
            {reserveStore.getModalCreate ? (
        <div>
          <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
            <CreateReserva />
          </div>
        </div>
      ) : <></>}
            <div>
            <div className="rounded-md mt-3 border-2 bg-indigo-50">
                    <Calendar
                        localizer={localizer}
                        className=" bg-indigo-50 p-1"
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