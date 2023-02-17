import logoEtno from '../../../../assets/logo_etno.png'
import { useNavigate } from "react-router-dom"
import React, { useState, useRef } from 'react';
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"

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
            <div className="w-full flex flex-1 flex-col pl-3 mt-8">
                <div className="flex flex-col p-1    relative">
                 
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
                        <label className={"float-date-lbl"}>Tipo</label>
                    </div>
                    
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-5 pl-3">
                <div className="flex flex-col p-1 relative">
                            
                    <input autoFocus placeholder=" " name="pharmacyName" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(e) => {
                        setPharmacyName(e.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputWebUrl.current != null) {
                                inputWebUrl.current.focus()
                            }
                        }
                    }} />
                    <label className={"float-input-lbl"}>Nombre</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 mt-3">
                <div className="flex flex-col p-1 relative  ">
              
                    <input ref={inputWebUrl} placeholder=" " name="pharmacyUrl" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(e) => {
                        setPharmacyWebUrl(e.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputTel.current != null) {
                                inputTel.current.focus()
                            }
                        }
                    }} />
                    <label className={"float-input-lbl"}>Pagina Web</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="text-left p-1">
                         <div className={"photoBoard"}>
                        <div className='pl-3'>
                            Foto
                        </div>
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                setPharmacyPhoto(e.currentTarget.value)
                            }} />
                            <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                                <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                                    <img src={add_Photo} alt="photo"/>
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
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} maxLength={9} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
                        border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onKeyUp={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (inputScheSelect.current != null) {
                                    inputScheSelect.current.focus()
                                }
                            }
                        }} onChange={(e) => {
                            setPharmacyTel(e.currentTarget.value)
                        }} />
                        <label className={"float-input-lbl"}>Teléfono</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 mt-5">
                <div className="flex flex-col p-1 mt-1 relative">
               
                    <div className="flex flex-col border-2 rounded-md">
                        <select ref={inputScheSelect} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md  peer focus:outline-none focus:border-indigo-800"  onChange={(e) => {
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
                            <option className="peer" value="L-V.Part">De lunes a viernes. Hornada parcial.</option>
                            <option value="L-V.Compl">De lunes a viernes. Hornada completa.</option>
                            <option value="L-S.Part">De lunes a sabado. Hornada parcial.</option>
                            <option value="L-S.Compl">De lunes a sabado. Hornada completa.</option>
                            <option value="L-D.Part">Todos los dias. Hornada parcial.</option>
                            <option value="L-D.Compl">Todos los dias. Hornada completa.</option>
                            <option value="Otro">Otro horrario.</option>
                        </select>
                        <label className={"float-date-lbl"}>Horario</label>
                        <div className="p-3 flex flex-row" >
                            <div className="relative p-2">
                            <input  ref={inputScheMorn} placeholder=" " hidden={pharmacyShcedulSelector === "L-V.Compl" || pharmacyShcedulSelector === "L-S.Compl" || pharmacyShcedulSelector === "L-D.Compl"} name="pharmacyShedulesMorning" type="text" className="border-2 rounded-md p-1 mr-2 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           peer focus:outline-none focus:border-indigo-800" onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputScheEven.current != null) {
                                        inputScheEven.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyShcedulMorning(e.target.value)
                            }} />
                            <label hidden={pharmacyShcedulSelector === "L-V.Compl" || pharmacyShcedulSelector === "L-S.Compl" || pharmacyShcedulSelector === "L-D.Compl"} className={"float-input-lbl"}>Mañana</label>
                            </div>
                            <div className="relative p-2">
                            <input ref={inputScheEven} placeholder=" " hidden={pharmacyShcedulSelector === "L-V.Compl" || pharmacyShcedulSelector === "L-S.Compl" || pharmacyShcedulSelector === "L-D.Compl"} name="pharmacyShedulesEvening" type="text" className="border-2 rounded-md p-1 mr-2 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           peer focus:outline-none focus:border-indigo-800" onKeyDown={(e) => {
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
                            <label hidden={pharmacyShcedulSelector === "L-V.Compl" || pharmacyShcedulSelector === "L-S.Compl" || pharmacyShcedulSelector === "L-D.Compl"} className={"float-input-lbl"}>Tarde</label>
                            </div>
                            <div className="relative p-2">
                            <input ref={inputScheExtra} placeholder=" " hidden={pharmacyShcedulSelector === "L-V.Part" || pharmacyShcedulSelector === "L-S.Part" || pharmacyShcedulSelector === "L-D.Part"} name="pharmacyShedulesExtra" type="text" className="border-2 rounded-md p-1 mr-2 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           peer focus:outline-none focus:border-indigo-800" onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (txtAreaRef.current != null) {
                                        txtAreaRef.current.focus()
                                    }
                                }
                            }} onChange={(e) => {
                                setPharmacyShcedulExtra(e.target.value)
                            }} />
                            <label hidden={pharmacyShcedulSelector === "L-V.Part" || pharmacyShcedulSelector === "L-S.Part" || pharmacyShcedulSelector === "L-D.Part"} className={"float-input-lbl"}>Completa</label>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
              
                    <textarea ref={txtAreaRef} placeholder=" " name="pharmacyDescription"  maxLength={495} rows={3} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onKeyDown={(e) => {
                        if ((e.code === "NumpadEnter")) {
                            if (inputLong.current != null) {
                                inputLong.current.focus()
                            }
                        }
                    }} onChange={(e) => {
                        setPharmacyDescption(e.target.value)
                    }} />
                      <label className={"float-txtArea-lbl"}>Descripción</label>
                </div>
            </div>
           
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
                    
                    <input ref={inputLong} placeholder=" " type="text" name="pharmacyLong" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (inputLat.current != null) {
                                inputLat.current.focus()
                            }
                        }
                    }} onChange={(e) => {
                        setPharmacyLong(e.target.value)
                    }} />
                    <label className={"float-input-lbl"}>Longitud</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
            
                    <input ref={inputLat} placeholder=" " type="text" name="pharmacyLat" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (btnRef.current != null) {
                                btnRef.current.focus()
                            }
                        }
                    }} onChange={(e) => {
                        setPharmacyLat(e.target.value)
                    }} />
                    <label className={"float-input-lbl"}>Latitude</label>
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
                <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={() => checkState()}>Publicar</button>
                <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
        </div>
    )
}

export default CreatePharmacy