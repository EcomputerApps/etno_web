import logoEtno from '../../../../assets/logo_etno.png'
import { useState, useRef, useEffect } from 'react';
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { toast } from 'react-toastify';
import GoogleMapReact from 'google-map-react';
import markerIcon from "../../../../assets/marker.svg"
import PharmacyStore from '../../../../viewmodels/pharmacy/PharmacyStore';
import { Pharmacy, PharmacyDutyDate } from '../../../../models/section/Section';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import DatePicker, { Value } from 'react-multi-date-picker';
import { resizeFile } from '../../../../utils/global';

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const pharmacyStore = PharmacyStore.getPharmacyStore()

interface Marker {
    lat: number,
    lng: number,
    text: string
}

const EditPharmacy = () => {

    useEffect(() => {
        pharmacyStore.getRequestPharmacyOnDuty(localStorage.getItem('user_etno_locality')!)
    }, [])

    function checkIfExist(name: string) {
        var flag: boolean = false
        if (name !== pharmacyNameTemp) {
            pharmacyStore.getPOD.content?.map((item) => {
                if (item.name === name) {
                    flag = true
                }
            })
        }
        return flag
    }


    const datePickerRef = useRef<any>();
    const [datePanel, setDatePanel] = useState(true)
    const [dateGuardia, setDateGuardia] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const defaultProps = {
        center: {
            lat: 42.13775899999999,
            lng: -0.40838200000000713
        },
        zoom: 11
    };

    const inputTitle = useRef<HTMLInputElement>(null)
    const inputPeriod = useRef<HTMLInputElement>(null)
    const inputWebUrl = useRef<HTMLInputElement>(null)
    const inputTel = useRef<HTMLInputElement>(null)
    const inputScheSelect = useRef<HTMLSelectElement>(null)
    const inputScheMornOne = useRef<HTMLInputElement>(null)
    const inputScheMornTwo = useRef<HTMLInputElement>(null)
    const inputScheEvenOne = useRef<HTMLInputElement>(null)
    const inputScheEvenTwo = useRef<HTMLInputElement>(null)
    const inputScheExtra = useRef<HTMLInputElement>(null)
    const inputLong = useRef<HTMLInputElement>(null)
    const inputLat = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [pharmacy] = useState<Pharmacy>(pharmacyStore.getPharmacy)
    if (pharmacy.startDate === null) {
        pharmacy.startDate = new Date()
    }
    const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;
    const [lat, setLat] = useState(Number(pharmacy.latitude!!))
    const [long, setLong] = useState(Number(pharmacy.longitude!!))
    const [emptyName, setEmptyName] = useState<boolean>(false)
    const [emptyWebUrl, setEmptyWebUrl] = useState<boolean>(false)
    const [emptyTel, setEmptyTel] = useState<boolean>(false)
    const [emptyScheMorningOne, setEmptyScheMorningOne] = useState<boolean>(false)
    const [emptyScheEveningOne, setEmptyScheEveningOne] = useState<boolean>(false)
    const [emptyScheMorningTwo, setEmptyScheMorningTwo] = useState<boolean>(false)
    const [emptyScheEveningTwo, setEmptyScheEveningTwo] = useState<boolean>(false)
    const [emptyDescption, setEmptyDescription] = useState<boolean>(false)
    const [emptyLongLat, setEmptyLongLat] = useState<boolean>(false)
    const [pharmType, setPharmType] = useState<string>(pharmacy.type!!)
    const [pharmacyShcedulSelector, setPharmacyShcedulSelector] = useState<string>(timeCutter(pharmacy.schedule!!).length === 6 ? timeCutter(pharmacy.schedule!!)!![0] + "-" + timeCutter(pharmacy.schedule!!)!![1] : "Otro")
    const [pharmacyName, setPharmacyName] = useState<string>(pharmacy.name!!)
    const [pharmacyNameTemp] = useState<string>(pharmacy.name!!)
    const [pharmacyWebUrl, setPharmacyWebUrl] = useState<string>(pharmacy.link!!)
    const [pharmacyTel, setPharmacyTel] = useState<string>(pharmacy.phone!!)
    const [pharmacyShcedulMorningOne, setPharmacyShcedulMorningOne] = useState<string>(timeCutter(pharmacy.schedule!!)!![2])
    const [pharmacyShcedulMorningTwo, setPharmacyShcedulMorningTwo] = useState<string>(timeCutter(pharmacy.schedule!!)!![3])
    const [pharmacyShcedulEvenOne, setPharmacyShcedulEvenOne] = useState<string>(timeCutter(pharmacy.schedule!!)!![4])
    const [pharmacyShcedulEvenTwo, setPharmacyShcedulEvenTwo] = useState<string>(timeCutter(pharmacy.schedule!!)!![5])
    const [pharmacyShcedulExtra, setPharmacyShcedulExtra] = useState<string>("")
    const [pharmacyDirection, setPharmacyDirection] = useState<string>(pharmacy.direction!!)
    const [pharmacySchedule, setPharmacySchedule] = useState<string>(pharmacy.schedule!!)
    const [pharmPeriod, setPharmPeriod] = useState<number>(pharmacy.durationDays!!)
    const [pharmFrequency, setPharmFrequency] = useState<number>(pharmacy.frequencyInDays!!)
    const [file, setFile] = useState<File>()
    const [dutyDates, setDutyDates] = useState<Value>(dateCutter(pharmacy.dates!!))
    const [shouldCloseCalendar, setShouldCloseCalendar] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    function timeCutter(time: string) {
        var arrayAux = new Array<string>()
        var timeListAux = new Array<string>()
        var timeList = new Array<string>()
        arrayAux = time.split(" ")
        arrayAux.map((item, index) => {
            timeListAux = item.split("-")
            timeListAux.map((item, index) => {
                timeList.push(item)
            })
        })
        if (timeList.length === 6) {
            return timeList
        } else {
            return time
        }
    }

    function dateCutter(date: PharmacyDutyDate[]) {
        var arrayAux = new Array<PharmacyDutyDate>()
        var arrayTrue = new Array<Date>()
        arrayAux = date.sort((a, b) => Number(a.date) - Number(b.date))
        arrayAux.map((item, index) => {
            arrayTrue.push(item.date!!)
        })
        if (!chekGuardiaType(pharmacy.frequencyInDays!!)) {
            return arrayTrue[0]
        } else {
            return arrayTrue
        }
    }

    function handleScheduleInput() {
        if (pharmacyShcedulSelector === "Otro") {
            if (pharmacyShcedulExtra !== "") {
                setPharmacySchedule(pharmacyShcedulExtra)
            }
        } else {

            if (pharmacyShcedulMorningOne !== "" && pharmacyShcedulMorningTwo !== "" && pharmacyShcedulEvenOne !== "" && pharmacyShcedulEvenTwo !== "") {

                setPharmacySchedule(pharmacyShcedulSelector + " " + pharmacyShcedulMorningOne + "-" + pharmacyShcedulMorningTwo +
                    " " + pharmacyShcedulEvenOne + "-" + pharmacyShcedulEvenTwo)
            }
        }
    }

    function chekIfEmpty() {
        pharmacyName === "" ? setEmptyName(true) : setEmptyName(false)
        pharmacyWebUrl === "" ? setEmptyWebUrl(true) : setEmptyWebUrl(false)
        pharmacyTel === "" ? setEmptyTel(true) : setEmptyTel(false)
        pharmacyDirection === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    }

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

    function fillDates(dates: string): Date[] {
        var arrayDate = new Array<Date>()
        if (dates !== undefined) {
            var arrayAux = dates.split(",")
            if (arrayAux.length === 1) {
                if (Number(dates)) {
                    arrayDate.push(new Date(Number(dates)))
                } else {
                    arrayDate.push(new Date(dates))
                }
            } else {
                if (Number(arrayAux[0])) {
                    arrayAux.map((item) => {
                        arrayDate.push(new Date(Number(item)))
                    })
                } else {
                    arrayAux.map((item) => {
                        arrayDate.push(new Date(item))
                    })
                }
            }
        }
        return arrayDate
    }

    function fillPharmacyDates(datos: Date[]) {
        var arrayDeFechas = new Array()
        datos.map((item, index) => {
            arrayDeFechas.push({
                username: localStorage.getItem('user_etno_locality')!,
                namePharmacy: pharmacyName,
                date: item
            })
        })
        return arrayDeFechas
    }

    function chekGuardiaType(frequencia: number) {
        if (frequencia === 0) {
            //Custom days
            return true
        } else {
            //Chain of days
            return false
        }
    }

   async function updatePharmacy(pharmaciId: string) {
        if (fillDates(dutyDates?.toString()!!).length !== 1) {
            setPharmPeriod(0)
            setPharmFrequency(0)
        }
            chekIfEmpty()
            if (pharmType === "" || pharmacyName === "" || pharmacyWebUrl === "" ||
                pharmacyTel === "" || pharmacySchedule === "" || pharmacyDirection === "" ||
                (pharmacyShcedulMorningOne === "" || pharmacyShcedulEvenOne === "" || pharmacyShcedulMorningTwo === "" || pharmacyShcedulEvenTwo === "") && pharmacyShcedulExtra === ""
            ) {
                toast.info('Rellene los campos', {
                    position: 'top-center',
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
            } else {
                const pharmacy_: Pharmacy = {
                    type: pharmType,
                    name: pharmacyName,
                    link: pharmacyWebUrl,
                    phone: pharmacyTel,
                    schedule: pharmacySchedule,
                    direction: pharmacyDirection,
                    longitude: String(long),
                    latitude: String(lat),
                    startDate: fillDates(dutyDates?.toString()!!)[0],
                    durationDays: pharmPeriod,
                    frequencyInDays: pharmFrequency,
                    dates: fillPharmacyDates(fillDates(dutyDates?.toString()!!))

                }
                if (pharmType === "Normal") {
                    pharmacy_.startDate = undefined
                    pharmacy_.dates = undefined
                    pharmacy_.durationDays = 0
                    pharmacy_.frequencyInDays = 0
                }
                //const imageFile = await resizeFile(file!!);
                pharmacyStore.editPharmacy(localStorage.getItem('user_etno_locality')!, pharmaciId, pharmacy_)
                sideBarStore.updateSection('Farmacias')
                hoverSectionStore.setName('Farmacias')
        }
    }

    function chekDatesCount() {
        if (fillDates(dutyDates?.toString()!!).length !== 1 || dutyDates?.toString() === "") {
            setPharmPeriod(0)
            setPharmFrequency(0)
        }
        datePickerRef.current.closeCalendar()
    }

    const selectorOptions = [
        { value: 'Lunes-Viernes', label: 'De lunes a viernes.' },
        { value: 'Lunes-Sabado', label: 'De lunes a sabado.' },
        { value: 'Lunes-Domingo', label: 'Todos los dias.' },
        { value: 'Otro', label: 'Otro horrario' }
    ]

    return (
        <div className="flex flex-col lg:m-auto  lg:w-1/2  w-11/12  h-screen overflow-y-auto border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => pharmacyStore.setModalEdit(false)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl  p-3 uppercase'>Editar FARMACIA</p>
                </div>
            </div>
            <div className="w-full flex flex-1 md:flex-row flex-col pl-3 mt-8 ">
                <div className="flex flex-col p-1 relative  md:w-1/3 w-full md:pb-0 pb-5">
                    <div className="flex p-1 border-2 border-transparent rounded-md">
                        <div className='flex w-1/2 p1'>
                            <input checked={pharmType === "Normal"} type="radio" id="radioOne" value="Normal" className="sr-only peer " name="pharmTypeRadio" onChange={(e) => {
                                setPharmType(e.currentTarget.value)
                                setDatePanel(true)
                            }} />
                            <label htmlFor="radioOne" className="w-full text-center select-none uppercase cursor-pointer p-2 mr-5 font-medium text-sm rounded-md peer-checked:bg-indigo-800 border 
                        border-gray-300 
                        peer-checked:hover:bg-indigo-700 
                        peer-checked:text-white 
                        ring-indigo-500 peer-checked:ring-2 ">NORMAL</label>
                            <label className="labelFloatDate" hidden={!datePanel}>Tipo</label>
                        </div>
                        <div className='flex  w-1/2' >
                            <input checked={pharmType === "Guardia"} type="radio" id="radioTwo" className="sr-only peer " value="Guardia" name="pharmTypeRadio" onChange={(e) => {
                                setPharmType(e.currentTarget.value)
                                setDatePanel(false)
                            }} />
                            <label htmlFor="radioTwo" className="w-full min-w-fit text-center select-none uppercase cursor-pointer text-sm font-medium rounded-md p-2 mr-5
                        peer-checked:bg-indigo-800 border 
                        border-gray-300 
                        peer-checked:hover:bg-indigo-700 
                        peer-checked:text-white 
                        ring-indigo-500 peer-checked:ring-2 ">DE GUARDIA</label>
                            <label className="labelFloatDate" hidden={datePanel}>Tipo</label>
                        </div>
                    </div>
                </div>
                <div className='flex lg:flex-row flex-col'>
                    <div className="flex pt-2  p-1  relative  ">
                        <div className=' peer'>
                            <DatePicker
                                locale={greorgian_es}
                                disabled={pharmType === "Normal"}
                                value={dutyDates}
                                onChange={setDutyDates}
                                weekStartDayIndex={1}
                                ref={datePickerRef}
                                onOpen={() => setShouldCloseCalendar(false)}
                                onClose={() => shouldCloseCalendar}
                                style={{
                                    height: "40px",
                                    borderRadius: "6px",
                                    borderBlockEndWidth: "2px",
                                    borderBlockStartWidth: "2px",
                                    borderBlockWidth: "2px",
                                    borderBlockColor: "#E0E0E0",
                                    fontSize: "14px",
                                    padding: "3px 10px"
                                }}
                                multiple>
                                <button
                                    style={{ margin: "5px", background: "#303F9F", textDecorationColor: "white", borderRadius: "6px", height: "30px", paddingRight: "3px", paddingLeft: "3px", cursor: "pointer" }}
                                    onClick={() => setDutyDates(new Date())}
                                >
                                    <label className='text-white cursor-pointer'>Hoy</label>
                                </button>
                                <button
                                    style={{ margin: "5px", background: "#303F9F", textDecorationColor: "white", borderRadius: "6px", height: "30px", paddingRight: "3px", paddingLeft: "3px", cursor: "pointer" }}
                                    onClick={() => chekDatesCount()} onFocus={() => setShouldCloseCalendar(true)}
                                >
                                    <label className='text-white cursor-pointer'>Cerrar</label>
                                </button>
                            </DatePicker>
                        </div>
                        <label className={"labelFloatDate"}>Dias de Guardia</label>
                    </div>
                    <div className='flex flex-row lg:mt-0 mt-3'>
                        <div className="flex pt-2  p-1  relative ">
                            <input value={pharmFrequency} type="number" ref={inputPeriod} min={0} className="inputCamp peer h-10 w-20 px-2  disabled:bg-gray-200 disabled:border-gray-300"
                                disabled={fillDates(dutyDates?.toString()!!).length !== 1 || dutyDates?.toString() === "" || pharmType === "Normal"}
                                onChange={(e) => {
                                    setPharmFrequency(e.currentTarget.valueAsNumber)
                                }}
                                onKeyUp={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputTitle.current != null) {
                                            inputTitle.current.focus()
                                        }
                                    }
                                }} />
                            <label className={"labelFloatDate"}>Frecuencia</label>
                        </div>
                        <div className="flex pt-2  p-1  relative ">
                            <input value={pharmPeriod} type="number" ref={inputPeriod} min={0} className="inputCamp peer h-10 w-20 px-2  disabled:bg-gray-200 disabled:border-gray-300"
                                disabled={fillDates(dutyDates?.toString()!!).length !== 1 || dutyDates?.toString() === "" || pharmType === "Normal"}
                                onChange={(e) => {
                                    setPharmPeriod(e.currentTarget.valueAsNumber)
                                }}
                                onKeyUp={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputTitle.current != null) {
                                            inputTitle.current.focus()
                                        }
                                    }
                                }} />
                            <label className={"labelFloatDate"}>Repeticiones</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-5 pl-3">
                <div className="flex flex-col p-1 relative">
                    <input defaultValue={pharmacy.name} autoFocus ref={inputTitle} placeholder=" " name="pharmacyName" type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
                        : ''
                        }`} onChange={(e) => {
                            setPharmacyName(e.currentTarget.value)
                            setEmptyName(false)
                        }} onKeyUp={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (inputWebUrl.current != null) {
                                    inputWebUrl.current.focus()
                                }
                            }
                        }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                    <label className={"labelFloatInput"}>Nombre</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 mt-3">
                <div className="flex flex-col p-1 relative  ">
                    <input defaultValue={pharmacyWebUrl} ref={inputWebUrl} placeholder=" " name="pharmacyUrl" className={`inputCamp peer ${emptyWebUrl ? 'border-red-600'
                        : ''
                        }`} onChange={(e) => {
                            setPharmacyWebUrl(e.currentTarget.value)
                            setEmptyWebUrl(false)
                        }} onKeyUp={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (inputTel.current != null) {
                                    inputTel.current.focus()
                                }
                            }
                        }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                    <label className={"labelFloatInput"}>Pagina Web</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 ">
                <div className="text-left p-1">
                    <div className={"photoBoard"}>
                        <div className='pl-3'>
                            Foto {file?.name}
                        </div>
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                setFile(e.currentTarget.files!![0])
                            }} />
                            <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                                <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                                    <img src={add_Photo} alt="photo" />
                                    <p>Pulse en la zona para añadir una imagen</p>
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
                    <input defaultValue={pharmacyTel} ref={inputTel} placeholder=" " name="pharmacyTel" type="text" onInput={(e) =>
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} maxLength={9} minLength={9} className={`inputCamp peer w-1/4 ${emptyTel ? 'border-red-600'
                            : ''
                            }`} onKeyUp={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputScheSelect.current != null) {
                                        inputScheSelect.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyTel(e.currentTarget.value)
                                setEmptyTel(false)
                            }} />
                    <label className={"labelFloatInput"}>Teléfono</label>
                </div>
            </div>
            {/*Horario-----------------------------------------------------------------------*/}
            <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                <div className="flex flex-col p-1 mt-1 relative">
                    <div className="flex flex-col border-2 rounded-md">
                        <select ref={inputScheSelect} className="inputCamp p-0" defaultValue={pharmacyShcedulSelector} onChange={(e) => {
                            setPharmacyShcedulSelector(e.target.value)
                        }} onKeyDown={(e) => {
                            if ((e.code === "NumpadEnter")) {
                                if (inputScheMornOne.current != null) {
                                    inputScheMornOne.current.focus()
                                } if (inputScheExtra.current != null) {
                                    inputScheExtra.current.focus()
                                }
                            }
                        }}>
                            {selectorOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <label className={"labelFloatDate"}>Horario</label>
                        <div className="p-3 flex flex-row" >
                            <div hidden={pharmacyShcedulSelector === "Otro"} className="w-full">
                                <div className="relative p-2 flex lg:flex-row flex-col">
                                    <input defaultValue={timeCutter(pharmacy.schedule!!)!![2]} ref={inputScheMornOne} placeholder=" " name="pharmacyShedulesMorning" type="time"
                                        className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheMorningOne ? 'border-red-600'
                                            : ''
                                            }`}
                                        onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (inputScheMornTwo.current != null) {
                                                    inputScheMornTwo.current.focus()
                                                }
                                            }
                                        }} onChange={(e) => {
                                            setPharmacyShcedulMorningOne(e.target.value)
                                            setEmptyScheMorningOne(false)
                                        }} />
                                    <input defaultValue={timeCutter(pharmacy.schedule!!)!![3]} ref={inputScheMornTwo} placeholder=" " name="pharmacyShedulesMorning" type="time"
                                        className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheMorningTwo ? 'border-red-600'
                                            : ''
                                            }`}
                                        onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (inputScheEvenOne.current != null) {
                                                    inputScheEvenOne.current.focus()
                                                }
                                            }
                                        }} onChange={(e) => {
                                            setPharmacyShcedulMorningTwo(e.target.value)
                                            setEmptyScheMorningTwo(false)
                                        }} />
                                    <label className={"labelFloatInput"}>Mañana</label>
                                </div>
                            </div>
                            <div hidden={pharmacyShcedulSelector === "Otro"} className="w-full">
                                <div hidden={pharmacyShcedulSelector === "Otro"} className="w-full">
                                    <div className="relative p-2 flex lg:flex-row flex-col">
                                        <input defaultValue={timeCutter(pharmacy.schedule!!)!![4]} ref={inputScheEvenOne} placeholder=" " name="pharmacyShedulesEvening" type="time"
                                            className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheEveningOne ? 'border-red-600'
                                                : ''
                                                }`} onKeyDown={(e) => {
                                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                        if (inputScheEvenTwo.current != null) {
                                                            inputScheEvenTwo.current.focus()
                                                        }
                                                    }
                                                }} onChange={(e) => {
                                                    setPharmacyShcedulEvenOne(e.target.value)
                                                    setEmptyScheEveningOne(false)
                                                }} />
                                        <input defaultValue={timeCutter(pharmacy.schedule!!)!![5]} ref={inputScheEvenTwo} placeholder=" " name="pharmacyShedulesEvening" type="time"
                                            className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheEveningTwo ? 'border-red-600'
                                                : ''
                                                }`} onKeyUp={(e) => {
                                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                        if (txtAreaRef.current != null) {
                                                            txtAreaRef.current.focus()
                                                        }
                                                    }
                                                }} onChange={(e) => {
                                                    setPharmacyShcedulEvenTwo(e.target.value)
                                                    setEmptyScheEveningTwo(false)
                                                }} />
                                        <label className={"labelFloatInput"}>Tarde</label>
                                    </div>
                                </div>
                            </div>
                            <div hidden={pharmacyShcedulSelector !== "Otro"} className="  w-full">
                                <div className="relative p-2 ">
                                    <input ref={inputScheExtra} defaultValue={timeCutter(pharmacy.schedule!!)} placeholder=" " name="pharmacyShedulesExtra" type="text" className="w-full p-1 mr-2 inputCamp peer" onKeyDown={(e) => {
                                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                            if (txtAreaRef.current != null) {
                                                txtAreaRef.current.focus()
                                            }
                                        }
                                    }} onBlur={(e) => {
                                        setPharmacyShcedulExtra(e.target.value)
                                    }} />
                                    <label className={"labelFloatInput"}>Otro</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
                    <textarea defaultValue={pharmacyDirection} ref={txtAreaRef} placeholder=" " name="pharmacyDescription" maxLength={495} rows={3}
                        className={`inputCamp peer ${emptyDescption ? 'border-red-600'
                            : ''
                            }`} onKeyDown={(e) => {
                                if ((e.code === "NumpadEnter")) {
                                    if (inputLong.current != null) {
                                        inputLong.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyDirection(e.target.value)
                                setEmptyDescription(false)
                            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                    <label className={"labelFloatTxtArea"}>Descripción</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className={`border-2 rounded-md m-1 ${emptyLongLat ? 'border-red-600'
                    : ''
                    }`}>
                    <div style={{ height: '50vh', width: '100%', padding: "2px" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyByVAayqkxKFNRi1QiNqua1jRCREORO7S0" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            onClick={(e) => {
                                setLat(e.lat)
                                setLong(e.lng)
                            }}
                        >
                            <AnyReactComponent
                                lat={lat}
                                lng={long}
                                text={markerIcon}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">

                    <input value={long} ref={inputLong} placeholder=" " type="text" name="pharmacyLong" disabled className="inputCamp peer" onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputLat.current != null) {
                                inputLat.current.focus()
                            }
                        }
                    }} />
                    <label className={"labelFloatInput"}>Longitud</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">

                    <input value={lat} ref={inputLat} placeholder=" " type="text" name="pharmacyLat" disabled className="inputCamp peer" onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (btnRef.current != null) {
                                btnRef.current.focus()
                            }
                        }
                    }} />
                    <label className={"labelFloatInput"}>Latitude</label>
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
                <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onFocus={() => handleScheduleInput()} onClick={() => updatePharmacy(pharmacy.idPharmacy!!)}>Publicar</button>
                <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
            </div>
        </div>
    )
}
export default EditPharmacy


