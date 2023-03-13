import { observer } from "mobx-react-lite"
import logoEtno from '../../../../assets/logo_etno.png';
import CustomLinkStore from "../../../../viewmodels/customLink/CustomLinkStore";

const customLinkStore = CustomLinkStore.getCustomLinkStore()
const CreateCustomLink = () => {
    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 mt-5 w-3/4 lg:h-screen border-2 rounded-md bg-white">
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
                                className="inputCamp peer"
                            />
                            <label className={"labelFloatInput"}>Titulo</label>
                        </div>
                    </div>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" " name="bandType" id="test" type="text" className="inputCamp peer"
                            />
                            <label className={"labelFloatInput"}>Pagina Web</label>
                        </div>
                    </div>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" " name="bandType" id="test" type="text" className="inputCamp peer"
                            />
                            <label className={"labelFloatInput"}>Icono</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className=" lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button name="bandBtnSave" className="btnStandard mr-10">Publicar</button>
                    <button name="bandBtnCancel" className="btnStandard" onClick={() => customLinkStore.setCreateLinkModal(false)}>Cancelar</button>
                </div>
            </div>
        </div>

    )
}
export default observer(CreateCustomLink)