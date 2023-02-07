import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const CreateService = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState("1")

    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src="https://etno.ecomputer.es/images/app.png" alt="logo_etno"></img>
                    <p className='flex  text-white text-3xl p-3'>SERVICIOS</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Categoría</label>
                    <div className="flex flex-row text-left gap-4">
                        <button name="serviceBtnOp1" value="option1" className="w-fit h-10  bg-neutral-50 border-2 hover:bg-slate-200 focus:shadow-inner rounded-md focus:bg-indigo-400 p-2" >Restaurante</button>
                        <button name="serviceBtnOp2" value="option2" className="w-fit h-10 bg-neutral-50 border-2 hover:bg-slate-200 hover:shadow-inner rounded-md focus:bg-indigo-400 p-2 ">General</button>
                        <button name="serviceBtnOp3" value="option3" className="w-fit h-10  bg-neutral-50 border-2 hover:bg-slate-200 hover:shadow-inner rounded-md focus:bg-indigo-400 p-2">Alojamiento</button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col  p-1">
                    <label className="text-left text-2xl p-1">Nombre</label>
                    <input placeholder="Nombre" name="serviceOwner" type="text" className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Teléfono</label>
                    <input placeholder="Telefono" name="serviceTel" type="text" onInput={(e) =>
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Horrario</label>
                    <div className="flex flex-col border-2 rounded-md">
                        <select onChange={(e) => {
                            setValue(e.target.value)
                        }}>
                            <option value="1">De lunes a viernes. Hornada parcial.</option>
                            <option value="2">De lunes a viernes. Hornada completa.</option>
                            <option value="1">De lunes a sabado. Hornada parcial.</option>
                            <option value="2">De lunes a sabado. Hornada completa.</option>
                            <option value="1">Todos los dias. Hornada parcial.</option>
                            <option value="2">Todos los dias. Hornada completa.</option>
                            <option value="3">Otro horrario.</option>
                        </select>
                        <div className="p-3" >
                            <input placeholder="Mañana:" hidden={value === "2"} name="serviceShedulesMorning" type="text" className="border-2 rounded-md p-2"></input>
                            <input placeholder="Tarde:" hidden={value === "2"} name="serviceShedulesEvening" type="text" className="border-2 rounded-md p-2"></input>
                            <input placeholder="ej. 9-21:30 " hidden={value === "1"} name="serviceShedulesExtra" type="text" className="border-2 rounded-md p-2"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="text-left p-1">
                    <label className=" text-2xl">Fotos</label>
                    <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300  ">
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" />
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
                <button name="serviceBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">Publicar</button>
                <button name="serviceBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
        </div>

    )
}

export default CreateService
