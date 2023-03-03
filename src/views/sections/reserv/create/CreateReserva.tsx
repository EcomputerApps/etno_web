import { observer } from "mobx-react-lite"
import ReserveStore from "../../../../viewmodels/reserv/ReservStore"
import { useState } from "react"
import logoEtno from '../../../../assets/logo_etno.png'
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"

import type { Value } from "react-multi-date-picker"
const reserveStore = ReserveStore.getReserveStore()
var numero: number = 0
var time = new Date()
const CreateReserva = () => {
    const [reservType, setReservType] = useState(false)
    const [lugar, setLugar] = useState<number>(0)
    const [value, setValue] = useState<Value>(new Date());
    const greorgian_es = {
        name: "greorgian_es",
        months: [
            ["Enero", "ene"],
            ["Febrero", "feb"],
            ["Marzo", "mar"],
            ["Abril", "abr"],
            ["Mayo", "may"],
            ["Junio", "jun"],
            ["Julio", "jul"],
            ["Agosto", "ago"],
            ["Septiembre", "sep"],
            ["Octubre", "oct"],
            ["Noviembre", "nov"],
            ["Deciembre", "dec"],
        ],
        weekDays: [
            ["Sabado", "Sá"],
            ["Domingo", "Do"],
            ["Lunes", "Lu"],
            ["Martes", "Ma"],
            ["Miercoles", "Mi"],
            ["Jueves", "Ju"],
            ["Viernes", "Vi"],
        ],
        digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        meridiems: [
            ["AM", "am"],
            ["PM", "pm"],
        ],
    }
    const horas = [
        { hora: "9:00-10:00" },
        { hora: "10:00-11:00" },
        { hora: "11:00-12:00" },
        { hora: "12:00-13:00" },
        { hora: "13:00-14:00" },
        { hora: "17:00-18:00" },
        { hora: "18:00-19:00" },
        { hora: "19:00-20:00" },
        { hora: "20:00-21:00" },
        { hora: "21:00-22:00" },

    ]
    const lugares = [
        {
            lugar: "Padel",
            salas: [{ sala: "Sala uno" }, { sala: "Sala dos" }, { sala: "Sala tres" }],
            horario: [{ mañana: [new Date(), new Date()], tarde: [new Date(), new Date()], franja: 60 }]
        },
        {
            lugar: "Sala de futbol",
            salas: [{ sala: "Campo grande" }, { sala: "Campo peqeño" }],
            horario: [{ mañana: [new Date(), new Date()], tarde: [new Date(), new Date()], franja: 60 }]
        },
        {
            lugar: "Jacuzzi",
            salas: [{ sala: "Cabina 1" }, { sala: "Cabina 2" }, { sala: "Cabina 3" }],
            horario: [{ mañana: [new Date(), new Date()], tarde: [new Date(), new Date()], franja: 60 }]
        },
        {
            lugar: "Restaurante",
            salas: [],
            horario: [{ mañana: [new Date(), new Date()], tarde: [new Date(), new Date()], franja: 60 }]
        },
    ]
    const privateOrPublic = (reservType: boolean) => {
        if (reservType) {
            return "Privada"
        } else {
            return "Publica"
        }
    }


    return (
        <div className="flex flex-col md:m-auto md:w-1/2 w-max h-screen overflow-y-auto border-2 rounded-md bg-white">
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white text-3xl p-3'>CREAR RESERVA</p>
                    </div>
                </div>

                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input autoFocus placeholder=" "
                            type="text" required={true}
                            className="inputCamp peer" />
                        <label className="labelFloatInput">Nombre</label>
                    </div>
                </div>
                <div>

                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input placeholder=" "
                            type="text" required={true}
                            className="inputCamp peer" />
                        <label className="labelFloatInput">Correo de contacto</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input placeholder=" "
                            type="text" required={true}
                            className="inputCamp peer" onInput={(e) =>
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} maxLength={9} />
                        <label className="labelFloatInput">Telefono de contacto</label>
                    </div>
                </div>

                <div className="flex flex-row px-5   mt-5 relative ">
                    <label className="relative inline-flex items-center mr-5 cursor-pointer w-14">
                        <input type="checkbox" value="" className="sr-only peer" onChange={(e) => {
                            setReservType(e.currentTarget.checked)
                        }} />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600
             peer-checked:bg-indigo-600"></div>
                    </label>
                    <span className="ml-3 text-xl font-medium text-gray-900 dark:text-gray-300">{privateOrPublic(reservType)}</span>
                </div>

                <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                    <div className="flex flex-col p-1 mt-3 relative">
                        <div className="flex flex-col  rounded-md">

                            <select className="inputCamp peer" defaultValue="" onChange={(e) => {
                                setLugar(numero + Number(e.currentTarget.value))
                            }}>
                                {lugares.map((item, index) => (
                                    <option key={index} className="peer" value={index}>{item.lugar}</option>

                                ))}
                            </select>
                            <label className={"labelFloatDate"}>Lugar</label>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                    <div className="flex flex-col p-1 mt-3 relative">
                        <div className="flex flex-col    rounded-md">
                            <select className="inputCamp peer" defaultValue=""
                            >
                                {lugares[lugar].salas?.map((item, index) => (
                                    <option key={index} className="peer" >{item?.sala}</option>
                                ))}

                            </select>
                            <label className={"labelFloatDate"}>Sala</label>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col md:flex-row pl-5 mt-5 ">
                    <div className="w-1/2 flex">
                        <Calendar
                            multiple
                            onChange={setValue}
                            weekStartDayIndex={1}
                            locale={greorgian_es}
                            format={"DD -MMMM"}
                            plugins={[
                                <DatePanel sort="date" header="Fechas elegidas" />, weekends([0, 6]),
                                <Toolbar
                                    position="bottom"

                                    names={{
                                        today: "Hoy",
                                        deselect: "Anular seleccion",
                                        close: ""
                                    }} />]}
                        />
                    </div>
                    <div className=" md:w-2/5  w-full flex border-2 rounded-md  flex-col shadow-sm">
                        <div className="flex justify-center text-xl font-semibold">Hora</div>
                        <div className="flex flex-col h-64 items-center overflow-y-auto">
                            {horas.map((item, index) => (
                                <div key={index} className='flex w-full border-t-2'>
                                    <input type="checkbox" id={index.toString()} className="peer sr-only" value={item.hora} />
                                    <label htmlFor={index.toString()} className="peer-checked:bg-indigo-300 hover:bg-indigo-100 w-full flex  m-auto justify-center items-center   h-10 text-xl ">{item.hora}</label>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => console.log(value)}>Publicar</button>
                    <button name="bandBtnCancel" className="btnStandard" onClick={() => reserveStore.setModalCreate(false)} >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default observer(CreateReserva)