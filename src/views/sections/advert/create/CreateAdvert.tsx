
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateAdvert = () => {
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [advertTitle, setAdvertTitle] = useState<string>("")
    const [advertDescription, setAdvertDescription] = useState<string>("")
    const [advertPhoto, setAdvertPhoto] = useState<string>("")
    const [advertLink, setAdvertLink] = useState<string>("")

    //funcion temporal para comprobar  datos  que guardamos con consol.log
    function checkState() {
        console.log(advertTitle)
        console.log(advertDescription)
        console.log(advertPhoto)
        console.log(advertLink)
    }


    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={"https://etno.ecomputer.es/images/app.png"} alt="logo_etno"></img>
                    <p className='flex  text-white text-3xl p-3'>ANUNCIOS</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Titulo</label>
                    <input autoFocus placeholder="titulo" name="advertTitle" type="text" className="border-2 rounded-md p-2" onChange={(value) => {
                        setAdvertTitle(value.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")){
                            if (txtAreaRef.current != null) {
                                txtAreaRef.current.focus()
                            }
                        }
                    }}></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Descripción</label>
                    <textarea ref={txtAreaRef} placeholder="Descripcion" name="advertDescription" rows={3} className="border-2 rounded-md p-2" onChange={(value) => {
                        setAdvertDescription(value.currentTarget.value)
                    }} onKeyDown={(e) => {
                        if (e.code === "NumpadEnter") {
                            if (inputRef.current != null) {
                                inputRef.current.focus()
                            }
                        }
                    }}></textarea>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="text-left p-1">
                    <label className=" text-2xl">Fotos</label>
                    <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300  ">
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                                setAdvertPhoto(value.currentTarget.value)
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
                    <label className="text-left text-2xl p-1">Enlace</label>
                    <input ref={inputRef} placeholder="www.ecomputer.es" name="advertUrl" type="text" className="border-2 rounded-md p-2" onChange={(value) => {
                        setAdvertLink(value.currentTarget.value)
                    }}
                        onKeyDown={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (btnRef.current != null) {
                                    btnRef.current.focus()
                                }
                            }
                        }} ></input>
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
                <button ref={btnRef} name="advertBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => {
                    checkState()
                }}>Publicar</button>
                <button name="advertBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
        </div>

    )
}

export default CreateAdvert