import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoEtno from '../../../../assets/logo_etno.png';
import LinkStore from '../../../../viewmodels/link/LinkStore';
import { Link } from '../../../../models/section/Section';
import { toast, ToastContainer } from 'react-toastify';
import { useForm, SubmitHandler } from "react-hook-form";
import ImageStore from '../../../../viewmodels/image/ImageStore';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import { observer } from 'mobx-react-lite';
const regEx = new RegExp(/[^A-Za-z0-9\s]+/)

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const linkStore = LinkStore.getLinkStore()

interface LinkInput {
    title: string;
    url: string;
}

const EditLink = () => {
    const[link, setLink] = useState(linkStore.getLink)
    const inputRef = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const [linkTitle, setLinkTitle] = useState<string>("")
    const [linkUrl, setLinkUrl] = useState<string>("")


    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 mt-5 w-3/4 lg:h-screen border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>crear    ENLACES</p>
                </div>
                
            </div>
            <div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input autoFocus placeholder=" " defaultValue={link.title} id="test" type="text"
                            className="inputCamp peer" onChange={(e) => setLinkTitle(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputRef.current != null) {
                                        inputRef.current.focus()
                                    }
                                }
                            }}
                        />
                        <label className={"labelFloatInput"}>Titulo</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input ref={inputRef} placeholder=" " defaultValue={link.url} id="test" type="text" className="inputCamp peer" onChange={(e) => setLinkUrl(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (btnRef.current != null) {
                                        btnRef.current.focus()
                                    }
                                }
                            }}
                        />
                        <label className={"labelFloatInput"}>Pagina Web</label>
                    </div>
                </div>
            </div>
            <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button ref={btnRef} name="bandBtnSave" className="btnStandard mr-10" >Publicar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => linkStore.setModalCreate(false)}>Cancelar</button>
            </div>
   
        </div>

    )
}
export default observer(EditLink)