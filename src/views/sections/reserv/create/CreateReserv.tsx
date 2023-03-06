import { observer } from "mobx-react-lite"
import ReserveStore from "../../../../viewmodels/reserv/ReservStore"
import { useEffect, useState } from "react"
import logoEtno from '../../../../assets/logo_etno.png'
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import type { Value } from "react-multi-date-picker"
import { Reserv } from "../../../../models/section/Section"
import { toast } from "react-toastify"

const reserveStore = ReserveStore.getReserveStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
var numero: number = 0
const CreateReserva = () => {
    useEffect(() => {
        reserveStore.getRequestReservs("Bolea")
    }, [])

    const [hallMarker, setHallMarker] = useState<number>(0)

    const [reservName, setReservName] = useState<string>("")
    const [reservEmail, setReservEmail] = useState<string>("")
    const [reservPhone, setReservPhone] = useState<string>("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [reservPlace, setReservPlace] = useState<string>("")
    const [reservHall, setReservHall] = useState<string>("")
    const [reservDate, setReservDate] = useState<Value>();
    const [reservTime, setReservTime] = useState<string[]>([])

    function addReserv() {
        const newReserv: Reserv = {
            name: reservName,
            email: reservEmail,
            phone: reservPhone,
            isPrivate: isPrivate,
            place: reservPlace,
            hall: reservHall,
            date: fillDates(reservDate?.toString()!),//OJO Array
            time: reservTime
        }
        checkIfEmpty()
        reservName === "" || reservEmail === "" || reservPhone === "" ||
            reservPlace === "" || reservDate?.toString() === undefined || reservTime.length === 0 ?

            toast.error('Rellene los campos', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            }) : reserveStore.addRequestReserv('Bolea', newReserv); sideBarStore.updateSection('Reservas'); hoverSectionStore.setName('Reservas')

    }
    function checkIfEmpty() {
        reservName === "" ? setEmptyName(true) : setEmptyName(false)
        reservEmail === "" ? setEmptyEmail(true) : setEmptyEmail(false)
        reservPhone === "" ? setEmptyPhone(true) : setEmptyPhone(false)
        reservDate === undefined ? setEmptyDate(true) : setEmptyDate(false)
        reservTime.length === 0 ? setEmptyTime(true) : setEmptyTime(false)

    }

    const [emptyName, setEmptyName] = useState(false)
    const [emptyEmail, setEmptyEmail] = useState(false)
    const [emptyPhone, setEmptyPhone] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)
    const [emptyTime, setEmptyTime] = useState(false)

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
    function addOrDelTime(reservTimeArray: string[], reservTime: string) {
        const index = reservTimeArray.indexOf(reservTime)
        return index
    }
    function fillDates(slovo: string) {
        var arra = slovo.split(",")
        return arra
    }

    function showMe() {
        console.log(reservName)
        console.log(reservEmail)
        console.log(reservPhone)
        console.log(isPrivate)
        console.log(reservPlace)
        console.log(reservHall)
        console.log(fillDates(reservDate?.toString()!))
        console.log(reservTime)
    }

    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-max h-screen overflow-y-auto border-2 rounded-md bg-white">
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
                            className={`inputCamp peer ${emptyName ? 'border-red-600'
                                : ''
                                }`} onChange={(value) => {
                                    setReservName(value.currentTarget.value)
                                    setEmptyName(false)
                                }} />
                        <label className="labelFloatInput">Nombre</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input placeholder=" "
                            type="text" required={true}
                            className={`inputCamp peer ${emptyEmail ? 'border-red-600'
                                : ''
                                }`} onChange={(value) => {
                                    setReservEmail(value.currentTarget.value)
                                    setEmptyEmail(false)
                                }} />
                        <label className="labelFloatInput">Correo de contacto</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input placeholder=" "
                            type="text" required={true}
                            className={`inputCamp peer ${emptyPhone ? 'border-red-600'
                                : ''
                                }`} onInput={(e) =>
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} maxLength={9} onChange={(value) => {
                                        setReservPhone(value.currentTarget.value)
                                        setEmptyPhone(false)
                                    }} />
                        <label className="labelFloatInput">Telefono de contacto</label>
                    </div>
                </div>
                <div className="flex flex-row px-5 mt-5 relative ">
                    <label className="relative inline-flex items-center mr-5 cursor-pointer w-14">
                        <input type="checkbox" value="" className="sr-only peer" onChange={(e) => {
                            setIsPrivate(e.currentTarget.checked)
                        }} />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600
             peer-checked:bg-indigo-600"></div>
                    </label>
                    <span className="ml-3 text-xl font-medium text-gray-900 dark:text-gray-300">{privateOrPublic(isPrivate)}</span>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                    <div className="flex flex-col p-1 mt-3 relative">
                        <div className="flex flex-col  rounded-md">
                            <select className="inputCamp peer" defaultValue="" onChange={(e) => {
                                setHallMarker(numero + Number(e.currentTarget.value))
                                setReservPlace(lugares[numero + Number(e.currentTarget.value)].lugar)
                                setReservHall(lugares[numero + Number(e.currentTarget.value)].salas[0].sala)
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
                        <div className="flex flex-col rounded-md">
                            <select className="inputCamp peer" defaultValue=""
                                onChange={(e) => {
                                    setReservHall(e.currentTarget.value)
                                }}
                            >
                                {lugares[hallMarker].salas?.map((item, index) => (
                                    <option key={index} className="peer" value={item?.sala} >{item?.sala}</option>
                                ))}
                            </select>
                            <label className={"labelFloatDate"}>Sala</label>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col lg:flex-row pl-5 mt-5  ">
                    <div className="w-1/2 flex">
                        <div className={`border-2  rounded-md ${emptyDate ? 'border-red-600' : ''}`}>
                            <Calendar
                                multiple
                                onChange={setReservDate}
                                weekStartDayIndex={1}
                                locale={greorgian_es}
                                format={"YYYY-MM-DD"}
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
                    </div>
                    <div className={`lg:w-2/5  w-full flex border-2 rounded-md  flex-col shadow-sm ${emptyTime ? 'border-red-600' : ''}`}>
                        <div className="flex justify-center text-xl font-semibold">Hora</div>
                        <div className="flex flex-col h-64 items-center overflow-y-auto">
                            {horas.map((item, index) => (
                                <div key={index} className='flex w-full border-t-2'>
                                    <input type="checkbox" id={index.toString()} className="peer sr-only" value={item.hora}
                                        onClick={(e) => {
                                            e.currentTarget.checked ? reservTime.push(e.currentTarget.value) : reservTime.splice(addOrDelTime(reservTime, e.currentTarget.value), 1)
                                            setEmptyTime(e.currentTarget.checked ? true : false)
                                        }}
                                    />
                                    <label htmlFor={index.toString()} className="peer-checked:bg-indigo-300 hover:bg-indigo-100 w-full flex  m-auto justify-center items-center   h-10 text-xl ">{item.hora}</label>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => showMe()}>Publicar</button>
                    <button name="bandBtnCancel" className="btnStandard" onClick={() => reserveStore.setModalCreate(false)} >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default observer(CreateReserva)