import { useEffect, useRef, useState } from 'react';
import logoEtno from '../../../../assets/logo_etno.png';
import LinkStore from '../../../../viewmodels/link/LinkStore';
import { Link } from '../../../../models/section/Section';
import { toast } from 'react-toastify';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import { observer } from 'mobx-react-lite';

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const linkStore = LinkStore.getLinkStore()

const EditLink = () => {

    useEffect(() => {
        linkStore.getAllLinksRequest(localStorage.getItem('user_etno_locality')!)
    }, [])

    function checkIfExist(title: string) {
        var flag: boolean = false
        if (title !== linkTitleTemp) {
            linkStore.getAllLinks.links?.map((item) => {
                if (item.title === title) {
                    flag = true
                }
            })
        }
        return flag
    }

    const [link] = useState<Link>(linkStore.getLink)
    const inputRef = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const [linkTitle, setLinkTitle] = useState<string>(link.title!!)
    const [linkTitleTemp] = useState<string>(link.title!!)
    const [linkUrl, setLinkUrl] = useState<string>(link.url!!)
    const [confirm, setConfirm] = useState<boolean>(false)

    function updateLink(linkId: string) {
        if (checkIfExist(linkTitle)) {
            toast.info('Ya existe este enlace', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            chekIfEmpty()
            if (linkTitle === "" || linkUrl === "") {
                toast.error('Rellene los campos', {
                    position: 'bottom-center',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
            } else {
                const newLink: Link = {
                    title: linkTitle,
                    url: linkUrl
                }
                linkStore.editLink(localStorage.getItem('user_etno_locality')!, linkId, newLink)
                sideBarStore.updateSection('Enlaces'); hoverSectionStore.setName('Enlaces')
            }
        }
    }

    function chekIfEmpty() {
        linkTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
        linkUrl === "" ? setEmptyUrl(true) : setEmptyUrl(false)
    }
    const [emptyTitle, setEmptyTitle] = useState<boolean>(false)
    const [emptyUrl, setEmptyUrl] = useState<boolean>(false)

    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-11/12 lg:h-screen border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => linkStore.setModalEdit(false)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>Editar ENLACES</p>
                </div>
            </div>
            <div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input autoFocus placeholder=" " defaultValue={link.title} id="test" type="text"
                            className={`inputCamp peer ${emptyTitle ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => setLinkTitle(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputRef.current != null) {
                                        inputRef.current.focus()
                                    }
                                }
                            }}
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                        <label className={"labelFloatInput"}>Titulo</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input ref={inputRef} placeholder=" " defaultValue={link.url} id="test" type="text" className={`inputCamp peer ${emptyUrl ? 'border-red-600'
                            : ''
                            }`} onChange={(e) => setLinkUrl(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (btnRef.current != null) {
                                        btnRef.current.focus()
                                    }
                                }
                            }}
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                        <label className={"labelFloatInput"}>Pagina Web</label>
                    </div>
                </div>
            </div>
            <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button ref={btnRef} name="bandBtnSave" className="btnStandard mr-10" onClick={() => updateLink(link.idLink!!)}>Guardar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(EditLink)