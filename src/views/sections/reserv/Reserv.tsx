import { observer } from "mobx-react-lite"
import { Calendar, DateLocalizer, momentLocalizer, Navigate } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import 'moment/locale/es';
import { useMemo } from "react";

const Reserv = () => {
    const localizer = momentLocalizer(moment)
    const { defaultDate, views, } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: {
                month: true,

            },
        }),
        []
    )
    return (
        <div>
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Reservas</h2>
                <div className="ml-auto">
                    <button type="button"
                        className="btnStandard mr-5 h-12">

                        Lugares
                    </button>
                    <button type="button"
                        className="btnStandard ">

                        Reserva
                    </button>
                </div>

            </div>
            <div>
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
    )
}
export default observer(Reserv)