import moment from "moment"
import { useEffect, useMemo } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import ReserveStore from "../../../viewmodels/reserv/ReservStore";

const reserveStore = ReserveStore.getReserveStore()

const ReservesCalendar = () => {
    useEffect(() => {
        reserveStore.getRequestReserves()
    }, [])
    //Calendar parts
    const events = new Array()
    const localizer = momentLocalizer(moment)
    const { defaultDate, views, } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: {
                month: true,
                week: true,
                day: true,
                agenda: true,
                espacio: true,
                espacio2: true
            },
        }),
        []
    )
    function fillDates(dates: string): Date[] {
        var arrayAux = dates.split(",")
        var arrayDate = new Array()
        arrayAux.map((item) => {
            arrayDate.push(new Date(item))
        })
        return arrayDate
    }
    reserveStore.getAllReserves.reserves?.map((item) => {
        if (item.isReserved) {
            for (var i = 0; i < fillDates(item.date!!).length; i++) {
                for (var j = 0; j < item.reserveSchedules!!.length; j++) {
                    events.push({
                        title: item.name + ", "+item.place?.name+", "+item.hall+", " + item.description,
                        start: new Date(moment(fillDates(item.date!!)[i]).format("YYYY-MM-DD") + "," + item.reserveSchedules!![j].date!!.split("-")[0]),
                        end: new Date(moment(fillDates(item.date!!)[i]).format("YYYY-MM-DD") + "," + item.reserveSchedules!![j].date!!.split("-")[1]),

                    })
                }
            }
        }

        console.log("Calendario actualizado")
    })


    return (
        <div className="w-1/2">
            <div className="rounded-md mt-3 border-2 bg-indigo-50 relative">
                <div className=' absolute lg:right-0  right-[93px] lg:-top-4 top-[19px]  rbc-toolbar'>
                    <div className='flex mt-5 justify-end bg-indigo-50  rbc-btn-group'>
                        <button className='top-0 ' onClick={() => reserveStore.setModalCalendar(false)}>Volver</button>
                    </div>
                </div>
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
    )
}
export default ReservesCalendar