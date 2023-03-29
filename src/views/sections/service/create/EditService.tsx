import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
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
    useEffect(() => {
        serviceStore.getAllServicesRequest(localStorage.getItem('user_etno_locality')!)
    }, [])

    function checkIfExist(owner: string) {
        var flag: boolean = false
        if (owner !== serviceNameTemp) {
            serviceStore.getAllServices.services?.map((item) => {
                if (item.owner === owner) {
                    flag = true
                }
            })
        }
        return flag
    }

    const [service] = useState(serviceStore.getService)
    const inputWebUrl = useRef<HTMLInputElement>(null)
    const inputTel = useRef<HTMLInputElement>(null)
    const inputScheSelect = useRef<HTMLSelectElement>(null)
    const inputScheMornOne = useRef<HTMLInputElement>(null)
    const inputScheEvenOne = useRef<HTMLInputElement>(null)
    const inputScheMornTwo = useRef<HTMLInputElement>(null)
    const inputScheEvenTwo = useRef<HTMLInputElement>(null)
    const inputScheExtra = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const [serviceType, setServiceType] = useState<string>(service.category!!)
    const [serviceName, setServiceName] = useState<string>(service.owner!!)
    const [serviceNameTemp] = useState<string>(service.owner!!)
    const [serviceWebUrl, setServiceWebUrl] = useState<string>(service.urlWeb!!)
    const [serviceDescription, setServiceDescription] = useState<string>(service.description!!)
    const [serviceTel, setServiceTel] = useState<string>(service.number!!)
    const [serviceShcedulSelector, setServiceShcedulSelector] = useState<string>(timeCutter(service.schedule!!).length === 6 ? timeCutter(service.schedule!!)!![0] + "-" + timeCutter(service.schedule!!)!![1] : "Otro")
    const [serviceShcedulMorningOne, setServiceShcedulMorningOne] = useState<string>(timeCutter(service.schedule!!)!![2])
    const [serviceShcedulMorningTwo, setServiceShcedulMorningTwo] = useState<string>(timeCutter(service.schedule!!)!![3])
    const [serviceShcedulEvenOne, setServiceShcedulEvenOne] = useState<string>(timeCutter(service.schedule!!)!![4])
    const [serviceShcedulEvenTwo, setServiceShcedulEvenTwo] = useState<string>(timeCutter(service.schedule!!)!![5])
    const [serviceShcedulExtra, setServiceShcedulExtra] = useState<string>("")
    const [serviceSchedule, setServiceSchedule] = useState<string>(service.schedule!!)
    const [file, setFile] = useState<File>()
    const [emptyName, setEmptyName] = useState<boolean>(false)
    const [emptyWebUrl, setEmptyWebUrl] = useState<boolean>(false)
    const [emptyTel, setEmptyTel] = useState<boolean>(false)
    const [emptyDescption, setEmptyDescription] = useState<boolean>(false)
    const [emptyScheMorningOne, setEmptyScheMorningOne] = useState<boolean>(false)
    const [emptyScheEveningOne, setEmptyScheEveningOne] = useState<boolean>(false)
    const [emptyScheMorningTwo, setEmptyScheMorningTwo] = useState<boolean>(false)
    const [emptyScheEveningTwo, setEmptyScheEveningTwo] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    function handleScheduleInput() {
        if (serviceShcedulSelector === "Otro") {
            if (serviceShcedulExtra !== "") {
                setServiceSchedule(serviceShcedulExtra)
            }
        } else {
            if (serviceShcedulMorningOne !== "" && serviceShcedulMorningTwo !== "" && serviceShcedulEvenOne !== "" && serviceShcedulEvenTwo !== "") {
                setServiceSchedule(serviceShcedulSelector + " " + serviceShcedulMorningOne + "-" + serviceShcedulMorningTwo +
                    " " + serviceShcedulEvenOne + "-" + serviceShcedulEvenTwo)
            }
        }
    }

    function editService(serviceId: string) {
            chekIfEmpty()
            if (serviceType === "" || serviceName === "" || serviceDescription === "" ||
                serviceWebUrl === "" || serviceTel === "" || serviceSchedule === ""
            ) {
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
                serviceStore.editService(localStorage.getItem('user_etno_locality')!, serviceId, newService, file!!); sideBarStore.updateSection('Servicios'); hoverSectionStore.setName('Servicios')
            }
    }

    function chekIfEmpty() {
        serviceName === "" ? setEmptyName(true) : setEmptyName(false)
        serviceWebUrl === "" ? setEmptyWebUrl(true) : setEmptyWebUrl(false)
        serviceTel === "" ? setEmptyTel(true) : setEmptyTel(false)
        serviceDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
        serviceShcedulMorningOne === "" ? setEmptyScheMorningOne(true) : setEmptyScheMorningOne(false)
        serviceShcedulEvenOne === "" ? setEmptyScheEveningOne(true) : setEmptyScheEveningOne(false)
        serviceShcedulMorningTwo === "" ? setEmptyScheMorningTwo(true) : setEmptyScheMorningTwo(false)
        serviceShcedulEvenTwo === "" ? setEmptyScheEveningTwo(true) : setEmptyScheEveningTwo(false)
    }

    function timeCutter(time: string) {
        var arrayAux = new Array<string>()
        var timeListAux = new Array<string>()
        var timeList = new Array<string>()
        arrayAux = time.split(" ")
        arrayAux = arrayAux.slice(1, 3)
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

    const selectorOptions = [
        { value: 'Lunes-Viernes', label: 'De lunes a viernes.' },
        { value: 'Lunes-Sabado', label: 'De lunes a sabado.' },
        { value: 'Lunes-Domingo', label: 'Todos los dias.' },
        { value: 'Otro', label: 'Otro horrario' }
    ]

    return (
        <div className="flex flex-col lg:m-auto  lg:w-1/2  w-11/12 h-screen overflow-y-auto border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => serviceStore.setModalEdit(false)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white lg:text-3xl text-2xl  p-3'>EDITAR SERVICIO</p>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-8 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <div className="flex  flex-wrap pt-2">
                            {serviceStore.getServiceType.map((chkBtn, index) => (
                                <div key={index} className='flex lg:w-1/6 w-1/3'>
                                    <input type="radio" id={chkBtn.idServiceType} defaultChecked={service.category === chkBtn.title} name="tipeCheck" className="sr-only peer" value={chkBtn.value} onChange={(e) => {
                                        setServiceType(e.currentTarget.value)
                                    }} />
                                    <label htmlFor={chkBtn.idServiceType} className="w-full  text-center uppercase cursor-pointer p-2 mr-3 mt-3 font-medium text-xs rounded-md peer-checked:bg-indigo-800 border 
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
                            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
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
                                }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
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
                                }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                        <label className={"labelFloatInput"}>Pagina Web</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <input maxLength={9} minLength={9} ref={inputTel} placeholder=" " name="serviceTel" defaultValue={service.number} type="text" onInput={(e) =>
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
                {/*Horario----------------------------------------------------------------------*/}
                <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                    <div className="flex flex-col p-1 mt-1 relative">
                        <div className="flex flex-col border-2 rounded-md">
                            <select ref={inputScheSelect} className="inputCamp p-0 peer" defaultValue={serviceShcedulSelector} onChange={(e) => {
                                setServiceShcedulSelector(e.target.value)
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
                                <div hidden={serviceShcedulSelector === "Otro"} className="w-full">
                                    <div className="relative p-2 flex lg:flex-row flex-col">
                                        <input ref={inputScheMornOne} defaultValue={timeCutter(service.schedule!!)!![0]} placeholder=" " name="serviceShedulesMorningOne" type="time"
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
                                                setServiceShcedulMorningOne(e.target.value)
                                                setEmptyScheMorningOne(false)
                                            }} />
                                        <input ref={inputScheMornTwo} defaultValue={timeCutter(service.schedule!!)!![1]} placeholder=" " name="serviceShedulesMorningTwo" type="time"
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
                                                setServiceShcedulMorningTwo(e.target.value)
                                                setEmptyScheMorningTwo(false)
                                            }} />
                                        <label className={"labelFloatInput"}>Mañana</label>
                                    </div>
                                </div>
                                <div hidden={serviceShcedulSelector === "Otro"} className="w-full">
                                    <div className="relative p-2 flex lg:flex-row flex-col">
                                        <input maxLength={100} ref={inputScheEvenOne} defaultValue={timeCutter(service.schedule!!)!![2]} placeholder=" " name="serviceShedulesEveningOne" type="time"
                                            className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheEveningOne ? 'border-red-600'
                                                : ''
                                                }`} onKeyDown={(e) => {
                                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                        if (inputScheEvenTwo.current != null) {
                                                            inputScheEvenTwo.current.focus()
                                                        }
                                                    }
                                                }} onChange={(e) => {
                                                    setServiceShcedulEvenOne(e.target.value)
                                                    setEmptyScheEveningOne(false)
                                                }} />
                                        <input maxLength={100} ref={inputScheEvenTwo} defaultValue={timeCutter(service.schedule!!)!![3]} placeholder=" " name="serviceShedulesEveningTwo" type="time"
                                            className={`inputCamp peer w-1/2 p-1 mr-2 ${emptyScheEveningTwo ? 'border-red-600'
                                                : ''
                                                }`} onKeyDown={(e) => {
                                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                                        if (txtAreaRef.current != null) {
                                                            txtAreaRef.current.focus()
                                                        }
                                                    }
                                                }} onChange={(e) => {
                                                    setServiceShcedulEvenTwo(e.target.value)
                                                    setEmptyScheEveningTwo(false)
                                                }} />
                                        <label className={"labelFloatInput"}>Tarde</label>
                                    </div>
                                </div>
                                <div hidden={serviceShcedulSelector !== "Otro"} className="  w-full">
                                    <div className="relative p-2 ">
                                        <input ref={inputScheExtra} defaultValue={timeCutter(service.schedule!!)} placeholder=" " name="pharmacyShedulesExtra" type="text" className="inputCamp w-full p-1 mr-2 peer" onKeyDown={(e) => {
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
                <div className="lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button ref={btnRef} name="serviceBtnSave" className="btnStandard mr-10" onFocus={() => handleScheduleInput()} onClick={() => {
                        editService(service.idService!!)
                    }}>Actualizar</button>
                    <button name="serviceBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default EditService
