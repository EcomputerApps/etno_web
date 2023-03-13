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
import { Reserve, Place, Hall, ReserveUser, ReserveSchedule } from "../../../../models/section/Section"
import { toast } from "react-toastify"
import moment from "moment"


const reserveStore = ReserveStore.getReserveStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const CreateReserve = () => {
    

    const [hallMarker, setHallMarker] = useState<number>(0)

    const [reservName, setReservName] = useState<string>("")
    const [reservEmail, setReservEmail] = useState<string>("")
    const [reservDescription, setReservDescription] = useState<string>("")
    const [reservPhone, setReservPhone] = useState<string>("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [reservPlace, setReservPlace] = useState<Place>()
    const [reservHall, setReservHall] = useState<Hall>()
    const [reservDate, setReservDate] = useState<Value>();
    const [reservUser, setReserveUser] = useState<ReserveUser[]>()
    const [isReserved, setIsReserved] = useState(false)
    const [timeSelector, setTimeSelector] = useState(false)

    var reservTime = new Array<ReserveSchedule>()
    function addReserv() {
        const newReserv: Reserve = {
            name: reservName,
            description: reservDescription,
            email: reservEmail,
            phone: reservPhone,
            isPrivate: isPrivate,
            place: reservPlace,
            hall: reservHall?.name,
            date: reservDate?.toString(),
            reserveSchedules: reservTime,
            reserveUsers: reservUser,
            isReserved: isReserved

        }
        checkIfEmpty()
        reservName === "" || reservDescription === "" || reservEmail === "" || reservPhone === "" || reservPhone === "" ||
            reservPlace?.name === "Elige Lugar" || reservHall?.name === "" || reservDate?.toString() === undefined || reservDate?.toString() === "" || reservTime.length === 0 ?

            toast.error('Rellene los campos', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            }) : reserveStore.addRequestReserve('Bolea', newReserv, reservHall?.idHall!!, reservPlace?.idPlace!!);
        sideBarStore.updateSection('Reservas')
        hoverSectionStore.setName('Reservas')


    }
    function checkIfEmpty() {
        reservName === "" ? setEmptyName(true) : setEmptyName(false)
        reservDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
        reservEmail === "" ? setEmptyEmail(true) : setEmptyEmail(false)
        reservPhone === "" ? setEmptyPhone(true) : setEmptyPhone(false)
        reservPlace?.name === "Elige Lugar" ? setEmptyPalce(true) : setEmptyPalce(false)
        reservHall?.name === "" ? setEmptyHall(true) : setEmptyHall(false)
        reservDate === undefined ? setEmptyDate(true) : setEmptyDate(false)
        reservTime.length === 0 ? setEmptyTime(true) : setEmptyTime(false)

    }

    const [emptyName, setEmptyName] = useState(false)
    const [emptyDescription, setEmptyDescription] = useState(false)
    const [emptyEmail, setEmptyEmail] = useState(false)
    const [emptyPhone, setEmptyPhone] = useState(false)
    const [emptyPalce, setEmptyPalce] = useState(false)
    const [emptyHall, setEmptyHall] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)
    const [emptyTime, setEmptyTime] = useState(false)
    //Essential for spanish language in calendar
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
    //Essential for spanish language in calendar
    //Cambiar en  v 2.0
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
    const lugares = new Array<Place>()

    lugares.push({
        idPlace: "",
        username: "",
        name: "Elige Lugar",
        latitude: 0,
        longitude: 0,
        halls: [],
    })

    reserveStore.getPlaceList.places?.map((item, index) => {
        lugares.push(item)
    })

    /*Choose type of event*/
    const privateOrPublic = (reservType: boolean) => {
        if (reservType) {
            return "Privada"
        } else {
            return "Publica"
        }
    }
    /*Add time of reserv to variable*/
    function addOrDelTime(reservTimeArray: ReserveSchedule[], reservTime: string) {
        const index = reservTimeArray.indexOf({ date: reservTime })
        return index
    }

    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-max h-screen overflow-y-auto border-2 rounded-md bg-white    ">
            <div >
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
                    <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                        <div className="flex flex-col p-1 relative">
                            <textarea placeholder=" " rows={3} className={`inputCamp peer ${emptyDescription ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => setReservDescription(e.currentTarget.value
                                )} />
                            <label className={"labelFloatTxtArea"}>Descripción</label>
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
                    {/* Place*/}
                    <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                        <div className="flex flex-col p-1 mt-3 relative">
                            <div className="flex flex-col  rounded-md">
                                <select className="inputCamp peer" defaultValue="" onChange={(e) => {
                                    setHallMarker(Number(e.currentTarget.value))
                                    setReservPlace(lugares[Number(e.currentTarget.value)]!!)
                                }}>
                                    {lugares.map((item, index) => (
                                        <option key={index} className="peer" value={index}>{item.name}</option>
                                    ))}
                                </select>
                                <label className={"labelFloatDate"}>Lugar</label>
                            </div>
                        </div>
                    </div>
                    {/*Hall*/}
                    <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                        <div className="flex flex-col p-1 mt-3 relative">
                            <div className="flex flex-col rounded-md">
                                <select className="inputCamp peer" defaultValue=""
                                    onChange={(e) => {
                                        setReservHall(reservPlace?.halls!![Number(e.currentTarget.value)])
                                    }}
                                >
                                    <option className="peer" value={""} >{
                                        "Elige la sala"
                                    }</option>
                                    {reservPlace?.halls!!.map((item, index) => (
                                        <option key={index} className="peer" value={index} >{item.name}</option>
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
                                    format={"DD-MMMM-YY"}
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
                        {/*HORAS*/}
                        <div className={`lg:w-2/5  w-full flex border-2 rounded-md  flex-col shadow-sm ${emptyTime ? 'border-red-600' : ''}`}>
                            <div className="flex justify-center text-xl font-semibold">Hora</div>
                            <div className="flex flex-col h-64 items-center overflow-y-auto" >
                                {horas.map((item, index) => (
                                    <div key={index} className='flex w-full border-t-2'>
                                        <input type="checkbox" id={index.toString()} className="peer sr-only" value={item.hora}
                                            onClick={(e) => {
                                                e.currentTarget.checked ? reservTime.push({ date: e.currentTarget.value }) : reservTime.splice(addOrDelTime(reservTime, e.currentTarget.value), 1)

                                            }} disabled={reservDate?.toString === undefined || reservDate?.toString() === ""}
                                        />
                                        <label htmlFor={index.toString()} className="peer-checked:bg-indigo-300 hover:bg-indigo-100 w-full flex  m-auto justify-center items-center peer-disabled:bg-gray-300   h-10 text-xl ">{item.hora}</label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className="relative">
                <div className="flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => addReserv()}>Publicar</button>
                    <button name="bandBtnCancel" className="btnStandard" onClick={() => reserveStore.setModalCreate(false)} >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default observer(CreateReserve)