import logoEtno from '../../../../assets/logo_etno.png'
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
let arrayType: string[] = []
let arraySchedules:{selector: string, morning:string, evening: string, complete:string} [] =[]
const CreateService = () => {
    const navigate = useNavigate()
    const arrayTypeChkBtn = [{
        "id": "checkOne",
        "value": "restaurante",
        "title": "restaurante",
    }, {
        "id": "checkTwo",
        "value": "alojamiento",
        "title": "alojamiento",
    }, {
        "id": "checkThree",
        "value": "boongalow",
        "title": "boongalow",
    }, {
        "id": "checkFour",
        "value": "piscina",
        "title": "piscina",
    }, {
        "id": "checkFive",
        "value": "discoteca",
        "title": "discoteca",
    }, {
        "id": "checkSix",
        "value": "productos",
        "title": "productos",
    }, {
        "id": "checkSeven",
        "value": "chupitos",
        "title": "chupitos",
    }]

    function defineType(props: EventTarget & HTMLInputElement) {
        if (props.checked) {
            arrayType.push(props.value)
        } else {
            arrayType = arrayType.filter(item => item !== props.value)
        }

    }
    

    const inputWebUrl = useRef<HTMLInputElement>(null)
    const inputTel = useRef<HTMLInputElement>(null)
    const inputScheSelect = useRef<HTMLSelectElement>(null)
    const inputScheMorn = useRef<HTMLInputElement>(null)
    const inputScheEven = useRef<HTMLInputElement>(null)
    const inputScheExtra = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [serviceType, setServiceType] = useState(arrayType)
    const [serviceShcedul, setServiceShcedul] = useState(arraySchedules)
    const [serviceShcedulSelector, setServiceShcedulSelector] = useState<string>("L-V.Part")
    const [serviceName, setServiceName] = useState<string>("")
    const [servicePhoto, setServicePhoto] = useState<string>("")
    const [serviceWebUrl, setServiceWebUrl] = useState<string>("")
    const [serviceDescription, setServiceDescription] = useState<string>("")
    const [serviceTel, setServiceTel] = useState<string>("")
    const [serviceShcedulMorning, setServiceShcedulMorning] = useState<string>("")
    const [serviceShcedulEven, setServiceShcedulEven] = useState<string>("")
    const [serviceShcedulExtra, setServiceShcedulExtra] = useState<string>("")

    function defineSchedule(selector: string, morning: string, evening:string, complete:string) {
        arraySchedules.push({selector, morning, evening, complete} )
        
           

    }
    //funcion temporal para comprobar entrada
    const showarray = () => {
        arrayType.map((elem, index) => {
            console.log(elem)
        })
    }
    function checkState() {
        //hay que meter en otro metodo para vuelcar array en serviceType useState
        setServiceType(arrayType)
        defineSchedule(serviceShcedulSelector,serviceShcedulMorning,serviceShcedulEven,serviceShcedulExtra)

        console.log(serviceType)
        console.log(arraySchedules)
        console.log(serviceShcedulSelector)
        console.log(serviceName)
        console.log(servicePhoto)
        console.log(serviceTel)
        console.log(serviceWebUrl)
        console.log(serviceDescription)
        console.log(serviceShcedulMorning)
        console.log(serviceShcedulEven)
        console.log(serviceShcedulExtra)
    }

    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2 rounded-md" >
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3'>SERVICIOS</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Categoría</label>
                    <div className="flex  flex-wrap pt-2">
                        {arrayTypeChkBtn.map((chkBtn, index) => (
                            <div key={index} className='flex lg:w-1/6 w-1/3'>
                                <input type="checkbox" id={chkBtn.id} name="tipeCheck" className="sr-only peer" value={chkBtn.value} onChange={(e) => defineType(e.currentTarget)} />
                                <label htmlFor={chkBtn.id} className="w-full text-center uppercase cursor-pointer p-2 mr-3 mt-3 font-medium text-xs rounded-md peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 overflow-hidden ">{chkBtn.title}</label>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col  p-1">
                    <label className="text-left text-2xl p-1">Nombre</label>
                    <input autoFocus placeholder="Nombre" name="serviceOwner" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
                        setServiceName(e.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (txtAreaRef.current != null) {
                                txtAreaRef.current.focus()
                            }
                        }
                    }} />
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Descripción</label>
                    <textarea ref={txtAreaRef} placeholder="Descripcion" name="newsDescription" rows={3} className="border-2 rounded-md p-2" onChange={(value) => {
                        setServiceDescription(value.currentTarget.value)
                    }} onKeyDown={(e) => {
                        if (e.code === "NumpadEnter") {
                            if (inputWebUrl.current != null) {
                                inputWebUrl.current.focus()
                            }
                        }
                    }} />
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Enlace</label>
                    <input ref={inputWebUrl} placeholder="www.ecomputer.es" name="pharmacyUrl" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
                        setServiceWebUrl(e.currentTarget.value)
                    }} onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputTel.current != null) {
                                inputTel.current.focus()
                            }
                        }
                    }} />
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Teléfono</label>
                    <input maxLength={9} ref={inputTel} placeholder="Telefono" name="serviceTel" type="text" onInput={(e) =>
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} className="border-2 rounded-md p-2" onChange={(e) => {
                            setServiceTel(e.currentTarget.value)
                        }} onKeyDown={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (inputScheSelect.current != null) {
                                    inputScheSelect.current.focus()
                                }
                            }
                        }} />
                </div>
            </div>

            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Horrario</label>
                    <div className="flex flex-col border-2 rounded-md">
                        <select ref={inputScheSelect} onChange={(e) => {
                            setServiceShcedulSelector(e.target.value)
                        }} onKeyDown={(e) => {
                            if ((e.code === "NumpadEnter")) {
                                if (inputScheExtra.current != null) {
                                    inputScheExtra.current.focus()
                                }
                                if (inputScheMorn.current != null) {
                                    inputScheMorn.current.focus()
                                }
                            }
                        }}>
                            <option value="L-V.Part">De lunes a viernes. Hornada parcial.</option>
                            <option value="L-V.Compl">De lunes a viernes. Hornada completa.</option>
                            <option value="L-S.Part">De lunes a sabado. Hornada parcial.</option>
                            <option value="L-S.Compl">De lunes a sabado. Hornada completa.</option>
                            <option value="L-D.Part">Todos los dias. Hornada parcial.</option>
                            <option value="L-D.Compl">Todos los dias. Hornada completa.</option>
                            <option value="Otro">Otro horrario.</option>
                        </select>
                        <div className="p-3" >
                            <input maxLength={11} ref={inputScheMorn} placeholder="Mañana:" hidden={serviceShcedulSelector === "L-V.Compl" || serviceShcedulSelector === "L-S.Compl" || serviceShcedulSelector === "L-D.Compl"} name="serviceShedulesMorning" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
                                setServiceShcedulMorning(e.currentTarget.value)
                            }} onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputScheEven.current != null) {
                                        inputScheEven.current.focus()
                                    }
                                }
                            }} />
                            <input maxLength={11}  ref={inputScheEven} placeholder="Tarde:" hidden={serviceShcedulSelector === "L-V.Compl" || serviceShcedulSelector === "L-S.Compl" || serviceShcedulSelector === "L-D.Compl"} name="serviceShedulesEvening" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
                                setServiceShcedulEven(e.currentTarget.value)
                            }} onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (btnRef.current != null) {
                                        btnRef.current.focus()
                                    }
                                    if (inputScheExtra.current != null) {
                                        inputScheExtra.current.focus()
                                    }
                                }
                            }} />
                            <input maxLength={11} ref={inputScheExtra} placeholder="ej. 9-21:30 " hidden={serviceShcedulSelector === "L-V.Part" || serviceShcedulSelector === "L-S.Part" || serviceShcedulSelector === "L-D.Part"} name="serviceShedulesExtra" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
                                setServiceShcedulExtra(e.currentTarget.value)
                            }} onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (btnRef.current != null) {
                                        btnRef.current.focus()
                                    }
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="text-left p-1">
                    <label className=" text-2xl">Fotos</label>
                    <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300  ">
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                setServicePhoto(e.currentTarget.value)
                            }} />
                            <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                                <div className="flex m-auto flex-col items-center text-gray-400 text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#BDBDBD"><path d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h20.45v3H9v30h30V18.6h3V39q0 
                  1.25-.875 2.125T39 42Zm26-24.9v-4.05h-4.05v-3H35V6h3v4.05h4.05v3H38v4.05ZM12 33.9h24l-7.2-9.6-6.35 8.35-4.7-6.2ZM9 9v30V9Z"/></svg>
                                    <p>Pulse en la zona para añadir una imagen</p>
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
                <button ref={btnRef} name="serviceBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => {
                    checkState()
                }}>Publicar</button>
                <button name="serviceBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
        </div>
    )
}
export default CreateService
