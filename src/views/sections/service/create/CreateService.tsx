import { useState } from 'react';
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
const CreateService = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState("1")

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"], "image/gif": [".gif"] },
            maxFiles: 1, maxSize: 10485760, noClick: true
        })
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
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Foto</label>
                    <div {...getRootProps()} className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-medium
                             text-indigo-600 focus-within:outline-none focus-within:ring-2
                              focus-within:ring-indigo-600 focus-within:ring-offset-2
                               hover:text-indigo-500">

                                    <input   {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Suelta los archivos aquí ...</p> :
                                            <p>Arrastre y suelte algunos archivos, o haga clic aquí para seleccionar archivos</p>
                                    }
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                        </div>
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
