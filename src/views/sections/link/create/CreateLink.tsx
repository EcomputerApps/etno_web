import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoEtno from '../../../../assets/logo_etno.png';
import LinkStore from '../../../../viewmodels/link/LinkStore';
const linkStore = LinkStore.getLinkStore()
const CreateLink = () => {
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    return (

        <div className="flex flex-col h-screen md:m-auto w-full md:w-1/2 border-2 rounded-md relative   " >
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3'>ENLACES</p>
                </div>
            </div>
            <div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className=" flex flex-col p-1 mt-5  relative">
                    <input autoFocus placeholder=" " defaultValue={linkStore.getTitle} name="bandType" id="test" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] block border-2 rounded-md p-2 w-full peer focus:outline-none focus:border-indigo-800"
                    onKeyDown={(e) => {
                        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                          if (inputRef.current != null) {
                            inputRef.current.focus()
                          }
                        }
                      }}
                    />
                    <label className={"float-input-lbl"}>Titulo</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className=" flex flex-col p-1 mt-5  relative">
                    <input ref={inputRef} placeholder=" " name="bandType" id="test" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] block border-2 rounded-md p-2 w-full peer focus:outline-none focus:border-indigo-800"
                    onKeyDown={(e) => {if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                        if (btnRef.current != null) {
                          btnRef.current.focus()
                        }
                      }
                    }}
                    />
                    <label className={"float-input-lbl"}>Pagina Web</label>
                </div>
            </div>
            </div>
            <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button ref={btnRef} name="bandBtnSave" className={"post-btn"} >Publicar</button>
                <button name="bandBtnCancel" className={"regular-btn"} onClick={()=>navigate("/home")}>Cancelar</button>
            </div>
        </div>

    )
}
export default CreateLink