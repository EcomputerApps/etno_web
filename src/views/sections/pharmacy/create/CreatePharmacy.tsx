import logoEtno from '../../../../assets/logo_etno.png'
import { useState, useRef } from 'react';
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Pharmacy } from '../../../../models/section/Section';
import PharmacyStore from '../../../../viewmodels/pharmacy/PharmacyStore';
import { toast } from 'react-toastify';
import GoogleMapReact from 'google-map-react';
import markerIcon from "../../../../assets/marker.svg"
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

interface Marker {
    lat: number,
    lng: number,
    text: string
}

const pharmacyStore = PharmacyStore.getPharmacyStore()

const CreatePharmacy = () => {
    function chekIfEmpty() {
        pharmType === "" ? setEmptyType(true) : setEmptyType(false)
        pharmacyName === "" ? setEmptyName(true) : setEmptyName(false)
        file === undefined ? setEmptyFile(true) : setEmptyFile(false)
        pharmacyWebUrl === "" ? setEmptyWebUrl(true) : setEmptyWebUrl(false)
        pharmacyTel === "" ? setEmptyTel(true) : setEmptyTel(false)
        pharmacyDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
        pharmacyShcedulMorningOne === "" ? setEmptyScheMorningOne(true) : setEmptyScheMorningOne(false)
        pharmacyShcedulEvenOne === "" ? setEmptyScheEveningOne(true) : setEmptyScheEveningOne(false)
        pharmacyShcedulMorningTwo === "" ? setEmptyScheMorningTwo(true) : setEmptyScheMorningTwo(false)
        pharmacyShcedulEvenTwo === "" ? setEmptyScheEveningTwo(true) : setEmptyScheEveningTwo(false)
        long === 0 || lat === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)
    }

    const [emptyType, setEmptyType] = useState(false)
    const [emptyName, setEmptyName] = useState(false)
    const [emptyFile, setEmptyFile] = useState(false)
    const [emptyWebUrl, setEmptyWebUrl] = useState(false)
    const [emptyTel, setEmptyTel] = useState(false)
    const [emptyDescption, setEmptyDescription] = useState(false)
    const [emptyScheMorningOne, setEmptyScheMorningOne] = useState(false)
    const [emptyScheEveningOne, setEmptyScheEveningOne] = useState(false)
    const [emptyScheMorningTwo, setEmptyScheMorningTwo] = useState(false)
    const [emptyScheEveningTwo, setEmptyScheEveningTwo] = useState(false)
    const [emptyLongLat, setEmptyLongLat] = useState(false)

    const [file, setFile] = useState<File>()
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
    const inputScheMorn = useRef<HTMLInputElement>(null)
    const inputScheEven = useRef<HTMLInputElement>(null)
    const inputScheExtra = useRef<HTMLInputElement>(null)
    const inputLong = useRef<HTMLInputElement>(null)
    const inputLat = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;

    const [pharmType, setPharmType] = useState("")
    const [pharmacyShcedulSelector, setPharmacyShcedulSelector] = useState<string>("Lunes-Viernes")
    const [pharmacyName, setPharmacyName] = useState<string>("")
    const [pharmacyWebUrl, setPharmacyWebUrl] = useState<string>("")
    const [pharmacyTel, setPharmacyTel] = useState<string>("")
    const [pharmacyShcedulMorningOne, setPharmacyShcedulMorningOne] = useState<string>("")
    const [pharmacyShcedulEvenOne, setPharmacyShcedulEvenOne] = useState<string>("")
    const [pharmacyShcedulMorningTwo, setPharmacyShcedulMorningTwo] = useState<string>("")
    const [pharmacyShcedulEvenTwo, setPharmacyShcedulEvenTwo] = useState<string>("")
    const [pharmacyShcedulExtra, setPharmacyShcedulExtra] = useState<string>("")
    const [pharmacyDescription, setPharmacyDescption] = useState<string>("")
    const [pharmacySchedule, setPharmacySchedule] = useState<string>("")
    const [pharmStartDate, setPharmStartDate] = useState<Date>()
    const [pharmPeriod, setPharmPeriod] = useState<number>()
    const [pharmFrequency, setPharmFrequency] = useState<number>()

    function handleScheduleInput() {
        if (pharmacyShcedulSelector === "Otro") {
            setPharmacySchedule(pharmacyShcedulExtra)
        } else {
            setPharmacySchedule(pharmacyShcedulSelector + " " + pharmacyShcedulMorningOne + "-" + pharmacyShcedulMorningTwo +
                " " + pharmacyShcedulEvenOne + "-" + pharmacyShcedulEvenTwo)
        }
    }
    function addPharmacy() {
        const pharmacy: Pharmacy = {
            type: pharmType,
            name: pharmacyName,
            link: pharmacyWebUrl,
            phone: pharmacyTel,
            schedule: pharmacySchedule,
            description: pharmacyDescription,
            longitude: String(long),
            latitude: String(lat),
            startDate: pharmStartDate,
            durationDays: pharmPeriod,
            frequencyInDays: pharmFrequency
        }
        if (pharmacyStore.getPharmacy.name === pharmacy.name) {
            toast.info('Ya existe esta farmacia', {
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
            chekIfEmpty()
            pharmType === "" || pharmacyName === "" || pharmacyWebUrl === "" ||
                pharmacyTel === "" || pharmacySchedule === "" || pharmacyDescription === "" ||
                pharmacyShcedulMorningOne === "" || pharmacyShcedulEvenOne === "" || pharmacyShcedulMorningTwo === "" || pharmacyShcedulEvenTwo === "" ||
                long === 0 || lat === 0 || file === undefined ?
                toast.info('Rellene los campos', {
                    position: 'bottom-center',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }) : pharmacyStore.addRequestPharmacy('Bolea', pharmacy, file!!); sideBarStore.updateSection('Farmacias'); hoverSectionStore.setName('Farmacias')
        }
    }
    return (
        <div className="flex flex-col lg:m-auto  lg:w-1/2  w-3/4 mt-5   h-screen overflow-y-auto border-2 rounded-md bg-white">
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
                            <input type="radio" id="radioOne" value="Normal" className="sr-only peer " name="pharmTypeRadio" onChange={(e) => {
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
                    <div className="flex pt-2  p-1  relative  ">
                        <input type="date" className="inputCamp peer w-40 px-2 mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300" disabled={datePanel}
                            onChange={(e) => {
                                setPharmStartDate(e.currentTarget.valueAsDate!)
                            }}
                            onKeyUp={(e) => {
                                if ((e.code === "NumpadEnter")) {
                                    if (inputPeriod.current != null) {
                                        inputPeriod.current.focus()
                                    }
                                }
                            }} />
                        <label className={"labelFloatDate"}>Inicio de guardia</label>
                    </div>
                    <div className="flex pt-2  p-1  relative ">
                        <input type="number" ref={inputPeriod} min={0} className="inputCamp peer w-20 px-2  mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300" disabled={datePanel}
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
                        <label className={"labelFloatDate"}>Periodo</label>
                    </div>

                    <div className="flex pt-2  p-1  relative ">
                        <input type="number" ref={inputPeriod} min={0} className="inputCamp peer w-20 px-2 mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300" disabled={datePanel}
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
                        <label className={"labelFloatDate"}>Frequesncia</label>
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
                        }} />
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
                        }} />
                    <label className={"labelFloatInput"}>Pagina Web</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 ">
                <div className="text-left p-1">
                    <div className={`photoBoard  ${emptyFile ? 'border-red-600'
                        : ''
                        }`} >
                        <div className='pl-3'>
                            Foto {file?.name}
                        </div>
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                setFile(e.currentTarget.files!![0])
                                setEmptyFile(false)
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
                    <input ref={inputTel} placeholder=" " name="pharmacyTel" type="text" onInput={(e) =>
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
            <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                <div className="flex flex-col p-1 mt-1 relative">
                    <div className="flex flex-col border-2 rounded-md">
                        <select ref={inputScheSelect} className="inputCamp p-0" defaultValue="Lunes-Viernes" onChange={(e) => {
                            setPharmacyShcedulSelector(e.target.value)
                        }} onKeyDown={(e) => {
                            if ((e.code === "NumpadEnter")) {
                                if (inputScheMorn.current != null) {
                                    inputScheMorn.current.focus()
                                } if (inputScheExtra.current != null) {
                                    inputScheExtra.current.focus()
                                }
                            }
                        }}>
                            <option className="peer" value="Lunes-Viernes">De lunes a viernes.</option>
                            <option value="Lunes-Sabado">De lunes a sabado.</option>
                            <option value="Lunes-Domingo">Todos los dias.</option>
                            <option value="Otro">Otro horrario.</option>
                        </select>
                        <label className={"labelFloatDate"}>Horario</label>

                        <div className="p-3 flex flex-row" >
                            <div hidden={pharmacyShcedulSelector === "Otro"} className="w-full">
                                <div className="relative p-2 flex lg:flex-row flex-col">
                                    <input ref={inputScheMorn} placeholder=" " name="pharmacyShedulesMorning" type="time"
                                        className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheMorningOne ? 'border-red-600'
                                            : ''
                                            }`}
                                        onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (inputScheEven.current != null) {
                                                    inputScheEven.current.focus()
                                                }
                                            }
                                        }} onChange={(e) => {
                                            setPharmacyShcedulMorningOne(e.target.value)
                                            setEmptyScheMorningOne(false)
                                        }} />
                                    <input ref={inputScheMorn} placeholder=" " name="pharmacyShedulesMorning" type="time"
                                        className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheMorningTwo ? 'border-red-600'
                                            : ''
                                            }`}
                                        onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (inputScheEven.current != null) {
                                                    inputScheEven.current.focus()
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
                                    <input maxLength={100} ref={inputScheEven} placeholder=" " name="pharmacyShedulesEvening" type="time"
                                        className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheEveningOne ? 'border-red-600'
                                            : ''
                                            }`} onKeyDown={(e) => {
                                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                    if (inputScheExtra.current != null) {
                                                        inputScheExtra.current.focus()
                                                    } if (txtAreaRef.current != null) {
                                                        txtAreaRef.current.focus()
                                                    }
                                                }
                                            }} onChange={(e) => {
                                                setPharmacyShcedulEvenOne(e.target.value)
                                                setEmptyScheEveningOne(false)
                                            }} />
                                    <input maxLength={100} ref={inputScheEven} placeholder=" " name="pharmacyShedulesEvening" type="time"
                                        className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheEveningTwo ? 'border-red-600'
                                            : ''
                                            }`} onKeyDown={(e) => {
                                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                    if (inputScheExtra.current != null) {
                                                        inputScheExtra.current.focus()
                                                    } if (txtAreaRef.current != null) {
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
                    <textarea ref={txtAreaRef} placeholder=" " name="pharmacyDescription" maxLength={495} rows={3} className={`inputCamp peer  ${emptyDescption ? 'border-red-600'
                        : ''
                        }`} onKeyDown={(e) => {
                            if ((e.code === "NumpadEnter")) {
                                if (inputLong.current != null) {
                                    inputLong.current.focus()
                                }
                            }
                        }} onChange={(e) => {
                            setPharmacyDescption(e.target.value)
                            setEmptyDescription(false)
                        }} />
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
                <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => pharmacyStore.setModalCreate(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default CreatePharmacy