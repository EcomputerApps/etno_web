import { observer } from "mobx-react-lite"
import logoEtno from '../../../../assets/logo_etno.png';
import CustomLinkStore from "../../../../viewmodels/customLink/CustomLinkStore";
import { CustomLink } from "../../../../models/section/Section";
import { toast } from "react-toastify";
import { useState } from "react";
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const customLinkStore = CustomLinkStore.getCustomLinkStore()

const CreateCustomLink = () => {
    const [cLinkName, setCLinkName] = useState<string>("")
    const [cLinkUrl, setCLinkUrl] = useState<string>("")
    const [cLinkIncon, setcLinkIcon] = useState<string>("")
    function addLink() {
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
            customLinkStore.addRequestCustomLink('Bolea', newCustomLink); sideBarStore.updateSection('Enlaces Personalizados'); hoverSectionStore.setName('Enlaces Personalizados')
        }
    }
    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-3/4 lg:h-screen border-2 rounded-md bg-white">
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
                                className="inputCamp peer" onChange={(e) => setCLinkName(e.currentTarget.value)}
                            />
                            <label className={"labelFloatInput"}>Titulo</label>
                        </div>
                    </div>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" " name="bandType" id="test" type="text" className="inputCamp peer" onChange={(e) => setCLinkUrl(e.currentTarget.value)}
                            />
                            <label className={"labelFloatInput"}>Pagina Web</label>
                        </div>
                    </div>
              
                </div>
            </div>
            <div>
                <div className=" lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button name="bandBtnSave" className="btnStandard mr-10" onClick={()=>addLink()}>Publicar</button>
                    <button name="bandBtnCancel" className="btnStandard" onClick={() => customLinkStore.setCreateLinkModal(false)}>Cancelar</button>
                </div>
            </div>
        </div>

    )
}
export default observer(CreateCustomLink)