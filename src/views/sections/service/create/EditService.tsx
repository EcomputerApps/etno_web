import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import logoEtno from '../../../../assets/logo_etno.png';
import add_Photo from '../../../../assets/menu/add_photo.svg';
import "../../../../index.css";
import { Service } from '../../../../models/section/Section';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import ServiceStore from '../../../../viewmodels/service/ServiceStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const serviceStore = ServiceStore.getServiceStore()


const EditService = () => {
    const [service, setService] = useState(serviceStore.getService)
    let arraySchedules: { selector: string, morning: string, evening: string, complete: string }[] = []
    const navigate = useNavigate()
    const arrayServiceTypes = [{
        "id": "checkOne",
        "value": "Restaurante",
        "title": "Restaurante",
    }, {
        "id": "checkTwo",
        "value": "Alojamiento",
        "title": "Alojamiento",
    }, {
        "id": "checkThree",
        "value": "Casa Rural",
        "title": "Casa Rural",
    }, {
        "id": "checkFour",
        "value": "Piscina",
        "title": "Piscina",
    }, {
        "id": "checkFive",
        "value": "Iglesia",
        "title": "Iglesia",
    }, {
        "id": "checkSix",
        "value": "Productos",
        "title": "Productos",
    }, {
        "id": "checkSeven",
        "value": "Bar",
        "title": "Bar",
    },
    {
        "id": "checkEight",
        "value": "Ninguno",
        "title": "Ninguno",
    }]

    const inputWebUrl = useRef<HTMLInputElement>(null)
    const inputTel = useRef<HTMLInputElement>(null)
    const inputScheSelect = useRef<HTMLSelectElement>(null)
    const inputScheMorn = useRef<HTMLInputElement>(null)
    const inputScheEven = useRef<HTMLInputElement>(null)
    const inputScheExtra = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [serviceType, setServiceType] = useState(service.category!!)

    const [serviceName, setServiceName] = useState<string>(service.owner!!)
    const [serviceWebUrl, setServiceWebUrl] = useState<string>(service.urlWeb!!)
    const [serviceDescription, setServiceDescription] = useState<string>(service.description!!)
    const [serviceTel, setServiceTel] = useState<string>(service.number!!)
    const [serviceShcedulSelector, setServiceShcedulSelector] = useState<string>("Lunes-Viernes")
    const [serviceShcedulMorning, setServiceShcedulMorning] = useState<string>("")
    const [serviceShcedulEven, setServiceShcedulEven] = useState<string>("")
    const [serviceShcedulExtra, setServiceShcedulExtra] = useState<string>("")
    const [serviceSchedule, setServiceSchedule] = useState<string>(service.schedule!!)

    const [file, setFile] = useState<File>()

    function handleScheduleInput() {
        if (serviceShcedulSelector === "Otro") {
            setServiceSchedule(serviceShcedulExtra)
        } else {
            setServiceSchedule(serviceShcedulSelector + " " + serviceShcedulMorning + " " + serviceShcedulEven)
        }
    }

    function editService(serviceId: string) {
        if (serviceType === "" || serviceName === "" || serviceDescription === "" ||
            serviceWebUrl === "" || serviceTel === "" || serviceSchedule === ""
        ) {
            chekIfEmpty()
            toast.info('Rellene los campos', {
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
            const newService: Service = {
                category: serviceType,
                owner: serviceName,
                description: serviceDescription,
                urlWeb: serviceWebUrl,
                number: serviceTel,
                schedule: serviceSchedule,
                imageUrl: service.imageUrl
            }
            serviceStore.editService('Bolea', serviceId, newService, file!!)
        }
    }
    function chekIfEmpty() {
        serviceName === "" ? setEmptyName(true) : setEmptyName(false)
        serviceWebUrl === "" ? setEmptyWebUrl(true) : setEmptyWebUrl(false)
        serviceTel === "" ? setEmptyTel(true) : setEmptyTel(false)
        serviceDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)

    }

    const [emptyName, setEmptyName] = useState(false)
    const [emptyWebUrl, setEmptyWebUrl] = useState(false)
    const [emptyTel, setEmptyTel] = useState(false)
    const [emptyDescption, setEmptyDescription] = useState(false)

    return (
        <div className="flex flex-col h-screen w-1/2 border-2 rounded-md overflow-y-auto bg-white" >
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white text-3xl p-3'>EDITAR SERVICIO</p>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-8 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <div className="flex  flex-wrap pt-2">
                            {arrayServiceTypes.map((chkBtn, index) => (
                                <div key={index} className='flex lg:w-1/6 w-1/3'>
                                    <input type="radio" id={chkBtn.id} name="tipeCheck" className="sr-only peer" value={chkBtn.value} onChange={(e) => {
                                        setServiceType(e.currentTarget.value)
                                    }} />
                                    <label htmlFor={chkBtn.id} className="w-full  text-center uppercase cursor-pointer p-2 mr-3 mt-3 font-medium text-xs rounded-md peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 overflow-hidden ">{chkBtn.title}</label>
                                </div>
                            ))}
                        </div>
                        <label className={"labelFloatDate"}>Categoría</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col  p-1 relative">
                        <input autoFocus placeholder=" " name="serviceOwner" defaultValue={service.owner} type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
                            : ''
                            }`} onChange={(e) => {
                                setServiceName(e.currentTarget.value)
                                setEmptyName(false)
                            }} onKeyUp={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (txtAreaRef.current != null) {
                                        txtAreaRef.current.focus()
                                    }
                                }
                            }} />
                        <label className={"labelFloatInput"}>Nombre</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <textarea ref={txtAreaRef} placeholder=" " name="newsDescription" defaultValue={service.description} rows={3}
                            className={`inputCamp peer ${emptyDescption ? 'border-red-600'
                                : ''
                                }`} onChange={(value) => {
                                    setServiceDescription(value.currentTarget.value)
                                    setEmptyDescription(false)
                                }} onKeyDown={(e) => {
                                    if (e.code === "NumpadEnter") {
                                        if (inputWebUrl.current != null) {
                                            inputWebUrl.current.focus()
                                        }
                                    }
                                }} />
                        <label className={"labelFloatTxtArea"}>Descripción</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <input ref={inputWebUrl} placeholder=" " name="pharmacyUrl" defaultValue={service.urlWeb} type="text"
                            className={`inputCamp peer ${emptyWebUrl ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => {
                                    setServiceWebUrl(e.currentTarget.value)
                                    setEmptyWebUrl(false)
                                }} onKeyDown={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputTel.current != null) {
                                            inputTel.current.focus()
                                        }
                                    }
                                }} />
                        <label className={"labelFloatInput"}>Pagina Web</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <input maxLength={9} ref={inputTel} placeholder=" " name="serviceTel" defaultValue={service.number} type="text" onInput={(e) =>
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} className={`inputCamp peer w-1/4 ${emptyTel ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => {
                                    setServiceTel(e.currentTarget.value)
                                    setEmptyTel(false)
                                }} onKeyDown={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputScheSelect.current != null) {
                                            inputScheSelect.current.focus()
                                        }
                                    }
                                }} />
                        <label className={"labelFloatInput"}>Teléfono</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                    <div className="flex flex-col p-1 mt-1 relative">
                        <div className="flex flex-col border-2 rounded-md">
                            <select ref={inputScheSelect} className="inputCamp p-0 peer" defaultValue="Lunes-Viernes" onChange={(e) => {
                                setServiceShcedulSelector(e.target.value)
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
                                <div hidden={serviceShcedulSelector === "Otro"} className="w-full">
                                    <div className="relative p-2">
                                        <input ref={inputScheMorn} placeholder=" " name="pharmacyShedulesMorning" type="text" className="inputCamp w-full p-1 mr-2 peer" onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (inputScheEven.current != null) {
                                                    inputScheEven.current.focus()
                                                }
                                            }
                                        }} onChange={(e) => {
                                            setServiceShcedulMorning(e.target.value)
                                        }} />
                                        <label className={"labelFloatInput"}>Mañana</label>
                                    </div>
                                </div>
                                <div hidden={serviceShcedulSelector === "Otro"} className="w-full">
                                    <div className="relative p-2">
                                        <input maxLength={100} ref={inputScheEven} placeholder=" " name="pharmacyShedulesEvening" type="text" className="inputCamp w-full p-1 mr-2 peer" onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (inputScheExtra.current != null) {
                                                    inputScheExtra.current.focus()
                                                } if (txtAreaRef.current != null) {
                                                    txtAreaRef.current.focus()
                                                }
                                            }
                                        }} onChange={(e) => {

                                            setServiceShcedulEven(e.target.value)
                                        }} />
                                        <label className={"labelFloatInput"}>Tarde</label>
                                    </div>
                                </div>
                                <div hidden={serviceShcedulSelector !== "Otro"} className="  w-full">
                                    <div className="relative p-2 ">
                                        <input ref={inputScheExtra} placeholder=" " name="pharmacyShedulesExtra" type="text" className="inputCamp w-full p-1 mr-2 peer" onKeyDown={(e) => {
                                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                if (txtAreaRef.current != null) {
                                                    txtAreaRef.current.focus()
                                                }
                                            }
                                        }} onBlur={(e) => {
                                            setServiceShcedulExtra(e.target.value)
                                        }} />
                                        <label className={"labelFloatInput"}>Otro</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
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
                                        <img src={add_Photo} alt="add_photo"></img>
                                        <p>Pulse en la zona para añadir una imagen</p>
                                    </div>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">

                    <button ref={btnRef} name="serviceBtnSave" className="btnStandard mr-10" onFocus={() => handleScheduleInput()} onClick={() => {
                        editService(service.idService!!)
                    }}>Actualizar</button>
                    <button name="serviceBtnCancel" className="btnStandard" onClick={() => serviceStore.setModalEdit(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default EditService
