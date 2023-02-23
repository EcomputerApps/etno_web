import moment from 'moment';
import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'

import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useNavigate } from 'react-router-dom';
import PharmacyStore from '../../../viewmodels/pharmacy/PharmacyStore';
import { Pharmacy } from '../../../models/section/Section';

const pharmacyStore = PharmacyStore.getPharmacyStore()

const PharmacyOnDutyCalendar = () => {
    useEffect(() => {
        pharmacyStore.getRequestPharmacyOnDuty("Bolea")
    }, [])

    const [contador, setContador] = useState(0)
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth())
    const [firstDay, setFirsDay] = useState(moment().startOf("month").day())
    const [monthNow, setMonthNow] = useState(moment().format("MMMM YYYY "))
    const [monthDayOne, setMonthDayOne] = useState(moment().startOf("month").format("YYYY-MM-DD"))
    const localizer = momentLocalizer(moment)

    function nextMonth() {
        setMonthDayOne(moment().add(contador + 1, "months").startOf("month").format("YYYY-MM-DD"))
        setMonthNow(moment().add(contador + 1, "months").format("MMMM YYYY"))
        setDaysInMonth(moment().add(contador + 1, "months").daysInMonth())
        setFirsDay(moment().add(contador + 1, "months").startOf("month").day())
        setContador(contador + 1)

    } function prevMonth() {
        setContador(contador - 1)
        setMonthDayOne(moment().add(contador - 1, "months").startOf("month").format("YYYY-MM-DD"))
        setMonthNow(moment().add(contador - 1, "months").format("MMMM YYYY"))
        setDaysInMonth(moment().add(contador - 1, "months").daysInMonth())
        setFirsDay(moment().add(contador - 1, "months").startOf("month").day())

    }

    const navigate = useNavigate()
    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: {
                month: true,
                day: true


            },
        }),
        []
    )
  
    var events = new Array()

    pharmacyStore.getPOD.content?.map((item, index) => {
        events.push({
            id: index,
            title: item.name!!,
            start: new Date(item.startDate!!),
            end: new Date(moment(item.endDate!!).format("YYYY-MM-DD")),
            resourceId: index + 1,
            allday: true
        })
    })


    return (
        <div >
            <div className=" m-auto  w-5/6 ">
                <div className='flex mt-5 justify-end bg-indigo-50 p-1'>
                    <button className='btnStandard' onClick={() => { navigate("/home") }}>Volver</button>
                    <button className='btnStandard' onClick={() => {  }}>GO</button>
                </div>
             
                <div>
                    <Calendar
                        localizer={localizer}
className=" bg-indigo-50 p-1"
                        events={events}
                   
                        defaultView="month"
                        style={{ height: "90vh" }}
                        views={views}
                    />
                </div>
            </div>
        </div>

    )
}
export default PharmacyOnDutyCalendar