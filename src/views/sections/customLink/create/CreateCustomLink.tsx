import { observer } from "mobx-react-lite"
import logoEtno from '../../../../assets/logo_etno.png';
import CustomLinkStore from "../../../../viewmodels/customLink/CustomLinkStore";
import { CustomLink } from "../../../../models/section/Section";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const customLinkStore = CustomLinkStore.getCustomLinkStore()

const CreateCustomLink = () => {

    useEffect(() => {
        customLinkStore.getAllCustomLinksRequest(localStorage.getItem('user_etno_locality')!)
    }, [])

    function checkIfExist(name: string) {
        var flag: boolean = false
        customLinkStore.getAllCustomLinks.customLinks?.map((item) => {
            if (item.name === name) {
                flag = true
            }
        })
        return flag
    }

    function chekIfEmpty() {
        cLinkName === "" ? setEmptyName(true) : setEmptyName(false)
        cLinkUrl === "" ? setEmptyUrl(true) : setEmptyUrl(false)
    }

    const [emptyName, setEmptyName] = useState<boolean>(false)
    const [emptyUrl, setEmptyUrl] = useState<boolean>(false)
    const [cLinkName, setCLinkName] = useState<string>("")
    const [cLinkUrl, setCLinkUrl] = useState<string>("")
    const [cLinkIncon, setcLinkIcon] = useState<string>("")
    const [confirm, setConfirm] = useState<boolean>(false)

    function addLink() {
        chekIfEmpty()
        if (cLinkName === "" || cLinkUrl === "") {
            toast.error('Rellene todos los campos', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
        else {
            const newCustomLink: CustomLink = {
                name: cLinkName,
                webUrl: cLinkUrl,
                iconName: cLinkIncon
            }
            if (checkIfExist(newCustomLink.name!!)) {
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
                customLinkStore.addRequestCustomLink(localStorage.getItem('user_etno_locality')!, newCustomLink); sideBarStore.updateSection('Enlaces Personalizados'); hoverSectionStore.setName('Enlaces Personalizados')
            }
        }
    }


    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-3/4 lg:h-screen border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => customLinkStore.setCreateLinkModal(false)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>crear ENLACES personalizado</p>
                    </div>
                </div>
                <div>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input autoFocus placeholder=" " name="bandType" id="test" type="text"
                                className={`inputCamp peer ${emptyName ? 'border-red-600'
                                    : ''
                                    }`} onChange={(e) => {
                                        setCLinkName(e.currentTarget.value)
                                        setEmptyName(false)
                                    }}
                                onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                            <label className={"labelFloatInput"}>Titulo</label>
                        </div>
                    </div>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" " name="bandType" id="test" type="text" className={`inputCamp peer ${emptyUrl ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => {
                                    setCLinkUrl(e.currentTarget.value)
                                    setEmptyUrl(false)
                                }}
                                onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                            <label className={"labelFloatInput"}>Pagina Web</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className=" lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => addLink()}>Publicar</button>
                    <button name="bandBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default observer(CreateCustomLink)