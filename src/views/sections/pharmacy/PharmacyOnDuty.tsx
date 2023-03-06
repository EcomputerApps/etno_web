import moment from 'moment';
import React, { useEffect, useState, useMemo, Children, useCallback } from 'react';
import { Calendar, DateLocalizer, momentLocalizer, Navigate } from 'react-big-calendar'
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from 'react-router-dom';
import PharmacyStore from '../../../viewmodels/pharmacy/PharmacyStore';
import { Pharmacy, PharmacyDutyDate } from '../../../models/section/Section';
import { observer } from 'mobx-react-lite';
var array1 = new Array({
    nombre: "faramcia",
    date: ["2023-02-15", "2023-03-16", "2023-04-16"]
})

const pharmacyStore = PharmacyStore.getPharmacyStore()


const PharmacyOnDutyCalendar = () => {
    var events = new Array()
    useEffect(() => {
        pharmacyStore.getRequestPharmacyOnDuty("Bolea")

    }, [])

    const localizer = momentLocalizer(moment)
    const navigate = useNavigate()

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
        <div className='min-w-max' >
            <div className="relative m-auto  w-5/6  ">
                <div className=' absolute right-1    -top-4 rbc-toolbar'>
                    <div className='flex mt-5 justify-end bg-indigo-50  rbc-btn-group'>
                        <button className='top-0 ' onClick={() => { navigate("/home") }}>Volver</button>
                    </div>
                </div>
                <div>
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
export default observer(PharmacyOnDutyCalendar)