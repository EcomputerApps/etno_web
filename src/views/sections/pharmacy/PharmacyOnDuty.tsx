import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";
import PharmacyStore from '../../../viewmodels/pharmacy/PharmacyStore';
import { observer } from 'mobx-react-lite';

const pharmacyStore = PharmacyStore.getPharmacyStore()

const PharmacyOnDutyCalendar = () => {
    var events = new Array()

    useEffect(() => {
        pharmacyStore.getRequestPharmacyOnDuty("Bolea")

    }, [])

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

    pharmacyStore.getPOD.content?.map((item) => {
        for (var i = 0; i < item.dates!?.length; i++) {
            events.push({
                title: item.dates![i].namePharmacy,
                start: item.dates![i].date,
                end: moment(item.dates![i].date),
                allday: true
            })
        }
    })

    return (
        <div className="rounded-md lg:h-screen inset-0 border-2  relative w-full ">
            <div className=' absolute right-1  -top-4 rbc-toolbar'>
                <div className='flex mt-5 justify-end bg-indigo-50  rbc-btn-group'>
                    <button className='top-0 ' onClick={() => pharmacyStore.setModalCalendar(false)}>Volver</button>
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
                views={views}
            />
        </div>
    )
}
export default observer(PharmacyOnDutyCalendar)