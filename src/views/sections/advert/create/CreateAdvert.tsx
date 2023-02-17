import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../../../index.css"
import 'react-toastify/dist/ReactToastify.css';
import { Advert } from '../../../../models/section/Section'

import AdvertStore from '../../../../viewmodels/advert/AdvertStore'
import { toast, ToastContainer } from 'react-toastify'
const advertStore = AdvertStore.getAdvertStore()

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
   async function addAd() {
       const ad: Advert = {
        title: advertTitle,
        description: advertDescription,
        webUrl: advertLink
       }
      await advertStore.addRequestAdvert('Bolea', ad)
    }

    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md">
            <div>
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3'>ANUNCIOS</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1 relative mt-5">
                    <input autoFocus placeholder=" " name="bandType" id="test" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] block border-2 rounded-md p-2 w-full peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                        setAdvertTitle(value.currentTarget.value)
                    }} onKeyUp={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                            if (txtAreaRef.current != null) {
                                txtAreaRef.current.focus()
                            }
                        }
                    }}></input>
                    <label className={"float-input-lbl"}>Título</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                <div className="flex flex-col p-1 relative">
                    <textarea ref={txtAreaRef} placeholder="  " name="bandDescription" rows={3}
                        className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                            setAdvertDescription(value.currentTarget.value)
                        }} onKeyDown={(e) => {
                            if (e.code === "NumpadEnter") {
                                if (inputRef.current != null) {
                                    inputRef.current.focus()
                                }
                            }
                        }}></textarea>
                    <label className={"float-txtArea-lbl"}>Descripcíon</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="text-left p-1">
                    <div className={"photoBoard"}>
                        <div className='absolute left-2'>
                            Fotos
                        </div>
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                                setAdvertPhoto(value.currentTarget.value)
                            }} />
                            <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                                <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                                    <img src={add_Photo} alt="photo"></img>
                                    <p>Pulse en la zona para añadir una imagen</p>
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 mt-3">
                <div className="flex flex-col p-1 relative">
                    <input ref={inputRef} placeholder=" " name="advertUrl" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                        setAdvertLink(value.currentTarget.value)
                    }}
                        onKeyDown={(e) => {
                            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                if (btnRef.current !== null) {
                                    btnRef.current.focus()
                                }
                            }
                        }} ></input>
                    <label className={"float-input-lbl"}>Enlace</label>
                </div>
            </div>
            <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button ref={btnRef} name="advertBtnSave" className="btnStandard mr-10" onClick={addAd}>Publicar</button>
             
                <button name="advertBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default CreateAdvert