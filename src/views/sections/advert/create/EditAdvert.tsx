import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { Ad } from "../../../../models/section/Section"
import AdvertStore from "../../../../viewmodels/advert/AdvertStore"
import HoverSectionStore from "../../../../viewmodels/hoverSection/HoverSectionStore"
import SideBarStore from "../../../../viewmodels/sidebar/SideBarStore"
const advertStore = AdvertStore.getAdvertStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const EditAdvert = () => {
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [advert, setAdvert] = useState(advertStore.getAdvert)

    const [advertTitle, setAdvertTitle] = useState<string>(advert.title!!)
    const [advertDescription, setAdvertDescription] = useState<string>(advert.description!!)
    const [advertPhoto, setAdvertPhoto] = useState<string>()
    const [advertLink, setAdvertLink] = useState<string>(advert.webUrl!!)
    const [file, setFile] = useState<File>()

    function updateAdvert(){
        checkIfEmpty()
        if (advertTitle === '' || advertDescription === '' || advertLink === '' || emptyFile){
            toast.info('Rellene los campos', {
                position: 'top-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        } else {
            const advert_: Ad = {
                title: advertTitle,
                description: advertDescription,
                webUrl: advertLink
            }
            advertStore.editAdvert('Bolea', advert.idAd!!, advert_, file!!)
            sideBarStore.updateSection('Anuncios') 
            hoverSectionStore.setName('Anuncios')
        }
    }

    function checkIfEmpty() {
        advertLink === "" ? setEmptyLink(true) : setEmptyLink(false)
        advertTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
        advertDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
   
    }
    function checkEmptyFile(){

    }
    
    const [emptyTitle, setEmptyTitle] = useState(false)
    const [emptyLink, setEmptyLink] = useState(false)
    const [emptyDescription, setEmptyDescription] = useState(false)
    const [emptyFile, setEmptyFile] = useState(false)
    
    return(
        <div className="flex flex-col md:m-auto lg:w-1/2  w-3/4 md:h-screen border-2 rounded-md bg-white">
            <div>
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl  p-3'>EDITAR ANUNCIO</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1 relative mt-5">
                    <input defaultValue={advert.title} autoFocus placeholder=" " name="bandType" id="test" type="text" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
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
                    <textarea defaultValue={advert.description} ref={txtAreaRef} placeholder="  " name="bandDescription" rows={3}
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
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" 
                            onClick={()=>setEmptyFile(true)} onChange={(value) => {
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
                    <input defaultValue={advert.webUrl} ref={inputRef} placeholder=" " name="advertUrl" type="text" className={`inputCamp peer ${emptyLink ? 'border-red-600'
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
                <button ref={btnRef} name="advertBtnSave" className="btnStandard mr-10" onClick={() => updateAdvert()}>Publicar</button>
                <button name="advertBtnCancel" className="btnStandard" onClick={() => advertStore.setModalEdit(false)}>Cancelar</button>
            </div>
            </div>
         </div>
    )
}
export default EditAdvert