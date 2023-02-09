import logoEtno from '../../../../assets/logo_etno.png'
import { useNavigate } from "react-router-dom"
import React, { useState, useRef } from 'react';

const CreatePharmacy = () => {
    const navigate = useNavigate()

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

    const [pharmType, setPharmType] = useState("normal")
    const [pharmacyShcedulSelector, setPharmacyShcedulSelector] = useState<string>("L-V.Part")

    const [pharmacyName, setPharmacyName] = useState<string>("")
    const [pharmacyWebUrl, setPharmacyWebUrl] = useState<string>("")
    const [pharmacyPhoto, setPharmacyPhoto] = useState<string>("")
    const [pharmacyTel, setPharmacyTel] = useState<string>("")
    const [pharmacyShcedulMorning, setPharmacyShcedulMorning] = useState<string>("")
    const [pharmacyShcedulEven, setPharmacyShcedulEven] = useState<string>("")
    const [pharmacyShcedulExtra, setPharmacyShcedulExtra] = useState<string>("")
    const [pharmacyDescption, setPharmacyDescption] = useState<string>("")
    const [pharmacyLong, setPharmacyLong] = useState<string>("")
    const [pharmacyLat, setPharmacyLat] = useState<string>("")
    //funcion temporal para comprobar entrada
    function checkState() {
        console.log(pharmacyName)
        console.log(pharmacyWebUrl)
        console.log(pharmacyPhoto)
        console.log(pharmacyTel)
        console.log(pharmType)
        console.log(pharmacyShcedulSelector)
        console.log(pharmacyShcedulMorning)
        console.log(pharmacyShcedulEven)
        console.log(pharmacyShcedulExtra)
        console.log(pharmacyDescption)
        console.log(pharmacyLong)
        console.log(pharmacyLat)
    }

    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2 rounded-md" >
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3'>FARMACIA</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Tipo</label>
                    <div className="flex pt-2">
                        <div className='flex w-1/6'>
                            <input type="radio" id="radioOne" value="normal" className="sr-only peer" name="pharmTypeRadio" onChange={(e) => {
                                setPharmType(e.currentTarget.value)
                            }} />
                            <label htmlFor="radioOne" className="w-full text-center uppercase cursor-pointer p-2 mr-5 font-medium text-sm rounded-md peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 ">NORMAL</label>
                        </div>
                        <div className='flex w-1/6' >
                            <input type="radio" id="radioTwo" className="sr-only peer" value="guardia" name="pharmTypeRadio" onChange={(e) => {
                                setPharmType(e.currentTarget.value)
                            }} />
                            <label htmlFor="radioTwo" className="w-full text-center uppercase cursor-pointer text-sm font-medium rounded-md p-2 
                            peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 ">DE GUARDIA</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Nombre</label>
                    <input autoFocus placeholder="Nombre" name="pharmacyName" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
                        setPharmacyName(e.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
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
                        setPharmacyWebUrl(e.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputTel.current != null) {
                                inputTel.current.focus()
                            }
                        }
                    }} />
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="text-left p-1">
                    <label className=" text-2xl">Fotos</label>
                    <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300  ">
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                setPharmacyPhoto(e.currentTarget.value)
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
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Teléfono</label>
                    <input ref={inputTel} placeholder="Telefono" name="pharmacyTel" type="text" onInput={(e) =>
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} maxLength={9} className="border-2 rounded-md p-2" onKeyUp={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (inputScheSelect.current != null) {
                                    inputScheSelect.current.focus()
                                }
                            }
                        }} onChange={(e) => {
                            setPharmacyTel(e.currentTarget.value)
                        }} />
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Horrario</label>
                    <div className="flex flex-col border-2 rounded-md">
                        <select ref={inputScheSelect} onChange={(e) => {
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
                            <option value="L-V.Part">De lunes a viernes. Hornada parcial.</option>
                            <option value="L-V.Compl">De lunes a viernes. Hornada completa.</option>
                            <option value="L-S.Part">De lunes a sabado. Hornada parcial.</option>
                            <option value="L-S.Compl">De lunes a sabado. Hornada completa.</option>
                            <option value="L-D.Part">Todos los dias. Hornada parcial.</option>
                            <option value="L-D.Compl">Todos los dias. Hornada completa.</option>
                            <option value="Otro">Otro horrario.</option>
                        </select>
                        <div className="p-3" >
                            <input  ref={inputScheMorn} placeholder="Mañana:" hidden={pharmacyShcedulSelector === "L-V.Compl" || pharmacyShcedulSelector === "L-S.Compl" || pharmacyShcedulSelector === "L-D.Compl"} name="pharmacyShedulesMorning" type="text" className="border-2 rounded-md p-2 mr-2" onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputScheEven.current != null) {
                                        inputScheEven.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyShcedulMorning(e.target.value)
                            }} />
                            <input ref={inputScheEven} placeholder="Tarde:" hidden={pharmacyShcedulSelector === "L-V.Compl" || pharmacyShcedulSelector === "L-S.Compl" || pharmacyShcedulSelector === "L-D.Compl"} name="pharmacyShedulesEvening" type="text" className="border-2 rounded-md p-2 mr-2" onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputScheExtra.current != null) {
                                        inputScheExtra.current.focus()
                                    } if (txtAreaRef.current != null) {
                                        txtAreaRef.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyShcedulEven(e.target.value)
                            }} />
                            <input ref={inputScheExtra} placeholder="ej. 9-21:30 " hidden={pharmacyShcedulSelector === "L-V.Part" || pharmacyShcedulSelector === "L-S.Part" || pharmacyShcedulSelector === "L-D.Part"} name="pharmacyShedulesExtra" type="text" className="border-2 rounded-md p-2" onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (txtAreaRef.current != null) {
                                        txtAreaRef.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyShcedulExtra(e.target.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Descripción</label>
                    <textarea ref={txtAreaRef} placeholder="Descripcion" name="pharmacyDescription" rows={3} className="border-2 rounded-md p-2" onKeyDown={(e) => {
                        if ((e.code === "NumpadEnter")) {
                            if (inputLong.current != null) {
                                inputLong.current.focus()
                            }
                        }
                    }} onChange={(e) => {
                        setPharmacyDescption(e.target.value)
                    }} />
                </div>
            </div>
            <div className="flex flex-1 m-auto justify-center p-3">
                <img className='rounded-md' src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" alt="googlemap"></img>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Longitud</label>
                    <input ref={inputLong} placeholder="Longitud" type="text" name="pharmacyLong" className="border-2 rounded-md p-2" onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputLat.current != null) {
                                inputLat.current.focus()
                            }
                        }
                    }} onChange={(e) => {
                        setPharmacyLong(e.target.value)
                    }} />
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Latitude</label>
                    <input ref={inputLat} placeholder="Latitud" type="text" name="pharmacyLat" className="border-2 rounded-md p-2" onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (btnRef.current != null) {
                                btnRef.current.focus()
                            }
                        }
                    }} onChange={(e) => {
                        setPharmacyLat(e.target.value)
                    }} />
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
                <button ref={btnRef} name="pharmacyBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => checkState()}>Publicar</button>
                <button name="pharmacyBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
        </div>
    )
}

export default CreatePharmacy