import logoEtno from '../../../../assets/logo_etno.png'
import { useState, useRef, useEffect } from 'react';
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Pharmacy } from '../../../../models/section/Section';
import PharmacyStore from '../../../../viewmodels/pharmacy/PharmacyStore';
import { toast } from 'react-toastify';
import GoogleMapReact from 'google-map-react';
import markerIcon from "../../../../assets/marker.svg"
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import DatePicker, { Value } from 'react-multi-date-picker';
import { observer } from 'mobx-react-lite';
import { resizeFile } from '../../../../utils/global';
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

interface Marker {
    lat: number,
    lng: number,
    text: string
}

const pharmacyStore = PharmacyStore.getPharmacyStore()


const CreatePharmacy = () => {

    useEffect(() => {
        pharmacyStore.getRequestPharmacyOnDuty(localStorage.getItem('user_etno_locality')!)
    }, [])

    function checkIfExist(name: string) {
        var flag: boolean = false
        pharmacyStore.getPOD.content?.map((item) => {
            if (item.name === name) {
                flag = true
            }
        })
        return flag
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

    function chekIfEmpty() {
        pharmType === "" ? setEmptyType(true) : setEmptyType(false)
        pharmacyName === "" ? setEmptyName(true) : setEmptyName(false)
        pharmacyWebUrl === "" ? setEmptyWebUrl(true) : setEmptyWebUrl(false)
        pharmacyTel === "" ? setEmptyTel(true) : setEmptyTel(false)
        pharmacyDirection === "" ? setEmptyDescription(true) : setEmptyDescription(false)
        pharmacyShcedulMorningOne === "" ? setEmptyScheMorningOne(true) : setEmptyScheMorningOne(false)
        pharmacyShcedulEvenOne === "" ? setEmptyScheEveningOne(true) : setEmptyScheEveningOne(false)
        pharmacyShcedulMorningTwo === "" ? setEmptyScheMorningTwo(true) : setEmptyScheMorningTwo(false)
        pharmacyShcedulEvenTwo === "" ? setEmptyScheEveningTwo(true) : setEmptyScheEveningTwo(false)
        long === 0 || lat === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)
    }


    //const [file, setFile] = useState<File>()
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
    const txtAreaRef = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [emptyType, setEmptyType] = useState<boolean>(false)
    const [emptyName, setEmptyName] = useState<boolean>(false)
    const [emptyFile, setEmptyFile] = useState<boolean>(false)
    const [emptyWebUrl, setEmptyWebUrl] = useState<boolean>(false)
    const [emptyTel, setEmptyTel] = useState<boolean>(false)
    const [emptyDescption, setEmptyDescription] = useState<boolean>(false)
    const [emptyScheMorningOne, setEmptyScheMorningOne] = useState<boolean>(false)
    const [emptyScheEveningOne, setEmptyScheEveningOne] = useState<boolean>(false)
    const [emptyScheMorningTwo, setEmptyScheMorningTwo] = useState<boolean>(false)
    const [emptyScheEveningTwo, setEmptyScheEveningTwo] = useState<boolean>(false)
    const [emptyLongLat, setEmptyLongLat] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;
    const [pharmType, setPharmType] = useState<string>("")
    const [pharmacyShcedulSelector, setPharmacyShcedulSelector] = useState<string>("Lunes-Viernes")
    const [pharmacyName, setPharmacyName] = useState<string>("")
    const [pharmacyWebUrl, setPharmacyWebUrl] = useState<string>("")
    const [pharmacyTel, setPharmacyTel] = useState<string>("")
    const [pharmacyShcedulMorningOne, setPharmacyShcedulMorningOne] = useState<string>("")
    const [pharmacyShcedulEvenOne, setPharmacyShcedulEvenOne] = useState<string>("")
    const [pharmacyShcedulMorningTwo, setPharmacyShcedulMorningTwo] = useState<string>("")
    const [pharmacyShcedulEvenTwo, setPharmacyShcedulEvenTwo] = useState<string>("")
    const [pharmacyShcedulExtra, setPharmacyShcedulExtra] = useState<string>("")
    const [pharmacyDirection, setPharmacyDirection] = useState<string>("")
    const [pharmacySchedule, setPharmacySchedule] = useState<string>("")
    const [dutyDates, setDutyDates] = useState<Value>()
    const [pharmPeriod, setPharmPeriod] = useState<number>(0)
    const [pharmFrequency, setPharmFrequency] = useState<number>(0)

    const [file, setFile] = useState<File | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

    function handleScheduleInput() {
        if (pharmacyShcedulSelector === "Otro") {
            setPharmacySchedule(pharmacyShcedulExtra)
        } else {
            setPharmacySchedule(pharmacyShcedulSelector + " " + pharmacyShcedulMorningOne + "-" + pharmacyShcedulMorningTwo +
                " " + pharmacyShcedulEvenOne + "-" + pharmacyShcedulEvenTwo)
        }
    }

    function fillDates(dates: string): Date[] {
        var arrayDate = new Array()
        if (dates !== undefined) {
            var arrayAux = dates.split(",")
            arrayAux.map((item) => {
                arrayDate.push(new Date(item))
            })
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

    async function addPharmacy() {
        if (fillDates(dutyDates?.toString()!!).length != 1) {
            setPharmPeriod(0)
            setPharmFrequency(0)
        }
        const pharmacy: Pharmacy = {
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

        chekIfEmpty()
        if (pharmType === "" || pharmacyName === "" || pharmacyWebUrl === "" ||
            pharmacyTel === "" || pharmacySchedule === "" || pharmacyDirection === "" ||
            (pharmacyShcedulMorningOne === "" || pharmacyShcedulEvenOne === "" || pharmacyShcedulMorningTwo === "" || pharmacyShcedulEvenTwo === "") && pharmacyShcedulExtra === "" ||
            long === 0 || lat === 0) {
            toast.error('Rellene los campos', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            if (pharmType === "Normal") {
                pharmacy.startDate = undefined
                pharmacy.dates = undefined
                pharmacy.durationDays = 0
                pharmacy.frequencyInDays = 0
            }
            pharmacyStore.addRequestPharmacy(localStorage.getItem('user_etno_locality')!, pharmacy, file!!); sideBarStore.updateSection('Farmacias'); hoverSectionStore.setName('Farmacias')
        }
    }

    const datePickerRef = useRef<any>();
    const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false)

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
        <div className="flex flex-col lg:m-auto  lg:w-1/2 w-11/12 h-screen    overflow-y-scroll border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => pharmacyStore.setModalCreate(false)}>SI</button>
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
                    <p className='flex  text-white lg:text-3xl text-2xl  p-3'>FARMACIA</p>
                </div>
            </div>
            <div className="w-full flex flex-1 md:flex-row flex-col pl-3 mt-8 ">
                <div className="flex flex-col p-1 relative  md:w-1/3 w-full md:pb-0 pb-5">
                    <div className={`flex p-1 border-2 border-transparent rounded-md  ${emptyType ? 'border-red-600'
                        : 'border-transparent'
                        }`}>
                        <div className='flex w-1/2 p-1'>
                            <input onClick={() => setDutyDates('')} type="radio" id="radioOne" value="Normal" className="sr-only peer " name="pharmTypeRadio" onChange={(e) => {
                                setPharmType(e.currentTarget.value)
                                setDatePanel(true)
                                setEmptyType(false)
                            }} />
                            <label htmlFor="radioOne" className="w-full min-w-fit text-center select-none uppercase cursor-pointer
                             text-sm font-medium rounded-md p-2 mx-1
                            peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 ">NORMAL</label>
                            <label className="labelFloatDate" hidden={!datePanel}>Tipo</label>
                        </div>
                        <div className='flex  w-1/2 p-1' >
                            <input type="radio" id="radioTwo" className="sr-only peer " value="Guardia" name="pharmTypeRadio" onChange={(e) => {
                                setPharmType(e.currentTarget.value)
                                setDatePanel(false)
                                setEmptyType(false)
                            }} />
                            <label htmlFor="radioTwo" className="w-full min-w-fit text-center select-none uppercase cursor-pointer
                             text-sm font-medium rounded-md p-2 mx-1 
                            peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 ">DE GUARDIA</label>
                            <label className="labelFloatDate" hidden={datePanel}>Tipo</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className="flex pt-2  p-1 relative ">
                        <div className='mt-1 peer'>
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
                                    background: pharmType === 'Normal' ? '#E5E7EB' : 'white',
                                    fontSize: "14px",
                                    padding: "3px 10px"
                                }}
                                multiple>
                                <button
                                    style={{ margin: "5px", background: "#303F9F", textDecorationColor: "white", borderRadius: "6px", width: "70px", height: "30px", paddingRight: "3px", paddingLeft: "3px", cursor: "pointer" }}
                                    onClick={() => setDutyDates(new Date())}
                                >
                                    <label className='text-white cursor-pointer'>Hoy</label>
                                </button>
                                <button
                                    style={{ margin: "5px", background: "#303F9F", textDecorationColor: "white", borderRadius: "6px", width: "70px", height: "30px", paddingRight: "3px", paddingLeft: "3px", cursor: "pointer" }}
                                    onClick={() => setDutyDates('')}
                                >
                                    <label className='text-white cursor-pointer'>Eliminar</label>
                                </button>
                                <button
                                    style={{ margin: "5px", background: "#303F9F", textDecorationColor: "white", borderRadius: "6px", width: "70px", height: "30px", paddingRight: "3px", paddingLeft: "3px", cursor: "pointer" }}
                                    onClick={() => chekDatesCount()} onFocus={() => setShouldCloseCalendar(true)}
                                >
                                    <label className='text-white cursor-pointer'>Cerrar</label>
                                </button>
                            </DatePicker>
                        </div>
                        <label className={"labelFloatDate"}>Dias de Guardia</label>
                    </div>
                    <div className="flex pt-2  p-1  relative ">
                        <input type="number" ref={inputPeriod} min={0} className="inputCamp w-20 px-2 mt-1 h-10 disabled:bg-gray-200  disabled:text-gray-200"
                            disabled={fillDates(dutyDates?.toString()!!).length > 1 || pharmType === "Normal"}
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
                        <input type="number" ref={inputPeriod} min={0} className="inputCamp  w-20 px-2 mt-1 h-10 disabled:bg-gray-200  disabled:text-gray-200"
                            disabled={fillDates(dutyDates?.toString()!!).length > 1 || pharmType === "Normal"}
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
            <div className="w-full flex flex-1 flex-col mt-5 pl-3">
                <div className="flex flex-col p-1 relative">
                    <input autoFocus ref={inputTitle} placeholder=" " name="pharmacyName" type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
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
                    <input ref={inputWebUrl} placeholder=" " name="pharmacyUrl" className={`inputCamp peer ${emptyWebUrl ? 'border-red-600'
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
                    <div className={`photoBoard ${emptyFile ? 'border-red-600' : ''}`}>
                        <div className="absolute left-3">Foto {file?.name}</div>
                        <form id="form-file-upload" className="w-full flex justify-center">
                            <input
                                type="file"
                                id="input-file-upload"
                                className="visibility: hidden"
                                size={10485760}
                                accept=".png, .JPG, .jpg, .gif, .jpeg"
                                onChange={(value) => {
                                    const selectedFile = value.currentTarget.files!![0];
                                    setFile(selectedFile);
                                    const reader = new FileReader();
                                    reader.readAsDataURL(selectedFile);
                                    reader.onload = () => {
                                        setSelectedImageUrl(reader.result as string);
                                    };
                                }}
                            />
                            <label
                                id="label-file-upload"
                                htmlFor="input-file-upload"
                                className="w-full p-5"
                            >
                                {selectedImageUrl ? (
                                    <div className="flex m-auto flex-col items-center">
                                        <img src={selectedImageUrl} alt="selected photo" />
                                    </div>
                                ) : (
                                    <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                                        <img src={add_Photo} alt="photo" />
                                        <p>Pulse en la zona para añadir una imagen</p>
                                    </div>
                                )}
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
                    <input ref={inputTel} placeholder=" " name="pharmacyTel" type="text" onInput={(e) =>
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} maxLength={9} minLength={9} className={`inputCamp peer lg:w-1/4 ${emptyTel ? 'border-red-600'
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
            {/*Horario------------------------------------------------------------------------------*/}
            <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                <div className="flex flex-col p-1 mt-1 relative">
                    <div className="flex flex-col border-2 rounded-md">
                        <select ref={inputScheSelect} className="inputCamp p-0 peer" defaultValue="Lunes-Viernes" onChange={(e) => {
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
                                <option key={index} label={option.label} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <label className={"labelFloatDate"}>Horario</label>
                        <div className="p-3 flex flex-row" >
                            <div hidden={pharmacyShcedulSelector === "Otro"} className="w-full">
                                <div className="relative p-2 flex lg:flex-row flex-col">
                                    <input ref={inputScheMornOne} placeholder=" " name="pharmacyShedulesMorning" type="time"
                                        className={`inputCamp peer lg:w-1/2 p-1 mr-2 ${emptyScheMorningOne ? 'border-red-600'
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
                                    <input ref={inputScheMornTwo} placeholder=" " name="pharmacyShedulesMorning" type="time"
                                        className={`inputCamp peer lg:w-1/2 p-1 mr-2 ${emptyScheMorningTwo ? 'border-red-600'
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
                                <div className="relative p-2 flex lg:flex-row flex-col">
                                    <input maxLength={100} ref={inputScheEvenOne} placeholder=" " name="pharmacyShedulesEvening" type="time"
                                        className={`inputCamp peer lg:w-1/2 p-1 mr-2 ${emptyScheEveningOne ? 'border-red-600'
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
                                    <input maxLength={100} ref={inputScheEvenTwo} placeholder=" " name="pharmacyShedulesEvening" type="time"
                                        className={`inputCamp peer lg:w-1/2 p-1 mr-2 ${emptyScheEveningTwo ? 'border-red-600'
                                            : ''
                                            }`} onKeyDown={(e) => {
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
                            <div hidden={pharmacyShcedulSelector !== "Otro"} className="  w-full">
                                <div className="relative p-2 ">
                                    <input ref={inputScheExtra} placeholder=" " name="pharmacyShedulesExtra" type="text" className="w-full p-1 mr-2 inputCamp peer" onKeyDown={(e) => {
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
                    <input ref={txtAreaRef} placeholder=" " name="pharmacyDescription" className={`inputCamp peer  ${emptyDescption ? 'border-red-600'
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
                    <label className={"labelFloatTxtArea"}>Direccion</label>
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
                                setEmptyLongLat(false)
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
                    <input value={long} ref={inputLong} placeholder=" " type="text" name="pharmacyLong" className={"inputCamp peer"} disabled onKeyDown={(e) => {
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
                    <input value={lat} ref={inputLat} placeholder=" " type="text" name="pharmacyLat" className={"inputCamp peer "} disabled onKeyDown={(e) => {
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
                <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={addPharmacy} onFocus={() => handleScheduleInput()}>Publicar</button>
                <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(CreatePharmacy)