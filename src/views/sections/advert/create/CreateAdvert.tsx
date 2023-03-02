import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../../../index.css"
import 'react-toastify/dist/ReactToastify.css';
import { Ad } from '../../../../models/section/Section'

import AdvertStore from '../../../../viewmodels/advert/AdvertStore'
import { toast, ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'

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
    const [file, setFile] = useState<File>()


    useEffect(() => {
        advertStore.getRequestAdvert('Bolea', 0, 5)
    }, [])

    function addAd() {

        const ad: Ad = {
            title: advertTitle,
            description: advertDescription,
            webUrl: advertLink
        }

        if (advertStore.getAdvert.title === ad.title) {
            toast.info('Ya existe este anuncio', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            checkIfEmpty()
            advertTitle === '' || advertDescription === '' || advertLink === '' || file === undefined ?
                toast.info('Rellene los campos', {
                    position: 'bottom-center',
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }) : advertStore.addRequestAdvert('Bolea', ad, file!!)
        }
    }

    function checkIfEmpty() {
        advertLink === "" ? setEmptyLink(true) : setEmptyLink(false)
        advertTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
        advertDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
        file === undefined ? setEmptyFile(true) : setEmptyFile(false)

    }
    const [emptyTitle, setEmptyTitle] = useState(false)
    const [emptyLink, setEmptyLink] = useState(false)
    const [emptyDescription, setEmptyDescription] = useState(false)
    const [emptyFile, setEmptyFile] = useState(false)


    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md bg-white">
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white text-3xl p-3'>CREAR ANUNCIO</p>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className="flex flex-col p-1 relative mt-5">
                        <input autoFocus placeholder=" " name="bandType" id="test" type="text" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
                            : ''
                            }`} onChange={(value) => {
                                setAdvertTitle(value.currentTarget.value)
                                setEmptyTitle(false)
                            }} onKeyUp={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (txtAreaRef.current != null) {
                                        txtAreaRef.current.focus()
                                    }
                                }
                            }}></input>
                        <label className={"labelFloatInput"}>Título</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <textarea ref={txtAreaRef} placeholder="  " name="bandDescription" rows={3}
                            className={`inputCamp peer ${emptyDescription ? 'border-red-600'
                                : ''
                                }`} onChange={(value) => {
                                    setAdvertDescription(value.currentTarget.value)
                                    setEmptyDescription(false)
                                }} onKeyDown={(e) => {
                                    if (e.code === "NumpadEnter") {
                                        if (inputRef.current != null) {
                                            inputRef.current.focus()
                                        }
                                    }
                                }}></textarea>
                        <label className={"labelFloatTxtArea"}>Descripcíon</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className="text-left p-1">
                        <div className={`photoBoard ${emptyFile ? 'border-red-600'
                            : ''
                            }`}>
                            <div className='absolute left-2'>
                                Foto {file?.name}
                            </div>
                            <form id="form-file-upload" className=" w-full flex justify-center">
                                <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                                    setFile(value.currentTarget.files!![0])
                                    setEmptyFile(false)
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
                        <input ref={inputRef} placeholder=" " name="advertUrl" type="text" className={`inputCamp peer ${emptyLink ? 'border-red-600'
                            : ''
                            }`} onChange={(value) => {
                                setAdvertLink(value.currentTarget.value)
                                setEmptyLink(false)
                            }}
                            onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (btnRef.current !== null) {
                                        btnRef.current.focus()
                                    }
                                }
                            }} ></input>
                        <label className={"labelFloatInput"}>Enlace</label>
                    </div>
                </div>
                <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button ref={btnRef} name="advertBtnSave" className="btnStandard mr-10" onClick={addAd}>Publicar</button>

                    <button name="advertBtnCancel" className="btnStandard" onClick={() => advertStore.setModalCreate(false)}>Cancelar</button>
                </div>
            </div>

        </div>
    )
}

export default observer(CreateAdvert)